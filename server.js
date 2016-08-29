var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var cors     = require('cors');
var conn     = mongoose.connection;
var list     = mongoose.model('list', mongoose.Schema({item : String}));
db=mongoose.connect('localhost:27017/dbname');
app.configure(function() {
	app.use(express.logger('dev')); // log every request to the console
	app.use(express.bodyParser()); // get information from html forms
	app.use(function(req, res, next) {
	    res.setHeader('Access-Control-Allow-Origin', 'http://localhost');
	    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	    next();
	});
});
app.get('/mylist',function(req,res){
	list.find({},function(err,list){
		if(list && !err){
			res.json({"message":"success",info:list});	
		}else{
			res.json({"message":"error"});	
		};
	});	
});
app.post('/addtolist',middleware,function(req,res){
	var item  = new list();
	item.item = req.body.item;
    item.save(function(err,u) {
        if (u && !err){
        	return res.json({message:"success"});
        }else{
        	res.json({message:"error"});
        };
    });  	
});
function middleware(req, res, next){
	//check the req information and validate if required before performing any operation and posting to database
	next();
};
app.listen(port);
console.log('###################################');
console.log('Node-Expess Server at port ' + port);
console.log('###################################');
