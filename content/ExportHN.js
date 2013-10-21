var mongo 	= require('mongodb');
var config  = require('../config')

var Server 	= mongo.Server;
var Db		= mongo.Db;
var BSON 	= mongo.BSONPure;
 
var server 	= new Server(config.server.Name , config.database.Port, {auto_reconnect: true});
db 			= new Db(config.database.Name, server);
 
db.open
(
	function(err, db) 
	{
		if (!err) 
		{
			console.log("Using Collection: " + config.collection.HN);
			db.collection(config.collection.HN, {strict:true}, function(err, collection) 
			{
				if (err) 
				{
					console.log("The " + config.collection.HN + "collection doesn't exist.");
				}
			});
		}
	}
);

exports.findHN = function(req, res)
{
    db.collection(config.collection.HN, function(err, collection)
    {
        collection.find({},{_id:0}).toArray(function(err, items)
        {
            res.send(items);
        });
    });
};

exports.findAlphaKey = function(req, res)
{
    var AlphaKey = req.param('AlphaKey');
	
    console.log('Retrieving HN: ' + AlphaKey);
    db.collection(config.collection.HN, function(err, collection) 
	{
		collection.find({AlphaKey: AlphaKey},{_id:0}).toArray(function(err, item) 
		{
            res.send(item);
        });
    });
};

exports.findCategory = function(req, res)
{
    var AlphaKey = req.param('AlphaKey');
	var Category = req.param('Category');
	
    console.log('Retrieving HN: ' + AlphaKey + " Category: " + Category);
	
    db.collection(config.collection.HN, function(err, collection) 
	{
		collection.find({AlphaKey: AlphaKey,Category: Category},{_id:0,AlphaKey:0, Code:0}).toArray(function(err, item)
		{
			res.send(item);
		});
	});
};
 
