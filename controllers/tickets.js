// controllers/tickets.js
const Ticket = require('../models/ticket');
const Flight = require('../models/flight');

// Define the 'new' method to show a form for creating a new ticket
exports.new = async (req, res) => {
    try {
      const flightId = req.params.id; // Changed from 'flightId' to 'id'
      res.render('tickets/new', { title: 'New Ticket', flightId });
    } catch (err) {
      console.error(err);
      res.redirect('/flights');
    }
};

// Function to create a new ticket for a flight
exports.create = async (req, res) => {
    try {
      req.body.flight = req.params.id; // Assign flightId from URL params to the ticket
      const ticket = new Ticket(req.body);
      await ticket.save();
      res.redirect(`/flights/${req.params.id}`); // Redirect to the flight's detail page
    } catch (error) {
      console.error('Error creating ticket:', error);
      res.redirect(`/flights/${req.params.id}`);
    }
  };

// Correctly export both methods at the end of the file
module.exports = {
  new: exports.new,
  create: exports.create,
};