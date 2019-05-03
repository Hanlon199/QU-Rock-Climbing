const express = require('express');
const router = express.Router();
const EventAttendentService = require('../server/services/eventAttendentService');

////////////////////////////////////////////////
// EVENT ATTENDENTS
////////////////////////////////////////////////
router.put('', (req, res) => {
    let eventAttendentServiceObj = new EventAttendentService(req, res);
    eventAttendentServiceObj.addAttendents();
});

router.delete('/:id', (req, res) => {
    let eventAttendentServiceObj = new EventAttendentService(req, res);
    eventAttendentServiceObj.removeAttendent();
});

router.get('', (req, res) => {
    let eventAttendentServiceObj = new EventAttendentService(req, res);
    eventAttendentServiceObj.getAttendents();
});

router.get('/eventAttends', (req, res) => {
    let eventAttendentServiceObj = new EventAttendentService(req, res);
    eventAttendentServiceObj.getEventAttendents();
});

router.post('/detail', (req, res) => {
    let eventAttendentServiceObj = new EventAttendentService(req, res);
    eventAttendentServiceObj.getDetailAttendents();
});

module.exports = router;