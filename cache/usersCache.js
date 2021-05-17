/*
    So this file is basically a custom middleware set up to
    run on all our requests before they are routed.

    It requires the user be authenticated as a part of the middleware chain,
    so the first thing it does is check if a user is authed before they can
    access any of the routes.

    Then it checks for and stores(for 12 hours) a cache of users from the DB.
    We're not storing any sensitive user data, so I think that's okay (but seriously,
    I'm also open to other suggestions because I don't know if this is the best solution).
    
    It then checks the cache for the current authed users info.
    If it finds the user, then it sends them on to the requested route (and we can
    always access their UID in the cache using their OIDC Identity).
    If it doesn't find them, it creates the user in the DB, and updates the cache as 
    necessary.

    I left some console.log()'s in here (commented out).
    If you want to get a clearer picture of what the state of the cache is
    at every step of the process just uncomment them, run the server
    and navigate to any of the routes.

    - Luke
*/

const { getUsers, createUser } = require("../queries/users");

let usersCache = [];

const checkIfUserExists = async (req, res, next) => {
    console.log(res.query);

    if (usersCache?.length === 0) {
        usersCache = await getUsers();
        //Time out cache every 12 hours
        setTimeout(() => {
            usersCache = [];
            // console.log("Timing Out User Cache:", usersCache);
        }, 12 * 60 * 60 * 1000);
    }
    //console.log("Current Cache:", usersCache);

    const userId = req.oidc.user.sub;
    if (!usersCache.some((u) => u.oauthlink === userId)) {
        const userCreated = await createUser([userId]);
        usersCache.push({
            userid: userCreated[0].userid,
            oauthlink: userCreated[0].oauthlink,
        });
        // console.log("User Created:", usersCache);
    }

    next();
};

module.exports = {
    checkIfUserExists,
};
