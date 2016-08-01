var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var exphbs = require('express-handlebars');

// var options = {
// 	extensions: ['html'],
// 	index: false
// };




// app.use(express.static(__dirname + "/public/index.html"));
app.engine('handlebars', exphbs({
	defaultLayout: 'main',
	layoutsDir: __dirname + "/public/views/layouts/"
}));

app.set('views', __dirname + '/public/views');

app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);


app.use(express.static(path.join(__dirname, 'public'), {
	etag: false,
	extensions: ['html'],
	index: false
} ) );

app.get('/', function(req,res) {
	res.render('titlePage');
});

app.get('/detailee/:name', function(req,res) {
	// res.sendFile(path.join(__dirname, "public/detailee_info.html"));
	var clickedName = req.params.name;
	console.log(clickedName);
});

app.get('/detailee', function(req,res) {
	res.render('detailee');
})

// app.get('/courses', function(req, res) {
// 	res.sendFile(__dirname + "/public/courses.html")
// });

console.log(__dirname);

app.listen(app.get('port'));