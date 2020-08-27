/*const server = require('express').Router();
const { User } = require('../db.js');
const passport = require('passport');

server.get('/close', function(req, res){
  req.logout();
  res.redirect('/');
});

server.post('/',
  passport.authenticate('local', {failureRedirect: '/'}),
  function(req, res) {
    res.redirect('/');
  });

  function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
      next();
    }
    else{
      res.redirect('/');
    }
  }*/
