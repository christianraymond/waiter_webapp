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

app.set('port', process.env.PORT || 3000);

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
}))

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.render('home');
});

 // app.get('/home', waiterRoute.index);
 // app.get('/names', waiterRoute.index);
 app.post('/', waiterRoute.waiter);
 app.get('/days', waiterRoute.days);

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('App running on ' + 'http://localhost:' + port);
})
