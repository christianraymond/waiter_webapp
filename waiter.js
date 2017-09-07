module.exports = function(models) {

  const Monday = [];
  const Tuesday = [];
  const Wednesday = [];
  const Thursday = [];
  const Friday = [];
  const Saturday = [];
  const Sunday = []









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

    if (!Array.isArray(days)) {
      days = [days]
    }

      days.forEach(function(day){
        daysObject[day] = true;
      });

    models.findOne({
      name: waiterName
    }, function(err, waiter) {
      if (err) {
        return next(err);
      } else if (waiter) {
        req.flash('error', 'Waiter Name already existed!')

        const waiterData = {
          name: waiter.name
          days: .waiter.daysToWork
        }
        res.render('waitersdays', {
          waiterData
        });
      } else {
        models.create({
          name: waiterName
          daysToWork: daysObject
        }, function(err, waiter) {
          if (err) {
            return next(err)
          } else {
            req.flash("success", 'Name successfully added');
            const waiterData = {
              name: waiter.name,
              days: waiter.daysToWork
            }
            res.render('waitersdays', {
              waiterData
            });
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
