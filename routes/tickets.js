// routes/tickets.js
const express = require('express');
const router = express.Router();
const ticketsCtrl = require('../controllers/tickets');

// Routes go here
router.get('/flights/:id/tickets/new', ticketsCtrl.new); //Display form to add a ticket
router.post('/flights/:id/tickets', ticketsCtrl.create); //Process the form

module.exports = router;