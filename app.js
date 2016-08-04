var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var exphbs = require('express-handlebars');
var fs = require('fs');
var jsonQuery = require('json-query');






app.engine('handlebars', exphbs({
	defaultLayout: 'main'
	// layoutsDir: __dirname + "/views/layouts/"
}));

// app.set('views', __dirname + '/public/views');

app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);


app.use(express.static(path.join(__dirname, '/public'), {
	etag: false,
	extensions: ['html'],
	index: false
} ) );

app.get('/', function(req,res) {
	res.render('titlePage');
});

app.get('/detailee', function(req,res) {
	res.render('detailee');
})

app.get('/detailee/:name', function(req, res) {
	var val = req.params.name;
	var text = fs.readFileSync('./scripts/detailee_info.json', 'utf8')
	var obj = JSON.parse(text);
	var queryName = jsonQuery('data[0].' + val + '.name', {data: obj}).value;
	var queryPic = jsonQuery('data[0].' + val + '.pic', {data: obj}).value;
	var queryBlog =jsonQuery('data[0].' + val + '.blog', {data: obj}).value
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
