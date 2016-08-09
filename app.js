var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var exphbs = require('express-handlebars');
var fs = require('fs');
var jsonQuery = require('json-query');


app.engine('handlebars', exphbs({
	defaultLayout: 'main',
	helpers: {
			date: function (lvalue, operator, options) {

			    var operators, result;
			    var today = new Date();
			    var comparison = new Date(lvalue);
			    
			    operators = {
			        '==': function (l, r) { return l == r; },
			        '===': function (l, r) { return l === r; },
			        '!=': function (l, r) { return l != r; },
			        '!==': function (l, r) { return l !== r; },
			        '<': function (l, r) { return l < r; },
			        '>': function (l, r) { return l > r; },
			        '<=': function (l, r) { return l <= r; },
			        '>=': function (l, r) { return l >= r; },
			        'typeof': function (l, r) { return typeof l == r; }
			    };
			    
			    if (!operators[operator]) {
			        throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
			    }
			    
			    result = operators[operator](comparison, today);
			    
			    if (result) {

			        return options.fn(this);
			    } 
			    else {

			        return options.inverse(this);
			    }
			},
			compare: function (lvalue, operator, rvalue, options) {

			    var operators, result;
			    
			    if (arguments.length < 3) {
			        throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
			    }
			    
			    if (options === undefined) {
			        options = rvalue;
			        rvalue = operator;
			        operator = "===";
			    }
			    
			    operators = {
			        '==': function (l, r) { return l == r; },
			        '===': function (l, r) { return l === r; },
			        '!=': function (l, r) { return l != r; },
			        '!==': function (l, r) { return l !== r; },
			        '<': function (l, r) { return l < r; },
			        '>': function (l, r) { return l > r; },
			        '<=': function (l, r) { return l <= r; },
			        '>=': function (l, r) { return l >= r; },
			        'typeof': function (l, r) { return typeof l == r; }
			    };
			    
			    if (!operators[operator]) {
			        throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
			    }
			    
			    result = operators[operator](lvalue, rvalue);
			    
			    if (result) {
			        return options.fn(this);
			    } else {
			        return options.inverse(this);
			    }
			}
		}
}));

// app.set('views', __dirname + '/views');

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

app.get('/detailee/:name', function(req, res) {
	var val = req.params.name;
	var text = fs.readFileSync('./scripts/detailee_info.json', 'utf8');
	var obj = JSON.parse(text);
	var queryName = jsonQuery('data[0].' + val + '.name', {data: obj}).value;
	var queryPic = jsonQuery('data[0].' + val + '.pic', {data: obj}).value;
	var queryBlog =jsonQuery('data[0].' + val + '.blog', {data: obj}).value;	
	res.render('detailee_info', {
		queryName: queryName,
		queryPic: queryPic,
		queryBlog: queryBlog
	})
})

app.get('/detailee', function(req,res) {
	res.render('detailee');
})

app.get('/course', function(req,res) {
	var text2 = fs.readFileSync('./scripts/cda_courses.json', 'utf8');
	var obj = JSON.parse(text2);
	res.render('corepage', obj);
})

app.get('/course/:course_name', function(req,res) {
	var text = fs.readFileSync('./scripts/cda_courses.json', 'utf8');
	var obj = JSON.parse(text);
	var course_nm = req.params.course_name;
	// console.log(course_nm);
	var queryInfo = jsonQuery('data[website_identifier=' + course_nm + ']', {data: obj})
	// console.log(queryInfo);
	res.render('course_info', queryInfo.references[0]);
})

app.get('*', function(req,res) {
	res.render('500');
});

// console.log(__dirname);

app.listen(app.get('port'));
