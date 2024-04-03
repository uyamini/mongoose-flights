const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

// Define the 'show' function with a function declaration
async function show(req, res) {
    try {
        const flight = await Flight.findById(req.params.id); // Find the flight by ID
        const tickets = await Ticket.find({flight: flight._id}); // Find tickets associated with this flight
        res.render('flights/show', { flight, tickets }); // Render the flight details view
    } catch (err) {
        console.log(err);
        res.redirect('/flights'); // Redirect to flights listing on error
    }
}

// Add a destination to a flight
function addDestination(req, res) {
    Flight.findById(req.params.id, function(err, flight) { // Use req.params.id here
      if (err || !flight) return res.redirect('/flights');
      flight.destinations.push(req.body); // req.body should contain the destination info
      flight.save(function(err) {
        if (err) console.log(err); // It's a good idea to log or handle the error
        res.redirect(`/flights/${flight._id}`);
      });
    });
}

function create(req, res) {
    // For now, if no departs date provided, set it one year from now
    if (!req.body.departs) {
      const defaultDeparts = new Date();
      defaultDeparts.setFullYear(defaultDeparts.getFullYear() + 1);
      req.body.departs = defaultDeparts;
    }

    Flight.create(req.body, (err, flight) => {
      if (err) return res.redirect('/flights/new');
      res.redirect('/flights');
    });
}

function newFlight(req, res) {
    res.render('flights/new');
}

async function index(req, res) {
    try {
      const flights = await Flight.find({});
      // Ensure 'title' is provided here when rendering the view
      res.render('flights/index', { 
        flights: flights,
        title: 'All Flights'  // Pass 'title' variable here
      });
    } catch (err) {
      console.error(err);
      res.redirect('/'); // Redirect or handle the error appropriately
    }
  }
  

// Export all controller functions
module.exports = {
    index,
    newFlight,
    create,
    addDestination,
    show, // Note 'show' is just listed here without 'exports.' since it's declared above
};
