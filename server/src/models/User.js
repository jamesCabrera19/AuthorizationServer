const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// pre-save middleware
userSchema.pre("save", async function (next) {
    try {
        const user = this;

        if (!user.isModified("password")) {
            return next();
        }
        console.log("user.password before hashing: ", user.password);
        // generating salt
        const salt = await bcrypt.genSalt(10);
        // hashing the password
        const hash = await bcrypt.hash(user.password, salt);
        // updating the user password with the hashed version
        user.password = hash;
        console.log("user.password After hashing: ", user.password);

        // calling next middleware
        next();
    } catch (error) {
        return next(err);
    }
});

userSchema.methods.comparePassword = function (candidatePassword) {
    const user = this;

    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, user.password, (error, isMatch) => {
            if (error) return reject(error);
            //
            if (!isMatch) return reject(error);
            //
            resolve(true);
        });
    });
};

mongoose.model("User", userSchema);
