const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose')
 
module.exports = app =>{
    app.use(
        session({
        secret: process.env.SESS_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 360000 },// 60 * 1000 ms === 1 min,
        store: new MongoStore({
                mongooseConnection: mongoose.connection,
                ttl: 60 * 60 * 24 
            })
        })
    );
};
