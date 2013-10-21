var mongo   = require('mongodb');
var Server  = mongo.Server;
var config  = require('../config');

Db = mongo.Db,
BSON = mongo.BSONPure;
 
var server = new Server(config.server.Name , config.database.Port, {auto_reconnect: true});
db = new Db(config.database.Name, server);
 
db.open(function(err, db) 
{
	if(!err) 
	{
		console.log("Using Collection: " + config.collection.WTG);
		db.collection(config.collection.WTG, {strict:true}, function(err, collection) 
		{
			if (err) 
			{
				console.log("The " + config.collection.WTG + " collection doesn't exist.");
			}
		});
	}
});

exports.findWTG = function(req, res)
{
    db.collection(config.collection.WTG, function(err, collection)
    {
        collection.find({},{_id:0, Alt:0}).toArray(function(err, items)
        {
            res.send(items);
        });
    });
};

exports.findAlphaKey = function(req, res)
{
    var AlphaKey = req.param('AlphaKey');
    console.log('Retrieving WTG: ' + AlphaKey);
    
    db.collection(config.collection.WTG, function(err, collection) 
	{
		collection.find({AlphaKey: AlphaKey},{_id:0, AlphaKey:0}).toArray(function(err, item)
		{
            res.send(item);
        });
    });
};

exports.findCategory = function(req, res)
{
    var AlphaKey = req.param('AlphaKey');
	var Code = req.param('Code');
	
    console.log('Retrieving WTG: ' + AlphaKey);
	console.log('Retrieving WTG: ' + Category);
	
    db1.collection(config.collection.WTG, function(err, collection) 
	{
		collection.find({AlphaKey: AlphaKey, Code: Code},{_id:0, AlphaKey:0, Code:0,Alt:0}).toArray(function(err, item)
		{
            res.send(item);
        });
    });
};
 

 

