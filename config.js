var config 						= {}

config.server 					= {};
config.database 				= {};
config.collection 				= {};

config.server.Name 				= 'localhost';
config.server.Port 				= 3000;

config.database.Server 			= 'localhost';
config.database.Port  			= 27017; 
config.database.Name    		= 'LAPI';

config.collection.BodyTexts  	= 'BodyTexts';
config.collection.BreadCrumbs 	= 'BreadCrumbs';
config.collection.Links     	= 'Links';
config.collection.Images    	= 'ImagesUk';
config.collection.ImagesDe    	= 'ImagesDe';
config.collection.KeyWords  	= 'KeyWords';
config.collection.MetaTags  	= 'MetaTags';
config.collection.WTG  			= 'WTG';
config.collection.HN		 	= 'HN';
config.collection.Page      	= 'Page';
config.collection.PagesUk      	= 'PagesUk';
config.collection.BodyCopy    	= 'BodyCopyUk';

module.exports 					= config;

