const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const passport = require('passport');
var Strategy = require('passport-local').Strategy;


const db = require('./db.js');


passport.use(new Strategy(
  function(username, password, done){
    db.User.findOne({
      where: {
        email: username
      }
    })
    .then((user) => {
      if(!user){
        return done(null, false);
      }
      if(user.password !== password){
        return done(null, false);
      }
      return done(null, user);
    })
    .catch(err => {
      return done(err);
    })
  }));

  passport.serializeUser(function(user, done){
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done){
    db.User.findByPk(id)
    .then(user => {
      done(null, user);
    })
    .catch(err => {
      return done(err);
    })
  });


const server = express();

server.use(require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  	res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  	res.header('Access-Control-Allow-Credentials', 'true');
  	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use(passport.initialize());
server.use(passport.session());

server.use((req, res, next) => {
  console.log(req.session);
  console.log(req.user);
  next();
});

server.use('/', routes);

server.post('/login',
  passport.authenticate('local', {failureRedirect: '/login'}),
  function(req, res) {
    res.send('OK');
  });


server.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

  function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
      next();
    }
    else{
      res.redirect('/login');
    }
  }

  // Error catching endware.
  server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
  });

module.exports = server;
