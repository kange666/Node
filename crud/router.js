
var fs = require('fs')
var Student = require('./student')

// Express 提供了一种更好的方式
// 专门用来包装路由的
var express = require('express')

// 1. 创建一个路由容器
var router = express.Router()
router.get('/students', function (req, res) {
     // readFile 的第二个参数是可选的，传入 utf8 就是告诉它把读取到的文件直接按照 utf8 编码转成我们能认识的字符
     // 除了这样来转换之外，也可以通过 data.toString() 的方式

       // 从文件中读取到的数据一定是字符串
       // 所以这里一定要手动转成对象


    Student.find(function (err,students) {
        if(err){
            return res.status(500).send('Server error.')
        }
        res.render('index.html', {
            students:students
        })

    })
})


router.get('/students/new', function (req, res) {
    res.render('new.html')
})


router.post('/students/new', function (req, res) {
    // 1. 获取表单数据
    // 2. 处理
    //    将数据保存到 db.json 文件中用以持久化
    // 3. 发送响应
    Student.save(req.body, function (err) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.redirect('/students')
    })
})


router.get('/students/edit', function (req, res) {
   //console.log(req.query.id)
    Student.findById(parseInt(req.query.id), function (err,student) {
        if(err){
            return res.status(500).send('Server error.')
        }
        res.render('edit.html', {
            student:student
        })
    })
})

/*
 * 处理编辑学生
 */
router.post('/students/edit', function (req, res) {

    Student.updateById(req.body, function (err) {
        if(err){
            return res.status(500).send('Server error.')
        }
       res.redirect('/students')
    })
})

/*
 * 处理删除学生
 */
router.get('/students/delete', function (req, res) {
    // 1. 获取要删除的 id
    // 2. 根据 id 执行删除操作
    // 3. 根据操作结果发送响应数据

    Student.deleteById(req.query.id, function (err) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.redirect('/students')
    })
})



module.exports = router


//var fs = require('fs')
//module.exports = function (app) {
//   app.get('/students', function (req, res) {
//     // readFile 的第二个参数是可选的，传入 utf8 就是告诉它把读取到的文件直接按照 utf8 编码转成我们能认识的字符
//     // 除了这样来转换之外，也可以通过 data.toString() 的方式
//     fs.readFile('./db.json', 'utf8', function (err, data) {
//       if (err) {
//         return res.status(500).send('Server error.')
//       }
//
//       // 从文件中读取到的数据一定是字符串
//       // 所以这里一定要手动转成对象
//
//
//       res.render('index.html', {
//         students:JSON.parse(data).students
//       })
//     })
//   })
//
//   app.get('/students/new', function (req, res) {
//       res.render('new.html')
//   })
//
//   app.get('/students/new', function (req, res) {
//
//   })
//
//   app.get('/students/new', function (req, res) {
//
//   })
//
//   app.get('/students/new', function (req, res) {
//
//   })
//
//   app.get('/students/new', function (req, res) {
//
//   })
// }
