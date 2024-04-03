// controllers/tickets.js
const Ticket = require('../models/ticket');
const Flight = require('../models/flight');

// Define the 'new' method to show a form for creating a new ticket
exports.new = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.flightId); // Ensure 'flightId' matches your route parameter
    res.render('tickets/new', { title: 'New Ticket', flight });
  } catch (err) {
    console.error(err);
    res.redirect('/flights');
  }
};

exports.create = async (req, res) => {
  const flightId = req.params.flightId; // Ensure this param name matches your route definition
  const { seat, price } = req.body;

  try {
    // Create and save the new ticket
    const ticket = new Ticket({ seat, price, flight: flightId });
    await ticket.save();

    // Redirect back to the flight's detail page
    res.redirect(`/flights/${flightId}`);
  } catch (err) {
    console.error(err);
    // Optionally, handle error, e.g., by redirecting to an error page or back to the form with an error message
    res.redirect(`/flights/${flightId}`);
  }
};

// Correctly export both methods at the end of the file
module.exports = {
  new: exports.new,
  create: exports.create,
};