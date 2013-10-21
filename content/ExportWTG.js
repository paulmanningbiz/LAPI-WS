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
 
exports.findWTGAlphaKey = function(req, res) 
{
    var AlphaKey = req.param('AlphaKey');
    console.log('Retrieving WTG: ' + AlphaKey);
    
    db.collection(config.collection.WTG, function(err, collection) 
	{
		collection.find({AlphaKey: AlphaKey},{_id:0, AlphaKey:0, category:0}).toArray(function(err, item) 
		{
            res.send(item);
        });
    });
};

exports.findWTGCategory = function(req, res) 
{
    var AlphaKey = req.param('AlphaKey');
	var Category = req.param('Category');
	
    console.log('Retrieving WTG: ' + AlphaKey);
	console.log('Retrieving WTG: ' + Category);
	
    db1.collection(config.collection.WTG, function(err, collection) 
	{
		collection.find({AlphaKey: AlphaKey, Category: Category},{_id:0, AlphaKey:0, Category:0,Alt:0}).toArray(function(err, item) 
		{
            res.send(item);
        });
    });
};
 
exports.findAllWTG = function(req, res) 
{
	db.collection(config.collection.WTG, function(err, collection) 
	{
		collection.find({},{_id:0, Alt:0}).toArray(function(err, items) 
		{
			res.send(items);
		});
	});
};
 
exports.addWTG = function(req, res) 
{
	var WTG = req.body;
	console.log('Adding WTG ' + JSON.stringify(WTG));
	db.collection(config.collection.WTG, function(err, collection) 
	{
		collection.insert(WTG, {safe:true}, function(err, result) 
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
 
exports.updateWTG = function(req, res) 
{
	var alphaKey = req.param('alphaKey');
	var WTG = req.body;
	console.log('Updating WTG: ' + alphaKey);
	console.log(JSON.stringify(WTG));
	db.collection(config.collection.WTG, function(err, collection) 
	{
		collection.update({'alphaKey': alphaKey}, WTG, {safe:true}, function(err, result) 
		{
			if (err) 
			{
				console.log('Error updating WTG: ' + err);
				res.send({'error':'An error has occurred'});
			} 
			else 
			{
				console.log('' + result + ' document(s) updated');
				res.send(WTG);
			}
		});
	});
}
 
exports.deleteWTG = function(req, res) 
{
	var alphaKey = req.param('alphaKey');
	console.log('Deleting WTG: ' + alphaKey);
	db.collection(config.collection.WTG, function(err, collection) 
	{
		collection.remove({'alphaKey': alphaKey}, {safe:true}, function(err, result) 
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


