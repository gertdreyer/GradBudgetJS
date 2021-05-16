const client = require("./db");

const newUser = async (queryParams) => {
    let query = `
    
    `;

    try {
        await client.query(query, queryParams);
        return "User added succesfully";
    } catch (e) {
        console.log(e);
        return "Error creating user";
    }
};

module.exports = {
    newUser,
};
