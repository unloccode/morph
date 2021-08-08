const db = require('../config/db.config.js');
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
    //username
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user=>{
        if(user){
            res.status(400).send({
                message: "Username already exist!"
            });
            return;
        }
        //email
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user=>{
            if(user){
                res.status(400).send({
                    message: "Email already registered!"
                });
                return;
            }
            next();
        });
    });
};

const verifyData = { checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail };

module.exports = verifyData;