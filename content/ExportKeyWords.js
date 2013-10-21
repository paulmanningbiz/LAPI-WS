var mongo 	= require('mongodb');
var config  = require('../config')
var Server 	= mongo.Server;

var Db 		= mongo.Db;
var BSON 	= mongo.BSONPure;
 
var server 	= new Server(config.server.Name , config.database.Port, {auto_reconnect: true});
db 			= new Db(config.database.Name, server);
 
db.open(function(err, db) 
{
	if(!err) 
	{
		//console.log("Using Collection: " + config.collection.KeyWords);
		db.collection(config.collection.KeyWords, {strict:true}, function(err, collection) 
		{
			if (err) 
			{
				//console.log("The 'keywords' collection doesn't exist.");
			}
		});
	}
});
 
exports.findKeywordsCategory = function(req, res) 
{
    var Category = req.param('Category');
    console.log('Retrieving keywords: ' + Category);
    db.collection(config.collection.KeyWords, function(err, collection) 
	{
		collection.find({Category: Category},{_id:0}).toArray(function(err, item) 
		{
            res.send(item);
        });
    });
};

 
exports.findAllKeywords = function(req, res) 
{
	db.collection(config.collection.KeyWords, function(err, collection) 
	{
		collection.find({},{_id:0}).toArray(function(err, items) 
		{
			res.send(items);
		});
	});
};
 
exports.addKeyword = function(req, res) 
{
	var keyword = req.body;
	console.log('Adding keyword ' + JSON.stringify(keyword));
	
	db.collection(config.collection.KeyWords, function(err, collection) 
	{
		collection.insert(keyword, {safe:true}, function(err, result) 
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
 
exports.updateKeyword = function(req, res) 
{
	var AlphaKey = req.param('AlphaKey');
	var snippet = req.body;

	console.log('Updating keyword: ' + AlphaKey);
	console.log(JSON.stringify(keyword));

	db.collection(config.collection.KeyWords, function(err, collection) 
	{
		collection.update({'AlphaKey': AlphaKey}, snippet, {safe:true}, function(err, result) 
		{
			if (err) 
			{
				console.log('Error updating keywords: ' + err);
				res.send({'error':'An error has occurred'});
			} 
			else 
			{
				console.log('' + result + ' document(s) updated');
				res.send(snippet);
			}
		});
	});
}
 
exports.deleteKeyword = function(req, res) 
{
	var AlphaKey = req.param('AlphaKey');
	console.log('Deleting keyword: ' + AlphaKey);
	db.collection(config.collection.KeyWords, function(err, collection) 
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
	});
}