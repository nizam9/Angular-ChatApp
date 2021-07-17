import userSchema from '../models/user-model';

import passport from 'passport';
import bcrypt from 'bcrypt';
import session from 'express-session';
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';
var secrets = require('../../../config/keys');
require('../../../services/passport');
const UserCtrl = {};

UserCtrl.login = (req, res, next) => {
    passport.authenticate('local', { failureRedirect: '/api/v1/user/error' }, (err, user, info) => {
        // req.session.user = user;
        const token = jwt.sign({
            expiresIn: 1,
            data: user,
        }, secrets.jwt_secret_key);

        console.log(info, 'info', user);
        res.send({
            message: info.message,
            user: (info.code === 200) ? ({
                _id: user._id,
                email: user.email,
                userName: user.userName,
                firstName: user.firstName,
                lastName: user.lastName,
                expiresIn: 1,
                token: token
            }) : null,
            code: info.code,
        });
    })(req, res, next);
}

UserCtrl.error = (req, res) => {
    console.log('inside errorrrrrrrrrrrrrr')
    res.send({ status: 401, message: 'Invalid Credentials 123' })
}



UserCtrl.logout = (req, res) => {
    //   To destroy session you can use this function 
    req.session.destroy(function(error) {
        console.log("Session Destroyed", error);
    })

}

UserCtrl.fetchAllUsers = (req, res) => {
    userSchema.find().exec((err, results) => {
        if (!err) {
            res.send({ message: 'success', code: 200, data: results })
        } else {
            res.send({ message: 'failed to fetch employees', error: err, code: 300 })
        }
    });
}

UserCtrl.userRegister = async(req, res) => {

    const firstName = req.body.firstName.trim();
    const lastName = req.body.lastName.trim();
    const userName = req.body.userName.trim();
    const email = req.body.email.trim();
    let password = req.body.password;

    const payload = req.body;

    if (firstName && lastName && userName && email && password) {
        const User = await userSchema.findOne({
            $or: [
                { userName: userName },
                { email: email }
            ]
        });

        if (User == null) {
            const data = req.body;
            password = await bcrypt.hash(password, 10);
            const userDetails = new userSchema({
                firstName: firstName,
                lastName: lastName,
                userName: userName,
                email: email,
                password: password
            })
            userDetails.save((error, result) => {
                if (result) {
                    res.send({ code: 200, result: result, message: 'User Profile Created Successfully' })
                } else {
                    res.send({ code: 300, error: err, message: 'Error ocurred while creating user' })
                }
            })
        } else {
            res.send({ message: 'User already exists', code: 400 });
        }
    } else {
        res.send({ message: 'Make sure each field has valid value.', code: 400 })
    }









    // console.log('inside register', req.body);
    // if (req.body.type === 'admin') {
    //     var userDet = new userSchema({
    //         name: 'admin',
    //         email: 'admin@gmail.com',
    //         password: 'admin'
    //     });
    // }
    // const userDet = new userSchema({
    //     name: req.body.name,
    //     email: req.body.email,
    //     phone: req.body.phone,
    //     password: req.body.password
    // });
    // userDet.save((error, result) => {
    //     if (result) {
    //         res.send({ code: 200, result: result, message: 'User Profile Created Successfully' })
    //     } else {
    //         res.send({ code: 300, error: err, message: 'Error ocurred while creating user' })
    //     }
    // })

}


//verify middleware function to check if correct token is sent in header of request for protected routes
UserCtrl.verify = (req, res, next) => {
    try {
        const token = req.headers['x-access-token'].split(' ')[1];
        const decoded = jwt.verify(token, secrets.jwt_secret_key);
        req.UserData = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            message: error
        });
    };
};

export default UserCtrl;

// ps -ef|grep node
//sudo kill ports