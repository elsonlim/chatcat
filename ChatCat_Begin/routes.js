module.exports = function(express,app){
    var router = express.Router();
    
    router.get('/', function(req,res, next){
        res.render('index',{title:'Welcome to chatCat'});
    });
    
    router.get('/chatrooms',function(res,res,next){
        res.render('chatrooms',{title:'Chatrooms'});
    });
    
    router.get('/setcolor',function(req,res,next){
        req.session.favColor = "Red";
        res.send('Setting fav color!');
    });
    
    router.get('/getcolor',function(req,res,next){
        res.send('Favourite Color ' + (req.session.favColor === undefined? "Not Found":req.session.favColor));
    });
    app.use('/',router);
}