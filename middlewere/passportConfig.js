const LocalStrategy = require('passport-local').Strategy
const User = require("../models/UsersModel")

exports.initializingPassport = (passport, mongoose) => {
    
    passport.use(new LocalStrategy(async (username, password, cb) => {
        try {
            const user = await User.findOne({ username:username })

            // cb (first(error), second(user))
            if (!user) return cb(null, false);
            const isMatch = await user.comparePassword(password);

            if (!isMatch) return cb(null, false)

            return cb(null, user)
        }
        catch (error) {
            return cb(error, false)
        }
    }))

    passport.serializeUser((user, cb) => {
        cb(null, user.id)
    });
    passport.deserializeUser(async (id, cb) => {
        try {
            const user = await User.findById(id)
            cb(null, user)
        }
        catch (error) {
            cb(error, false)
        }
    });
};


