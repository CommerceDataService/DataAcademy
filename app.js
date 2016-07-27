var express = require('express');
var app = express();

app.use(express.static(__dirname + "/"));

app.get('/detailee', function(req,res) {
	res.sendFile(__dirname + "/detailee_info.html")
})

app.listen(3000);