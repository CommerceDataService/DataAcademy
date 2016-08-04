var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var exphbs = require('express-handlebars');
var fs = require('fs');
var jsonQuery = require('json-query');


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

// app.get('/detailee/:name', function(req,res) {
// 	// res.sendFile(path.join(__dirname, "public/detailee_info.html"));
// 	var clickedName = req.params.name;
// });

// app.get('/detailee', function(req,res) {
// 	// res.send('Whee');
// 	// var val = req.query.name;
// 	console.log(req.query);
// 	res.send('whee');
// });

app.get('/detailee', function(req,res) {
	res.render('detailee');
})

app.get('/detailee/:name', function(req, res) {
	var val = req.params.name;
	console.log(val);
	var text = fs.readFileSync('./scripts/detailee_info.json', 'utf8')
	console.log(text);
	console.log(typeof text);
	var obj = JSON.parse(text);
	var queryName = jsonQuery('data[0].' + val + '.name', {data: obj}).value;
	var queryPic = jsonQuery('data[0].' + val + '.pic', {data: obj}).value;
	var queryBlog =jsonQuery('data[0].' + val + '.blog', {data: obj}).value
	console.log(obj);
	console.log('queryName = ' + queryName);
	console.log(typeof obj);
	res.render('detailee_info', {
		queryName: queryName,
		queryPic: queryPic,
		queryBlog: queryBlog
	})
})

// app.get('/courses', function(req, res) {
// 	res.sendFile(__dirname + "/public/courses.html")
// });

console.log(__dirname);

app.listen(app.get('port'));