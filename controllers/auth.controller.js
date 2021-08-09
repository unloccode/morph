const db = require('../config/db.config.js');
const User = db.user;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');

exports.signup = (req, res) => {
    //save NEW user to db
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    }).then(()=>{
        res.send({message: "User was registered successfully!"});
    }).catch(err=>{
        res.status(500).send({message: err.message});
    });
};

exports.signin = (req, res) => {
    //sigin in user
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user=>{
        if(!user){
            return res.status(404).send({
                message: "User Not Found!"
            });
        }
        //else continue
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if(!passwordIsValid){
            return res.status(404).send({
                accessToken: "null",
                message: "Invalid Password!"
            });
        }
        //else continue
        const token = jwt.sign({id: user.id}, config.secret, {expiresIn: 86400}); //24 hours before it expires
        //result
        res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            accessToken: token
        });
    }).catch(error=>{
        res.status(500).send({
            message: error.message
        });
    });
};