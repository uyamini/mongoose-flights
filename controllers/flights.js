// controllers/flights.js
const Flight = require('../models/flight');

module.exports = {
  index,
  new: newFlight,
  create,
  show,
};

async function show(req, res) {
    const flight = await Flight.findById(req.params.id);
    res.render('flights/show', { title: 'Flight Detail', flight });
  }  
async function index(req, res) {
    try {
      const flights = await Flight.find({}).sort('departs');
      res.render('flights/index', { title: 'All Flights', flights, now: new Date() });
    } catch (err) {
      console.error(err);
      res.send("Error retrieving flights.");
    }
  }
  

function newFlight(req, res) {
  const newFlight = new Flight(); // For bonus: handling default departure date
  const dt = newFlight.departs;
  // Formatting departure date for input default value
  let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
  departsDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
  
  res.render('flights/new', { title: 'Add Flight', departsDate });
}

async function create(req, res) {
  await Flight.create(req.body);
  res.redirect('/flights');
}
