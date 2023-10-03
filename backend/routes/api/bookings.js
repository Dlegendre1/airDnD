const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Booking } = require('../../db/models');

const router = express.Router();

//Get all current user's bookings
router.get(
    '/current',
    async (req, res, next) => {

    }
);

//Update and return an existing booking
router.put(
    '/:bookingId',
    async (req, res, next) => {

    }
);

//Delete a booking
router.delete(
    '/:bookingId',
    async (req, res, next) => {

    }
);



module.exports = router;
