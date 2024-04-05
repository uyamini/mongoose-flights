// controllers/tickets.js
const Ticket = require('../models/ticket');
const Flight = require('../models/flight');

exports.new = async (req, res) => {
    try {
      const flightId = req.params.id; 
      res.render('tickets/new', { title: 'New Ticket', flightId });
    } catch (err) {
      console.error(err);
      res.redirect('/flights');
    }
};

exports.create = async (req, res) => {
    try {
      req.body.flight = req.params.id; 
      const ticket = new Ticket(req.body);
      await ticket.save();
      res.redirect(`/flights/${req.params.id}`); 
    } catch (error) {
      console.error('Error creating ticket:', error);
      res.redirect(`/flights/${req.params.id}`);
    }
  };

  exports.delete = async (req, res) => {
    try {
      await Ticket.findByIdAndDelete(req.params.ticketId);
      res.redirect(`/flights/${req.params.flightId}`);
    } catch (error) {
      console.error('Error deleting ticket:', error);
      res.redirect(`/flights/${req.params.flightId}`);
    }
  };

module.exports = {
  new: exports.new,
  create: exports.create,
  delete: exports.delete
};