//controllers/ticket.js
const Ticket = require('../models/ticket');
const Flight = require('../models/flight');

exports.new = async (req, res) => {
  const flight = await Flight.findById(req.params.id);
  res.render('tickets/new', { title: 'Add Ticket', flight });
};

exports.create = async (req, res) => {
    try {
      req.body.flight = req.params.id;
      await Ticket.create(req.body);
      res.redirect(`/flights/${req.params.id}`);
    } catch (err) {
      console.error(err);
      res.redirect('back');
    }
  };
  exports.delete = async (req, res) => {
    await Ticket.findByIdAndDelete(req.params.ticketId);
    res.redirect(`/flights/${req.params.flightId}`);
  };
  
  