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
    const daysObject = {};
    const capitalize = req.params.username.substring(0, 1);
    const toUpperCase = req.params.username.substring(0, 1).toUpperCase()
    const waiterName = req.params.username.replace(capitalize, toUpperCase);
    const days = req.body.day

    // if (!Array.isArray(days)) {
    //   days = [days]
    // }
    //
    // days.forEach(function(day) {
    //   daysObject[day] = true;
    // });

    models.findOne({
      name: waiterName
      // daysToWork: days
    }, function(err, waiter) {
      if (err) {
        return next(err);
      } else if (waiter) {
        req.flash('error', 'Waiter Name already existed!')

        res.render('waitersdays', {
          waiter: waiterName,
          daysToWork: JSON.stringify(waiter.daysToWork)
        });
      } else {
        models.create({
          name: waiterName
          // daysToWork: daysObject
        }, function(err, waiter) {
          if (err) {
            return next(err)
          } else {
            req.flash("success", 'Name successfully added');
            res.render('waitersdays', {
              waiter: waiterName
              // daysToWork: days.daysToWork
            });
          }
        });
      };
    });
  }
  function days(req, res, next) {
    var daysObject = {};
    const capitalize = req.params.username.substring(0, 1);
    const toUpperCase = req.params.username.substring(0, 1).toUpperCase()
    const waiterName = req.params.username.replace(capitalize, toUpperCase);
    var days = req.body.day;

    if (!Array.isArray(days)) {
      days = [days]
    }
    days.forEach(function(day) {
      daysObject[day] = true
    });
    models.findOneAndUpdate({
           name: waiterName
    }, {
      daysToWork: daysObject
    }, function(err, shift) {
      if (err) {
        console.log(err);
      } else if (!shift) {
        models.waiterInfo.create({
            name: waiterName,
          daysToWork: daysObject
        });
      }
    });
    req.flash('success', "Your days has been successfully added.")
    res.redirect('/waiters/' + waiterName);
    // res.render('waitersdays', {
    //   name: waiterName,
    //   daysToWork: daysObject
    // });
  }

  function admin(req, res, next) {
    Monday = [];
    Tuesday = [];
    Wednesday = [];
    Thursday = [];
    Friday = [];
    Saturday = [];
    Sunday = [];
    models.find({}, function(err, shift) {
      console.log(shift);
      if (err) {
        return next(err)
      } else {
        for (var i = 0; i < shift.length; i++) {
          var curDays = shift[i].daysToWork;
          for (var day in curDays) {
            if (day == 'Monday') {
              Monday.push(shift[i].waiterName);
            } else if (day == 'Tuesday') {
              Tuesday.push(shift[i].waiterName);
            } else if (day == 'Wednesday') {
              Wednesday.push(shift[i].waiterName);
            } else if (day == 'Thursday') {
              Thursday.push(shift[i].waiterName);
            } else if (day == 'Friday') {
              Friday.push(shift[i].waiterName);
            } else if (day == 'Saturday') {
              Saturday.push(shift[i].waiterName);
            } else if (day == 'Sunday') {
              Sunday.push(shift[i].waiterName);
            }
          }
        }
      }
      res.render("admin", {
        mon: Monday,
        tue: Tuesday,
        wed: Wednesday,
        thur: Thursday,
        fri: Friday,
        sat: Saturday,
        sun: Sunday
      });
    });
  }

  return {
    index,
    showWaiter,
    days,
    admin

  }
};
