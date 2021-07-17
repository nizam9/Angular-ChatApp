// import passport from 'passport';
const LocalStrategy = require('passport-local').Strategy;
import bcrypt from 'bcrypt';
import UserSchema from '../app/modules/models/user-model';

// const encryptedPassword = await bcrypt.hash(password, 10);
// console.log('encryptedPassword::', encryptedPassword);

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            let conditions = {};
            if (email.indexOf('@') === -1) {
                conditions.userName = email;
            } else {
                conditions.email = email;
            }
            UserSchema.findOne(conditions).then(async(user) => {
                console.log('The user is: ', user);

                if (!user) {
                    return done(null, false, { message: 'unKnown user', code: 401 });
                }

                const passwordMatched = await bcrypt.compare(password, user.password);
                console.log(passwordMatched, 'passwordMatch::')
                if (!passwordMatched) {
                    console.log('checking for password')
                    return done(null, false, { message: 'Invalid Credentials', code: 401 });
                } else {
                    return done(null, user, { message: 'Login Successful', code: 200 });
                }
            }, (err) => {
                return done(err);
            });
        })
    );

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
};