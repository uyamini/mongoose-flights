// controllers/flights.js
const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

const allAirports = ['AUS', 'DFW', 'DEN', 'LAX', 'SAN']; //Full list of airports

module.exports = {
  index,
  new: newFlight,
  create,
  show,
  addDestination
};

async function show(req, res) {
    try {
      const flight = await Flight.findById(req.params.id);
      // Fetch tickets for the current flight
      const tickets = await Ticket.find({ flight: flight._id }); // Add this line
      
      //Build an array of airports to exclude: the flight's origin and its destinations
      const excludedAirports = flight.destinations.map(dest => dest.airport);
      if (flight.airport) excludedAirports.push(flight.airport); // Assuming 'airport' is the origin
      
      //Filter the full list to exclude these airports
      const availableAirports = allAirports.filter(airport => !excludedAirports.includes(airport));
      
      res.render('flights/show', { 
        title: 'Flight Detail', 
        flight,
        availableAirports, //Pass this filtered list to the view
        tickets // Add this line to pass the tickets to the view
      });
    } catch (err) {
      console.error(err);
      res.redirect('/flights');
    }
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

async function addDestination(req, res) {
    try {
      const flight = await Flight.findById(req.params.id);
      flight.destinations.push(req.body);
      await flight.save();
      res.redirect(`/flights/${flight._id}`);
    } catch (error) {
      console.error(error);
      res.redirect(`/flights/${req.params.id}`);
    }
  }
  