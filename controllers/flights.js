const Flight = require('../models/flight');

module.exports = {
  new: newFlight,
  create,
  index
};

function index(req, res) {
    Flight.find({}, function(err, flights) {
      res.render('flights/index', { flights });
    });
  }
  
function newFlight(req, res) {
  res.render('flights/new');
}

function create(req, res) {
  Flight.create(req.body, function(err, flight) {
    if (err) return res.render('flights/new');
    res.redirect('/flights');
  });
}
