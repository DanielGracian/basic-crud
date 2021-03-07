const user = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SECRET_KEY = 'somesecret@';
exports.createUser = async (req, res, next) => {
    
    try{
        if(req.body.email.indexOf('@') == -1){
            const err = new Error('Email is not valid!');
            err.http_code = 409;    
            next(err);
        };

        const newUser = new user({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 1) ,
        });
        
        await newUser.save(); 
        res.send({newUser});
       
    } catch (error) {
        const err = new Error('Something is wrong!');
        err.http_code = 400;
     
        next(err);
    }
}

exports.loginUser = (req, res, next) => {
    const userData = {
        email: req.body.email,
        password: req.body.password
    }

    user.findOne({ email: userData.email }, (err, user) => {
        if (err) res.status(500).send('Server error!');
        if (!user) {
            const err = new Error('Something is wrong!');
            err.http_code = 409;        
            next(err);
        } else {
            try {
            const resultPassword = bcrypt.compareSync(userData.password, user.password);
            if (resultPassword) {
                const expiresIn = 24 * 60 * 60;
                const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, {expiresIn: expiresIn});           
                const data = {
                    name: user.name,
                    email: user.email,
                    accessToken: accessToken,
                    expiresIn: expiresIn
                }
                res.json( data );
            }
           } catch (error) {
            console.log(error);   
            const err = new Error('Something is wrong!');
                err.http_code = 400;
                next(err);
           }
        }
    });
}

