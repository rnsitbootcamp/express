var express = require('express');
var router = express.Router();
var User = require('./../models/User');

/* GET users listing. */
router.get('/', function (req, res, next) {
  User.find({},function(err,data){
    if(err) return next(err);
    res.render('users_list', {
      data,
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
  User.create(req.body,(err,data)=>{
    if(err) return next(err);
    res.redirect('/users');
  });
});

router.get('/edit/:id', function (req, res, next) {
  User.findById(req.params.id,function(err,user){
    if(err) return next(err);
    res.render('edit_users', {
      page_title: "Edit Customers - Node.js",
      data: user
    });
  });
});

router.post('/edit/:id',function(req, res, next){
  User.updateOne({
    _id: req.params.id
  },req.body,function(err,data){
    if(err) return next(err);
    res.redirect('/users');
  });
});

router.get('/delete/:id',function(req,res,next){
  User.deleteOne({
    _id: req.params.id
  },function(err, data){
    if(err) return next(err);
    res.redirect('/users');
  });
});

module.exports = router;
