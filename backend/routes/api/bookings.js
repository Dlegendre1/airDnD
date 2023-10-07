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
    requireAuth,
    async (req, res, next) => {
        const userId = req.user.id;
        const userBookings = await Booking.findAll({
            where: { userId: userId },
            include: [{
                model: Spot,
                attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price', 'previewImage']
            }]
        });

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
    requireAuth,
    async (req, res, next) => {
        const userId = req.user.id;
        const bookingId = req.params.bookingId;
        const currDate = new Date();
        const { startDate, endDate } = req.body;

        const booking = await Booking.findByPk(bookingId);

        if (!booking) {
            return res.status(404).json({ "message": "Booking couldn't be found" });
        }
        if (currDate > endDate) {
            return res.status(403).json({ "message": "Past bookings can't be modified" });
        }

        if (startDate >= endDate) {
            return res.status(400).json({
                "message": "Bad Request",
                "errors": {
                    "endDate": "endDate cannot come before startDate"
                }
            });
        }
        const newStartDate = new Date(startDate);
        const newEndDate = new Date(endDate);

        if (booking.userId === userId) {
            const spotBookingsEndDate = await Booking.findAll({
                where: {
                    id: { [Op.ne]: booking.id },
                    spotId: booking.spotId,
                    startDate: { [Op.lte]: newEndDate },
                    endDate: { [Op.gte]: newEndDate }
                },

            });
            const spotBookingsStartDate = await Booking.findAll({
                where: {
                    id: { [Op.ne]: booking.id },
                    spotId: booking.spotId,
                    startDate: { [Op.lte]: newStartDate },
                    endDate: { [Op.gte]: newStartDate }
                }
            });
            const spotBookingStraddle = await Booking.findAll({
                where: {
                    id: { [Op.ne]: booking.id },
                    spotId: booking.spotId,
                    startDate: { [Op.gte]: newStartDate },
                    endDate: { [Op.lte]: newEndDate },
                }
            });
            if ((spotBookingsStartDate.length > 0 && spotBookingsEndDate.length > 0) || spotBookingStraddle.length > 0) {
                return res.status(403).json({
                    "message": "Sorry, this spot is already booked for the specified dates",
                    "errors": {
                        "startDate": "Start date conflicts with an existing booking",
                        "endDate": "End date conflicts with an existing booking"
                    }
                });
            }

            if (spotBookingsStartDate.length > 0) {
                return res.status(403).json({
                    "message": "Sorry, this spot is already booked for the specified dates",
                    "errors": {
                        "startDate": "Start date conflicts with an existing booking",
                    }
                });
            }

            if (spotBookingsEndDate.length > 0) {
                return res.status(403).json({
                    "message": "Sorry, this spot is already booked for the specified dates",
                    "errors": {
                        "endDate": "End date conflicts with an existing booking"
                    }
                });
            }

            const safeBooking = {
                startDate: startDate,
                endDate: endDate
            };
            await booking.update(safeBooking);
            return res.json(booking);
        }



        return res.json({ "message": "Forbidden" });
    }
);

//Delete a booking
router.delete(
    '/:bookingId',
    requireAuth,
    async (req, res, next) => {
        const userId = req.user.id;
        const bookingId = req.params.bookingId;
        const currDate = new Date();
        const booking = await Booking.findByPk(bookingId);
        if (!booking) {
            return res.status(404).json({ "message": "Booking couldn't be found" });
        }
        if (userId !== booking.userId) {
            return res.status(403).json({ "message": "Forbidden" });
        }
        if (currDate > booking.startDate) {
            return res.status(403).json({ "message": "Bookings that have been started can't be deleted" });
        }
        await booking.destroy();
        return res.json({ "message": "Successfully deleted" });
    }
);



module.exports = router;
