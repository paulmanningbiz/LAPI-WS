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
 
exports.findPageCode = function(req, res) 
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

exports.findPageAlphaKey = function(req, res) 
{
    var AlphaKey = req.param('AlphaKey');
    console.log('Retrieving Page: ' + AlphaKey);
	
    db1.collection(config.collection.Page , function(err, collection) 
	{
		collection.find({AlphaKey: AlphaKey},{_id:0,Keywords:0, PageId:0}).toArray(function(err, item) 
		{
            res.send(item);
        });
    });
};
 
exports.findAllPages = function(req, res) 
{
	db1.collection(config.collection.Page, function(err, collection) 
	{
		collection.find({},{_id:0, Keywords:0, PageId:0}).toArray(function(err, items) 
		{
			res.send(items);
		});
	});
};
 
exports.addPage = function(req, res) 
{
	var image = req.body;
	console.log('Adding Page ' + JSON.stringify(image));
	db1.collection(config.collection.Page , function(err, collection) 
	{
		collection.insert(image, {safe:true}, function(err, result) 
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
 
exports.updatePage = function(req, res) 
{
	var AlphaKey = req.param('AlphaKey');
	var image = req.body;

	console.log('Updating Page: ' + AlphaKey);
	console.log(JSON.stringify(Page));

	db1.collection(config.collection.Page , function(err, collection) 
	{
		collection.update({'AlphaKey': AlphaKey}, Page, {safe:true}, function(err, result) 
		{
			if (err) 
			{
				console.log('Error updating snippet: ' + err);
				res.send({'error':'An error has occurred'});
			} 
			else 
			{
				console.log('' + result + ' document(s) updated');
				res.send(Page);
			}
		});
	});
}
 
exports.deletePage = function(req, res) 
{
	var AlphaKey = req.param('AlphaKey');
	console.log('Deleting Page: ' + AlphaKey);
	db1.collection(config.collection.Page , function(err, collection) 
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

