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

    models.findOne({
      name: waiterName
    }, function(err, waiter) {
      if (err) {
        return next(err);
      } else if (waiter) {
        req.flash('error', 'Waiter Name already existed!')

        res.render('waitersdays', {
          name: waiter.name,
          days: waiter.daysToWork
        });
      } else {
        models.create({
          name: waiterName
        }, function(err, waiter) {
          if (err) {
            return next(err)
          } else {
            req.flash("success", 'Name successfully added');
            res.render('waitersdays', {
              name: waiterName
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
    req.flash('success', "Your day(s) has been successfully added.")
    res.redirect('/waiters/' + waiterName);
  }

  function roasterCoulorStyle(waiterCounter) {
    if (waiterCounter === 3) {
      return 'bg-success'
    } else if (waiterCounter > 3) {
      return 'bg-warning'
    } else {
      return 'big-danger'
    }
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
      if (err) {
        return next(err)
      } else {
        for (var i = 0; i < shift.length; i++) {
          var myDays = shift[i].daysToWork;
          for (var day in myDays) {
            if (day == 'Monday') {
              Monday.push(shift[i].name);
            } else if (day == 'Tuesday') {
              Tuesday.push(shift[i].name);
            } else if (day == 'Wednesday') {
              Wednesday.push(shift[i].name);
            } else if (day == 'Thursday') {
              Thursday.push(shift[i].name);
            } else if (day == 'Friday') {
              Friday.push(shift[i].name);
            } else if (day == 'Saturday') {
              Saturday.push(shift[i].name);
            } else if (day == 'Sunday') {
              Sunday.push(shift[i].name);
            }
          }
        }
      }
      res.render("admin", {
        mondayNames: Monday,
        mondayCounter: Monday.length,
        mondayStyle: roasterCoulorStyle(Monday.length),

        tuesdayNames: Tuesday,
        tuesdayCounter: Tuesday.length,
        tuesdayStyle: roasterCoulorStyle(Tuesday.length),

        wednesdayNames: Wednesday,
        wednesdayCounter: Wednesday.length,
        wednesdayStyle: roasterCoulorStyle(Wednesday.length),

        thursdayNames: Thursday,
        thursdayCounter: Thursday.length,
        thursdayStyle: roasterCoulorStyle(Thursday.length),

        fridayNames: Friday,
        fridayCounter: Friday.length,
        fridayStyle: roasterCoulorStyle(Friday.length),

        saturdayNames: Saturday,
        saturdayCounter: Saturday.length,
        saturdayStyle: roasterCoulorStyle(Saturday.length),

        sundayNames: Sunday,
        sundayCounter: Sunday.length,
        sundayStyle: roasterCoulorStyle(Sunday.length),
      });
    });
  }

  function resetWaiters(req, res, next) {
    models.remove({}, function(err, db) {
      if (err) {
        console.log(err);
      }
      res.redirect("/admin")
    })
  }

  return {
    index,
    showWaiter,
    days,
    roasterCoulorStyle,
    admin,
    resetWaiters
  }
};
