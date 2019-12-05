/**
 * Created by kange666 on 2019/4/9.
 */
var express = require('express');

var app = express();

app.use('/public/',express.static('./public/'));

app.engine('html',require('express-art-template'));

var comments = [
    {
        name: '张三',
        message: '今天天气不错！',
        dateTime: '2015-10-16'
    },
    {
        name: '张三2',
        message: '今天天气不错！',
        dateTime: '2015-10-16'
    },
    {
        name: '张三3',
        message: '今天天气不错！',
        dateTime: '2015-10-16'
    },
    {
        name: '张三4',
        message: '今天天气不错！',
        dateTime: '2015-10-16'
    },
    {
        name: '张三5',
        message: '今天天气不错！',
        dateTime: '2015-10-16'
    }
]

app.get('/', function (req,res) {
   res.render('index.html',{
       comments:comments
   })
});

app.get('/post', function (req,res) {
    res.render('post.html')
});

app.get('/pinglun', function (req,res) {
    var comment = req.query
    comment.dateTime = "2019-4-10"
    comments.unshift(comment)
    res.redirect('/')
    //res.statusCode = 302
    //res.setHeader('location','/')
});

app.listen(3000, function () {
   console.log('running...')
});