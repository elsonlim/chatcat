var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var config = require('./config/config.js');
var connectMongo = require('connect-mongo')(session);
var mongoose = require('mongoose').connect(config.dbURL);
var passport = require('passport');
var facebookStrategy = require('passport-facebook').Strategy;


app.set('views',path.join(__dirname,'views'));
app.engine('html',require('hogan-express'));
app.set('view engine','html');
app.use(express.static(path.join(__dirname,'public'))); //set it to public folder

app.use(cookieParser());
//app.use(session({secret: 'catscanfly', saveUninitialized: true, resave:true}));

var env = process.env.NODE_ENV || 'development';
if(env === 'development'){
    //dev setting
    app.use(session({secret:'config.sessionSecret'}));
}else{
    //prod setting
    console.log('in prod...');
    app.use(session({
        secret:config.sessionSecret,
        store: new connectMongo({
            //url:config.dbURL,
            mongoose_connection:mongoose.connections[0],
            stringify: true
        })
    }));
}

var userSchema = mongoose.Schema({
    username:String,
    password:String,
    fullname:String
});

//var Person = mongoose.model('users',userSchema);
//
//var John = new Person({
//    username:'johndoe',
//    password:'johnPassword',
//    fullname:'John Doe'
//});
//
//John.save(function(err){
//    console.log('save');
//});

//app.route('/').get(function(req,res,next){
//    //res.send('<h1>Hello World!</h1>');
//    res.render('index',{title:'Welcome to chatcat!'});
//});


require('./routes.js')(express,app);
require('./auth/passportAuth.js')(passport,facebookStrategy,config,mongoose);

app.listen(3000,function(){
    console.log("Charcat working on port 3000");
    console.log('Mode:' + env);
});

