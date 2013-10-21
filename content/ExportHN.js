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
 
exports.findHNAlphaKey = function(req, res) 
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

exports.findHNCategory = function(req, res) 
{
    var AlphaKey = req.param('AlphaKey');
	var Category = req.param('Category');
	
    console.log('Retrieving HN: ' + AlphaKey + " Category: " + Category);
	
    db.collection(config.collection.HN, function(err, collection) 
	{
		collection.find({AlphaKey: AlphaKey,Category: Category},{_id:0,AlphaKey:0, Category:0}).toArray(function(err, item) 
		{
			res.send(item);
		});
	});
};
 
exports.findAllHN = function(req, res) 
{
	db.collection(config.collection.HN, function(err, collection) 
	{
		collection.find({},{_id:0}).toArray(function(err, items) 
		{
			res.send(items);
		});
	});
};
 

 exports.addHN = function(req, res) 
{
	var template = req.body;
	console.log('Adding templates ' + JSON.stringify(snippet));
	
	db.collection(config.collection.HN, function(err, collection) 
	{
		collection.insert(HN, {safe:true}, function(err, result) 
		{
			if (err) 
			{
				res.send({'error':'An error has occurred'});
			} 
			else 
			{
				console.log('Success: ' + JSON.stringify(result[0]));
				res.send(result[0]);
			}
		});
	});
} 

exports.updateHN = function(req, res) 
{
	var AlphaKey = req.param('AlphaKey');
	var snippet = req.body;
	
	console.log("Updating " + config.collection.HN + " " + AlphaKey);
	console.log(JSON.stringify(HN));
	
	db.collection(config.collection.HN, function(err, collection) 
		{
			collection.update({'AlphaKey': AlphaKey}, snippet, {safe:true}, function(err, result) 
			{
				if (err) 
				{
					console.log('Error updating snippet: ' + err);
					res.send({'error':'An error has occurred'});
				} 
				else 
				{
					console.log('' + result + ' document(s) updated');
					res.send(snippet);
				}
			});
		}
	);
}
 
 
exports.deleteHN = function(req, res) 
{
	var AlphaKey = req.param('AlphaKey');
	
	console.log("Deleting Collectuion: " + config.collection.HN + " Key: " + AlphaKey);
	
	db.collection(config.collection.HN, function(err, collection) 
		{
			collection.remove({'AlphaKey': AlphaKey}, {safe:true}, function(err, result) 
			{
				if (err) 
				{
					res.send({'error':'An error has occurred - ' + err});
				} 
				else 
				{
					console.log('' + result + ' document(s) deleted');
					res.send(req.body);
				}
			});
		}
	);
}