// routes/tickets.js
const express = require('express');
const router = express.Router();
const ticketsCtrl = require('../controllers/tickets');

router.get('/flights/:id/tickets/new', ticketsCtrl.new); //Display form to add a ticket
router.post('/flights/:id/tickets', ticketsCtrl.create); //Process the form
router.delete('/flights/:flightId/tickets/:ticketId', ticketsCtrl.delete);


module.exports = router;