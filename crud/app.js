/**
 * Created by kange666 on 2019/4/11.
 */
var express = require('express');
var router = require('./router');
var bodyParser = require('body-parser')

var app=express();

app.use('/public/',express.static('./public/'));
app.use('/node_modules/', express.static('./node_modules/'))

app.engine('html',require('express-art-template'));

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(router)

app.listen(3000, function () {
   console.log('running 3000...')
});

module.exports = app;


