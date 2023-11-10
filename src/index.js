//exercice 0:
console.log("message javascript du serveur");

// Utilisation du module Simple-hello-world-example installé précédemment
let myApp = require("simple-hello-world-example");
let msg = myApp.printMsg(); // print and return " Hello World! "

// Utilisation du module Express
let express = require("express");
let app = express();
// Publication du site statique8
app.use("/lp-dream", express.static("public"));
// Route vers la page du formulaire
app.get("/form-tva", function (req, res) {
  res.sendfile("form/tva.html");
});

// Récupération des données du formulaire en GET à la route donnée
// La route de réucpération des données doit être différente de celle de l'affichage du formulaire
// req = requête et res = response
app.get("/affichage-donnees", function (req, res) {
	// req.query contient les données du formulaire
	// res.json(req.query);
	console.log(req.query);
	let prix = req.query.prix;
	let taux = req.query.taux;
	let prixttc = prix * ((1 + taux) / 100);
	let message = "Prix HT : " + prix + ", Taux TVA : " + taux + " | Le prix TTC vaut " + prixttc + "€";
	// On renvoie le message pour l'afficher sur la page web
	res.send(message);
	console.log(message );
});

// Récupération des données du formulaire en POST à la route donnée
// -- middleware pour express permettant d’alimenter l’objet body de request
// avec les valeurs saisies dans le formulaire
let bodyParser = require("body-parser");
// utiliser le module middleware de parsing
app.use(bodyParser.urlencoded({ extended: true })); 
// route de gestion de la validation du formulaire
app.post('/affichage-donnees', function (req, res) {
	// res.json(req.body);

	let prix = req.body.prix;
	let taux = req.body.taux;
	let prixttc = prix * ((1 + taux) / 100);
	let message = "Prix HT : " + prix + ", Taux TVA : " + taux + " | Le prix TTC vaut " + prixttc + "€";
	// On renvoie le message pour l'afficher sur la page web
	res.send(message);
	console.log(message );
});

// Ecoute sur le port 8080
app.listen(8080);