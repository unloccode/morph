const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');

//import user
const db = require('./config/db.config.js');
const User = db.user;

const app = express();
const PORT = 8080;

const corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//simple route
app.get('/', (req, res)=>{
    res.json({message: "I am Unloccode!"});
});

//app routes
require('./routes/auth.routes')(app);

//fire up the serverr
app.listen(PORT, ()=>{
    console.log(`Server running at http://localhost:${PORT}`);
    //init user
});

//new data
db.sequelize.sync({force:true}).then(()=>{
    console.log('Drop and Resync with {force: true}');
    User.sync().then(()=>{
        const users = [
            {
                username: 'georges',
                email: 'george@mail.com',
                password: bcrypt.hashSync('12345', 8)
            }
        ]
        for(let i=0; i<users.length; i++){
            User.create(users[i]);
        }
    })
});