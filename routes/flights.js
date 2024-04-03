// routes/flights.js
const express = require('express');
const router = express.Router();
const flightsCtrl = require('../controllers/flights');
const ticketsCtrl = require('../controllers/tickets');

// GET /flights
router.get('/', flightsCtrl.index);
router.get('/new', flightsCtrl.newFlight);
router.post('/', flightsCtrl.create);
// Correctly added destination route with a note for parameter consistency
router.post('/:id/destinations', flightsCtrl.addDestination);
router.get('/:id', flightsCtrl.show); // This will call the show action for a flight with a given ID


//ticket-related routes
router.get('/:id/tickets/new', ticketsCtrl.new); // Show form to add a new ticket
router.post('/:id/tickets', ticketsCtrl.create); // Process the new ticket form

//Assuming ticket routes are part of flights routes
router.delete('/:flightId/tickets/:ticketId', ticketsCtrl.delete);

module.exports = router;
