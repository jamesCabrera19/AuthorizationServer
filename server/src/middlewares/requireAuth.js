const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User"); // user schema
//
const { encryptionKey } = require("../keys");

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    //
    if (!authorization) {
        return res.status(401).send({ error: "You must be logged in" });
    }
    // extracting the token
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, encryptionKey, async (error, payload) => {
        // if there is an error we return early
        if (error) {
            return res.status(401).send({ error: "You must be logged in" });
        }
        // extracting user from params
        const { userId } = payload;
        const user = await User.findById(userId);
        // assigning  the user to the request
        req.user = user;
        // calling the next function
        next();
    });
};
