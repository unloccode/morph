const verifyData = require('../middlewares/verifyData.js');
const controller = require('../controllers/auth.controller.js');

module.exports = function(app){
    app.use(function(res, req, next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    })
    app.post(
        "/api/auth/signup",
        [
            verifyData.checkDuplicateUsernameOrEmail
        ],
        controller.signup
    );
    app.post("/api/auth/signin", controller.signin);
};