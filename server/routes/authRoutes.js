const express = require('express');
const router = express.Router();
const { syncUser } = require('../controllers/authController');

router.post('/sync', syncUser);
router.get('/tutors', require('../controllers/authController').getTutors);

module.exports = router;
