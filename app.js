var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var hbs = require('express-hbs');


// app.use(express.static(__dirname + "/public/index.html"));
app.engine('hnbs', hbs.express4({
	defaultLayout: 'main',
	partialsDir: path.join(__dirname, "views/partials")
})); // for the 'hnbs' file extension, use the hbs.require

app.set('view engine', 'hnbs');  // use 'hnbs' file extension when omitted from file

app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, "public")));

app.get('/detailee', function(req,res) {
	res.sendFile(path.join(__dirname, "public/detailee_info.html"));
});

app.get('/courses', function(req, res) {
	res.sendFile(__dirname + "/public/courses.html")
});

console.log(__dirname);

app.listen(app.get('port'));