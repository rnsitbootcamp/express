var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  fs.readFile(
    path.join(
      __dirname, 
      './../users_database.json'
    ),
    'utf-8',
    function(err,data){
      if(err) return console.log(err);
      res.render('users_list', {
        data: JSON.parse(data),
        page_title: "View Users - Node.js"
      });
    });
});
/* GET add users page. */
router.get('/add', function (req, res, next) {
  res.render('add_users', {
    page_title: "Add Customers - Node.js"
  });
});
/* POST add users data. */
router.post('/add',function(req, res, next){
  fs.readFile(
    path.join(
      __dirname,
      '/../users_database.json'
    ),
    'utf-8',
    function(err, data){
      if(err) return console.log(err);

      var users = JSON.parse(data);
      req.body.id = users.length + 1;
      users.push(req.body);

      fs.writeFile(path.join(
        __dirname,
        '/../users_database.json'
      ),
      JSON.stringify(users)
      ,function(err, result){
        if(err) return console.log(err);
        console.log("writing file completed=====>");
        res.redirect('/users');
      });
  });
});

router.get('/edit/:id', function (req, res, next) {
  fs.readFile(
    path.join(__dirname, './../users_database.json'),
    'utf-8',
    function(err,data){
      if(err) return console.log(err);
      var user = JSON
      .parse(data)
      .filter(user=>user.id === req.params.id*1);
      res.render('edit_users', {
        page_title: "Edit Customers - Node.js",
        data: user
      });
  });
});

router.post('/edit/:id',function(req, res, next){
  fs.readFile(
    path.join(
      __dirname,
      '/../users_database.json'
    ),
    'utf-8',
    function(err, data){
      if(err) return console.log(err);
      var userIndex = null; 
      var users = JSON.parse(data);

      users
      .forEach((user,index)=>{
        if (user.id === req.params.id*1) {
          userIndex = index;
        } 
      });
      req.body.id  = req.params.id*1;
      users[userIndex] = req.body;

      fs.writeFile(path.join(
        __dirname,
        '/../users_database.json'
      ),
      JSON.stringify(users)
      ,function(err, result){
        if(err) return console.log(err);
        console.log("writing file completed=====>");
        res.redirect('/users');
      });
  });
});

router.get('/delete/:id',function(req,res,next){
  fs.readFile(
    path.join(
      __dirname,
      '/../users_database.json'
    ),
    'utf-8',
    function(err, data){
      if(err) return console.log(err);
      var userIndex = null; 
      var users = JSON.parse(data);

      users
      .forEach((user,index)=>{
        if (user.id === req.params.id*1) {
          userIndex = index;
        } 
      });
      
      users.splice(userIndex,1);

      fs.writeFile(path.join(
        __dirname,
        '/../users_database.json'
      ),
      JSON.stringify(users)
      ,function(err, result){
        if(err) return console.log(err);
        console.log("writing file completed=====>");
        res.redirect('/users');
      });
  });
});

module.exports = router;
