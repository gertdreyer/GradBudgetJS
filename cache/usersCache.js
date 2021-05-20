const { getUsers, createUser } = require("../queries/users");

let usersCache = [];

const checkIfUserExists = async (req, res, next) => {
    if (usersCache?.length === 0) {
        usersCache = await getUsers();
        //Time out cache every 12 hours
        setTimeout(() => {
            usersCache = [];
        }, 12 * 60 * 60 * 1000);
    }

    const authId = req.oidc.user.sub;
    if (!usersCache.some((u) => u.oauthlink === authId)) {
        const userCreated = await createUser([authId]);
        usersCache.push({
            userid: userCreated[0].userid,
            oauthlink: userCreated[0].oauthlink,
        });
    }

    res.locals.uid = getUserId(authId);

    next();
};

const getUserId = (link) => {
    const uid = usersCache.find((u) => u.oauthlink === link).userid;
    return uid;
};

module.exports = {
    checkIfUserExists,
};
