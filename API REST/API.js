//L'application requiert l'utilisation du module Express.
//La variable express nous permettra d'utiliser les fonctionnalités du module Express.  
var Produit = function (id,nom,type,price,raiting,warranty_years,available) {
  var _id = id;
  var _nom = nom;
  var _type = type;
  var _price = price;
  var _raiting = raiting;
  var _warranty_years = warranty_years;
  var _available = available;
  
  this.setId = function (id) {
    _id = id;
  };
  
  this.setNom = function (nom) {
    _nom = nom;
  };
  
  this.setPrice = function (price) {
    _price = price;
  };
    
  this.setRaiting = function (raiting) {
    _raiting = raiting;
  };
    
  this.setNom = function (nom) {
    _nom = nom;
  };
    
  this.setNom = function (nom) {
    _nom = nom;
  };
    
  this.setAvailable = function (available) {
    _available = available;
  };
    
  this.getId = function () {
   return _id;
  };
    
  this.getType = function () {
   return _type;
  };
    
  this.getPrice = function () {
   return _price;
  };
    
  this.getRaiting = function () {
   return _raiting;
  };
    
  this.getNom = function () {
   return _nom;
  };
    
  this.getWarranty_years = function () {
   return _warranty_years;
  };
    
  this.getAvailable = function () {
   return _available;
  };
  
  var getToStringValue = function () {
   return [_id," ",_nom," ",_type," ",_price," ",_raiting," ",_warranty_years," ",_available].join("");
  };
  
  this.toString = function () {
    return getToStringValue();
  };
};

var listep=[];
var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('Products.json', 'utf8'));
for(var i= 0; i < obj.length; i++)
{
    
     
    console.log(obj[i]);
    listep.push(new Produit(obj[i]._id,obj[i].name,obj[i].type,obj[i].price,obj[i].rating,obj[i].warranty_years,obj[i].available));
}
for(var i= 0; i < listep.length; i++)
{ 
    console.log(listep[i].toString());
}
    

var express = require('express'); 
// Nous définissons ici les paramètres du serveur.
var hostname = 'localhost'; 
var port = 3000; 
 
// Nous créons un objet de type Express. 
var app = express(); 

var bodyParser = require("body-parser"); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Afin de faciliter le routage (les URL que nous souhaitons prendre en charge dans notre API), nous créons un objet Router.
//C'est à partir de cet objet myRouter, que nous allons implémenter les méthodes. 
var myRouter = express.Router(); 
 
// Je vous rappelle notre route (/produits).  
myRouter.route('/produits')
// J'implémente les méthodes GET, POST
// GET
.get(function(req,res){ 
 res.json({
 message : "Liste de tous les produits:"});}
    )

//POST
.post(function(req,res){
 res.json({message : "Ajoute d'un produit à la liste", 
 produit_id : req.body.produit_id, 
 produit_nom : req.body.produit_nom});
});
 
// Je vous rappelle notre route (/). 
myRouter.route('/')
// all permet de prendre en charge toutes les méthodes. 
.all(function(req,res){ 
      res.json({message : "Bienvenue sur l'API REST ", methode : req.method});
});

// Je vous rappelle notre route (/produits/:produit_id'). 
myRouter.route('/produits/:produit_id')
// J'implémente les méthodes GET, PUT, DELETE.
.get(function(req,res){ 
	  res.json({message : "Vous souhaitez accéder aux informations du produit n°" + req.params.produit_id});
})
.put(function(req,res){ 
	  res.json({message : "Vous souhaitez modifier les informations de la produit n°" + req.params.produit_id});
})
.delete(function(req,res){ 
	  res.json({message : "Vous souhaitez supprimer la produit n°" + req.params.produit_id});
});



// Nous demandons à l'application d'utiliser notre routeur
app.use(myRouter);  
 
// Démarrer le serveur 
app.listen(port, hostname, function(){
	console.log("Mon serveur fonctionne sur http://"+ hostname +":"+port); 
});


