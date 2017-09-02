// const mongoose = require('mongoose');
module.exports = function(models) {
  var message = null;

  function index(req, res, next) {
    models.find({}, function(err, waiters) {
      if (err) {
        return next(err)
      } else {
        res.render('home', {
          person: waiters,
          message: message
        });
      }
    });
  }

  function waiter(req, res, next) {
    const name = req.body.name.toUpperCase();
    console.log(name);
    // console.log('fffff');

    models.findOne({
      waiterName: name
    }, function(err, WaiterName) {
      if (err) {
        return next(err);
      } else if (WaiterName) {
        // console.log(WaiterName);
        message = 'Welcome back ' + WaiterName.waiterName;
        res.redirect('/days');
      } else {
        models.create({
          waiterName: name
        }, function(err, result) {
          if (err) {
            if (err.code == 11000) {
              res.flash('error',
                'Name already existed!')
              return next(err)
            }
            message = null;
          } else {
            console.log('ggggg');
            // res.flash('success', 'Hello, Select your prefered working days!')
            res.redirect('/days');
          }
        });
      }
    });
  }

  function days(req, res, next) {
    res.render('days', {message: message});
  }

  return {
    index,
    waiter,
    days
  }
};
