// const mongoose = require('mongoose');
module.exports = function(models) {
  var message = null;

  function index(req, res, next) {
    models.find({}, function(err, waiters) {
      if (err) {
        return next(err)
      } else {
        res.render('waitersdays', {
          person: waiters,
          message: message
        });
      }
    });
  }

  // function processWaiterShift = function(req, res, next){
  // models.create({
  //   waiterName: waiterName
  // }, function(err, result) {
  //   if (err) {
  //     if (err.code == 11000) {
  //       res.flash('error',
  //         'Name already existed!')
  //       return next(err)
  //     }
  //     message = null;
  //     req.flash('success', 'Name added!')
  //     res.render('home');
  //   }
  // });

  function showWaiter(req, res, next) {
    const waiterName = req.params.username.toUpperCase();
    // console.log(waiterName);
    models.findOne({
      name: waiterName
    }, function(err, waiter) {
      if (err) {
        return next(err);
      } else {
        req.flash("success", 'Hello ' + waiterName + ', Select your prefered working days below!');
        // return res.redirect('/waiters/' + waiterName);
        // display empty form for user to enter...
         res.render('waitersdays');
      }

    });
  }


  return {
    index,
    showWaiter,
  }
};
