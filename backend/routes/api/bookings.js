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
        const userId = req.user.id;
        const userBookings = await Booking.findAll({ where: { userId: userId } });

        const bookings = userBookings.map(booking => ({
            id: booking.id,
            spotId: booking.spotId,
            Spot: booking.Spot,
            userId: booking.userId,
            startDate: booking.startDate,
            endDate: booking.endDate,
            createdAt: booking.createdAt,
            updatedAt: booking.updatedAt,
        }));

        res.json({ Bookings: bookings });
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
