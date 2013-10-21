var mongo 	= require('mongodb');
var config  = require('../config') 
var Server 	= mongo.Server,

Db 			= mongo.Db,
BSON 		= mongo.BSONPure;
 
var server 	= new Server(config.server.Name , config.database.Port, {auto_reconnect: true});
db1 		= new Db(config.database.Name, server);
 
db1.open(function(err, db) 
{
	if(!err) 
	{
		console.log("Using Collection: " + config.collection.Page);
		db1.collection(config.collection.Page , {strict:true}, function(err, collection) 
		{
			if (err) 
			{
				console.log(config.collection.Page + " collection doesn't exist.");
			}
		});
	}
});

exports.findPage = function(req, res)
{
    db1.collection(config.collection.Page, function(err, collection)
    {
        collection.find({},{_id:0, Keywords:0, PageId:0}).toArray(function(err, items)
        {
            res.send(items);
        });
    });
};

exports.findAlphaKey = function(req, res)
{
    var AlphaKey = req.param('AlphaKey');
    console.log('Retrieving Page: ' + AlphaKey);

    db1.collection(config.collection.Page , function(err, collection)
    {
        collection.find({AlphaKey: AlphaKey},{_id:0,AlphaKey:0,Keywords:0, PageId:0}).toArray(function(err, item)
        {
            res.send(item);
        });
    });
};

exports.findCategory = function(req, res)
{
    var AlphaKey = req.param('AlphaKey');
	var Code     = req.param('Code');
	
    console.log('Retrieving Page: ' + AlphaKey + " -> " + Code);
	
    db1.collection(config.collection.Page , function(err, collection) 
	{
		collection.find({AlphaKey: AlphaKey, Code: Code},{_id:0,AlphaKey:0, Code:0, Keywords:0, PageId:0}).toArray(function(err, item) 
		{
            res.send(item);
        });
    });
};