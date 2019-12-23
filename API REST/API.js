//L'application requiert l'utilisation du module Express.
//La variable me permettra d'utiliser les fonctionnalités du module Express.
var express = require('express'); 
//La variable me permettra d'utiliser les fonctionnalités du module Body-Parser.
var bodyParser = require("body-parser"); 
//La variable me permettra d'utiliser les fonctionnalités du module FS.
var fs = require('fs');

//liste des objets produits qui remplace provisoirement la BDD
var listep=[]; 

//La Classe Produit
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
    
  this.setWarranty_years = function (warranty_years) {
    _warranty_years = warranty_years;
  };
    
  this.setType = function (type) {
    _type = type;
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


//Lecture du fichier JSON et création des Objet JSON 
var obj = JSON.parse(fs.readFileSync('Products.json', 'utf8'));
//Parcours des objets JSON et création d'objets Produits que je stock par la suite dans l'arraylist dédié à ces derniers 
for(var i= 0; i < obj.length; i++)
{   
    listep.push(new Produit(obj[i]._id,obj[i].name,obj[i].type,obj[i].price,obj[i].rating,obj[i].warranty_years,obj[i].available));
}


// Je défini ici les paramètres du serveur.
var hostname = 'localhost'; 
var port = 3000; 
 
// Je crée un objet de type Express. 
var app = express(); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Afin de faciliter le routage je crée un objet Router.
//C'est à partir de cet objet myRouter, que je vais implémenter les méthodes. 
var myRouter = express.Router(); 
 
// Je rappelle la route (/produits).  
myRouter.route('/produits')
//affichage de tous les produits
.all(function(req,res){      
 res.json({message : "Liste de tous les produits:" + '\n' +listep.toString()});});

// Je rappelle la route (/). 
myRouter.route('/')
// All permet de prendre en charge toutes les méthodes.
// Acceuil
.all(function(req,res){ 
      res.json({message : "Bienvenue sur l'API_REST pour voir la liste des produits utilisez la route /produits, pour intéragir sur les objets utilisez la route /produits/action", methode : req.method});
});

// Je rappelle la route (/produits/action'). 
myRouter.route('/produits/action')
.all(function(req,res){ 
      res.json({message : "Liste des actions /add, /recherche?id=, /update, /delete ", methode : req.method});
});

// La route pour la méthode de recherche
myRouter.route('/produits/action/recherche')
// J'implémente les méthodes GET.
// Get pour afficher un produit avec un id précis
.get(function(req,res){ 
    for(var i= 0; i < listep.length; i++)
    {   
        if( listep[i].getId() == req.query.id)
        {
            var affiche = listep[i].toString();
            break;
        }
}
	  res.json({message : "Vous souhaitez accéder aux informations du produit n°" , methode : req.method, affiche});

    
});

// La route pour la méthode d'ajout de produits
myRouter.route('/produits/action/add')
//POST ajouter un produit
.post(function(req,res){
 res.json({message : "Ajout d'un produit à la liste", 
 id : req.body.id, 
 nom : req.body.nom,
 type : req.body.type,
 price : req.body.price,
 raiting : req.body.raiting,
 warranty_years : req.body.warranty_years,
 available : req.body.available});
 
 listep.push(new Produit(req.body.id,req.body.nom,req.body.type,req.body.price,req.body.raiting,req.body.warranty_years,req.body.available));
 console.log(listep[listep.length - 1].toString());
});

// La route pour la méthode de mise à jour des attributs
myRouter.route('/produits/action/update')
//modifier un produit avec un id précis
.post(function(req,res){ 
    for(var i= 0; i < listep.length; i++)
    {   
        if( listep[i].getId() == req.body.id)
        {
            listep[i].setNom(req.body.nom);
            listep[i].setPrice(req.body.price);
            listep[i].setRaiting(req.body.raiting);
            listep[i].setType(req.body.type);
            listep[i].setWarranty_years(req.body.warranty_years);
            listep[i].setAvailable(req.body.available);
              res.json({message : "Vous avez modifier les informations du produit n°",
     id : req.body.id});
            break;
        } 
}
});

// La route pour la méthode de supression
myRouter.route('/produits/action/delete')
//Post pour supprimer un produit avec un id précis
.post(function(req,res){ 
    console.log("post");
    for(var i= 0; i < listep.length; i++)
    {   
        if( listep[i].getId() == req.body.id)
        {
            delete listep[i];
            console.log(listep.toString());
            res.json({message : "Vous avez supprimer le produit n°" ,id : req.body.id ,  methode : req.method});
            break;
        }
}	     
});


// Je demande à l'application d'utiliser le routeur crée
app.use(myRouter);  
 
// Démarrer le serveur 
app.listen(port, hostname, function(){
	console.log("Mon serveur fonctionne sur http://"+ hostname +":"+port); 
});


