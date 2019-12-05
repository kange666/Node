/**
 * Created by kange666 on 2019/4/9.
 */
var express = require("express");

var app = express();


app.use('/public/', express.static('./public/'));

app.get('/', function (req,res) {
    res.send('hello world')
});

app.listen(300, function () {
    console.log('running...')
});