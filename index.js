const express = require('express');
const app = express();
const handlebars = require('express-handlebars').create({
  defaultLayout: 'main'
});
const mongoose = require('mongoose');
const Models = require('./models');
const WaiterRoute = require('./waiter.js');
const waiterRoute = WaiterRoute(Models);

const bodyParser = require('body-parser');
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({
  extended: false
}));
app.set('port', (process.env.PORT || 5000));
// app.set('port', process.env.PORT || 3000);

const flash = require('express-flash');
const session = require('express-session');

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(session({
  secret: 'keyboard cat',
  cookie: {
    maxAge: 6000 * 30
  }
}));

app.use(flash());

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.render('home');
})
app.get('/waiters', function(req, res){
  res.render('home')
})

app.get('/about', function(req, res){
  res.render('about')
})

 app.get('/waiters/:username', waiterRoute.showWaiter);
 app.post('/waiters/:username', waiterRoute.days);
 app.get('/admin', waiterRoute.admin);
 app.post('/admin/resetWaiters', waiterRoute.resetWaiters);

 var port = process.env.PORT || 5000;
 app.listen(port, function() {
   console.log('App runnig on ' + 'http://localhost:' + port);
 })
