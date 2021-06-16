const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const secretKey = 'your_jwt_secret';
const bcrypt = require('bcryptjs');
const User = require('../model/user');

passport.use(new LocalStrategy( { usernameField: 'email', passwordField: 'password'},
    function (email, password, callback) {
        console.log('Email', email)
        console.log('PW', password)
        return User.findOne({ email: email })
            .then(user => {
                console.log('Usuario: ', user)
                if (!user) {
                    return callback({ errors: { email: {message: 'Email not found'}}}, false);
                }
                //este if es con '!', es un error del PDF puesto aproposito
                if (!bcrypt.compareSync(password, user.password)) {
                    return callback({ errors: { password: { message: 'Incorrect password'}}}, false);
                }
                return callback(null, user);
            })
            .catch(err => callback(err));
    }
));

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: secretKey
    },
    function (jwtPayload, callback) {
        return User.findById(jwtPayload.id)
            .then(user => {
                return callback(null, user);
            })
            .catch(err => callback(err));
    }
));

module.exports.secretKey = secretKey;