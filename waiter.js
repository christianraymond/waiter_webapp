// const mongoose = require('mongoose');
module.exports = function(models) {

  function index(req, res, next) {
    models.find({}, function(err, waiters) {
      if (err) {
        return next(err)
      } else {
        res.render('waitersdays', {
          person: waiters,
        });
      }
    });
  }

  function showWaiter(req, res, next) {
    const waiterName = req.params.username.toUpperCase();
    models.findOne({
      name: waiterName
    }, function(err, waiter) {
      if (err) {
        // if theres an error return next error
        return next(err);
      } else if (waiter) {
        req.flash('error', 'Waiter Name already existed!')
        res.render('waitersdays', {waiter});
      } else {
        // if it does not exist
        // go create it
        models.create({
          name: waiterName
        }, function(err, waiter) {
          if (err) {
            // if theres an error saving the waiter
            // return next error
            return next(err)
          } else {
            // else if  theres no error with creation of the names
            // do flash success
            // render waites days page
            req.flash("success", 'Name successfully added');
            res.render('waitersdays', {waiter});
          }
        });
      };
    });

  }
  return {
    index,
    showWaiter,
  }
};
