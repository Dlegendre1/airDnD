const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check, query } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
const { JsonWebTokenError } = require('jsonwebtoken');

const router = express.Router();

const validateSpotPost = [
    check('address')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('Country is required'),
    check('lat')
        .exists({ checkFalsy: true })
        .isDecimal()
        .custom((value) => {
            if (value < -90 || value > 90) {
                return false;
            }
            return true;
        })
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({ checkFalsy: true })
        .isDecimal()
        .custom((value) => {
            if (value < -180 || value > 180) {
                return false;
            }
            return true;
        })
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .custom((value) => {
            if (value <= 0) {
                return false;
            }
            return true;
        })
        .withMessage('Price per day is required'),
    handleValidationErrors
];
const validateReviewPost = [
    check('review')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .isInt({ min: 1, max: 5 })
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
];
const validateQueryParams = [
    query('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Page must be greater than or equal to 1'),
    query('size')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Size must be greater than or equal to 1'),
    query('maxLat')
        .optional()
        .isDecimal()
        .custom((value) => {
            if (value < -90 || value > 90) {
                return false;
            }
            return true;
        })
        .withMessage('Maximum latitude is invalid'),
    query('minLat')
        .optional()
        .isDecimal()
        .custom((value) => {
            if (value < -90 || value > 90) {
                return false;
            }
            return true;
        })
        .withMessage('Minimum latitude is invalid'),
    query('maxLng')
        .optional()
        .isDecimal()
        .custom((value) => {
            if (value < -180 || value > 180) {
                return false;
            }
            return true;
        })
        .withMessage('Maximum longitude is invalid'),
    query('minLng')
        .optional()
        .isDecimal()
        .custom((value) => {
            if (value < -180 || value > 180) {
                return false;
            }
            return true;
        })
        .withMessage('Minimum longitude is invalid'),
    query('minPrice')
        .optional()
        .isDecimal({ length: 2 })
        .isFloat({ min: 0 })
        .withMessage('Minimum price must be greater than or equal to 0'),
    query('maxPrice')
        .optional()
        .isDecimal({ length: 2 })
        .isFloat({ min: 0 })
        .withMessage('Minimum price must be greater than or equal to 0'),
    handleValidationErrors
];


//Get all spots
router.get(
    '/',
    validateQueryParams,
    async (req, res, next) => {
        let page = 1;
        let size = 20;

        const lowerParams = { lat: -9999999999999, lng: -999999999999999, price: 0 };
        const upperParams = { lat: 9999999999999, lng: 999999999999999, price: 99999999999999 };
        if (req.query.page) {
            page = req.query.page;
        }
        if (req.query.size) {
            size = req.query.size;
        }
        if (req.query.minLat) {
            lowerParams.lat = req.query.minLat;
        }
        if (req.query.maxLat) {
            upperParams.lat = req.query.maxLat;
        }
        if (req.query.minLng) {
            lowerParams.lng = req.query.minLng;
        }
        if (req.query.maxLng) {
            upperParams.lng = req.query.maxLng;
        }
        if (req.query.minPrice) {
            lowerParams.price = req.query.minPrice;
        }
        if (req.query.maxPrice) {
            upperParams.price = req.query.maxPrice;
        }


        const allSpots = await Spot.findAll({
            limit: size,
            offset: (page - 1) * size,
            where: {
                lat: { [Op.between]: [lowerParams.lat, upperParams.lat] },
                lng: { [Op.between]: [lowerParams.lng, upperParams.lng] },
                price: { [Op.between]: [lowerParams.price, upperParams.price] },
            },
            include: [Review, SpotImage]
        });


        const spots = allSpots.map(spot => {
            let avgRating;
            let previewImage;
            if (spot.Reviews.length > 0) {
                const totalRating = spot.Reviews.reduce((avgRating, review) => {
                    return avgRating + review.stars;
                }, 0);

                avgRating = (totalRating / spot.Reviews.length).toFixed(2);
            }

            if (spot.SpotImages.length > 0) {
                spot.SpotImages.forEach((image) => {
                    if (image.preview === true) {
                        previewImage = image.url;
                    }
                });
            }

            return {
                id: spot.id,
                ownerId: spot.ownerId,
                address: spot.address,
                city: spot.city,
                state: spot.state,
                country: spot.country,
                lat: spot.lat,
                lng: spot.lng,
                name: spot.name,
                description: spot.description,
                price: spot.price,
                createdAt: spot.createdAt,
                updatedAt: spot.updatedAt,
                avgRating: avgRating,
                previewImage: previewImage
            };

        });
        res.json({ Spots: spots, page: page, size: size });
    }
);

//Get spots of current user
router.get(
    '/current',
    requireAuth,
    async (req, res, next) => {
        const userId = req.user.id;
        const userSpots = await Spot.findAll({ where: { ownerId: userId } });

        const spots = userSpots.map(spot => ({
            id: spot.id,
            ownerId: spot.ownerId,
            address: spot.address,
            city: spot.city,
            state: spot.state,
            country: spot.country,
            lat: spot.lat,
            lng: spot.lng,
            name: spot.name,
            description: spot.description,
            price: spot.price,
            createdAt: spot.createdAt,
            updatedAt: spot.updatedAt,
            avgRating: spot.avgRating,
            previewImage: spot.previewImage
        }));
        await setTokenCookie(res, req.user);
        res.json({ Spots: spots });
    }
);

//Post a new spot
router.post(
    '/',
    validateSpotPost,
    requireAuth,
    async (req, res, next) => {
        const { address, city, state, country, lat, lng, name, description, price } = req.body;
        const ownerId = req.user.id;
        const spot = await Spot.create({ ownerId, address, city, state, country, lat, lng, name, description, price });

        const safeSpot = {
            id: spot.id,
            ownerId: ownerId,
            address: spot.address,
            city: spot.city,
            state: spot.state,
            country: spot.country,
            lat: spot.lat,
            lng: spot.lng,
            name: spot.name,
            description: spot.description,
            price: spot.price,
            createdAt: spot.createdAt,
            updatedAt: spot.updatedAt
        };
        await setTokenCookie(res, req.user);
        return res.status(201).json(
            safeSpot
        );
    }
);

//Get details of a spot from an id
router.get(
    '/:spotId',
    async (req, res, next) => {
        const spotId = req.params.spotId;
        const spot = await Spot.findOne({
            where: { id: spotId },
            include: [SpotImage, { model: User, as: 'Owner' }, Review]
        });


        if (spot) {
            if (spot.Reviews.length > 0) {
                let avgRating;
                const totalRating = spot.Reviews.reduce((avgRating, review) => {
                    return avgRating + review.stars;
                }, 0);

                avgRating = (totalRating / spot.Reviews.length).toFixed(2);
                spot.avgRating = avgRating;
            }

            if (spot.SpotImages.length > 0) {
                spot.SpotImages.forEach((image) => {
                    if (image.preview === true) {
                        spot.previewImage = image.url;
                    }
                });
            }

            return res.json(spot);
        } else {
            return res.status(404).json({ "message": "Spot couldn't be found" });

        }

    }
);

//Add image to spot based on spot id
router.post(
    '/:spotId/images',
    requireAuth,
    async (req, res, next) => {
        await setTokenCookie(res, req.user);
        const spotId = req.params.spotId;
        const userId = req.user.id;
        const { url, preview } = req.body;
        const spot = await Spot.findByPk(spotId);
        if (!spot) {
            return res.status(404).json({ "message": "Spot couldn't be found" });
        }
        if (userId !== spot.ownerId) {
            res.status(403).json({ "message": "Forbidden" });
        }

        const spotImage = await SpotImage.create({ url, preview });

        await spotImage.setSpot(spot);

        if (await Spot.findByPk(spotId)) {
            return res.json({
                id: spotImage.id,
                url: spotImage.url,
                preview: spotImage.preview
            });
        } else {
            return res.json({ "message": "Spot couldn't be found" });
        }
    }
);

//Edit a spot
router.put(
    '/:spotId',
    requireAuth,
    validateSpotPost,
    async (req, res, next) => {
        await setTokenCookie(res, req.user);
        const userId = req.user.id;
        const spotId = req.params.spotId;
        const { address, city, state, country, lat, lng, name, description, price } = req.body;
        const spot = await Spot.findByPk(spotId);
        if (!spot) {
            return res.status(404).json({ "message": "Spot couldn't be found" });
        }
        if (userId !== spot.ownerId) {
            res.status(403).json({ "message": "Forbidden" });
        }
        if (spot.ownerId === userId) {
            const safeSpot = {
                address: address,
                city: city,
                state: state,
                country: country,
                lat: lat,
                lng: lng,
                name: name,
                description: description,
                price: price
            };
            await spot.update(safeSpot);
            return res.json({ id: spot.id, ownerId: spot.ownerId, ...safeSpot, createdAt: spot.createdAt, updatedAt: spot.updatedAt });
        }
    }
);

//Delete a spot
router.delete(
    '/:spotId',
    requireAuth,
    async (req, res, next) => {
        const userId = req.user.id;
        const spotId = req.params.spotId;
        const spot = await Spot.findByPk(spotId);
        if (!spot) {
            return res.status(404).json({ "message": "Spot couldn't be found" });
        };
        if (userId !== spot.ownerId) {
            res.status(403).json({ "message": "Forbidden" });
        }

        await setTokenCookie(res, req.user);
        await spot.destroy();
        return res.status(200).json({ "message": "Successfully deleted" });
    }
);

//Get all reviews by spotId
router.get(
    '/:spotId/reviews',
    requireAuth,
    async (req, res, next) => {
        const spotId = req.params.spotId;
        const spot = await Spot.findOne({ where: { id: spotId } });
        const spotReviews = await Review.findAll({
            where: { spotId: spotId },
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                },
                {
                    model: ReviewImage,
                    attributes: ['id', 'url']
                }
            ]

        });
        if (!spot) {
            return res.status(404).json({ "message": "Spot couldn't be found" });
        }


        const reviews = spotReviews.map(review => ({
            id: review.id,
            userId: review.userId,
            spotId: review.spotId,
            review: review.review,
            stars: review.stars,
            createdAt: review.createdAt,
            updatedAt: review.updatedAt,
            User: review.User,
            ReviewImages: review.ReviewImages,
        }));

        res.json({ Reviews: reviews });
    }
);

//Create review for spot based on spotId
router.post(
    '/:spotId/reviews',
    requireAuth,
    validateReviewPost,
    async (req, res, next) => {
        const spotId = req.params.spotId;
        const userId = req.user.id;
        const { id, review, stars, createdAt, updatedAt } = req.body;
        const spot = await Spot.findOne({
            where: { id: spotId },
            include: [Review]
        });
        if (!spot) {
            return res.status(404).json({ "message": "Spot couldn't be found" });
        }
        const reviews = spot.Reviews;
        const reviewUserIds = (review) => review.userId === userId;
        if (reviews.some(reviewUserIds)) {
            return res.status(500).json({ "message": "User already has a review for this spot" });
        };


        const spotReview = await Review.create({ id, userId, spotId, review, stars, createdAt, updatedAt });

        await spotReview.setSpot(spot);

        const safeReview = {
            id: spotReview.id,
            userId: userId,
            spotId: spotReview.spotId,
            review: spotReview.review,
            stars: spotReview.stars,
            createdAt: spotReview.createdAt,
            updatedAt: spotReview.updatedAt
        };
        await setTokenCookie(res, req.user);
        return res.status(201).json({ ...safeReview });
    }
);

//Get all bookings for a spot based on the spot's id
router.get(
    '/:spotId/bookings',
    requireAuth,
    async (req, res, next) => {
        const spotId = req.params.spotId;
        const spot = await Spot.findByPk(spotId);
        if (!spot) {
            return res.status(404).json({ "message": "Spot couldn't be found" });
        }

        if (req.user.id === spot.ownerId) {
            const spotBookings = await Booking.findAll({
                where: { spotId: spotId },
                include: [
                    {
                        model: User,
                        attributes: ['id', 'firstName', 'lastName']
                    }]
            });

            const bookings = spotBookings.map(booking => ({
                User: booking.User,
                id: booking.id,
                spotId: booking.spotId,
                userId: booking.userId,
                startDate: booking.startDate,
                endDate: booking.endDate,
                createdAt: booking.createdAt,
                updatedAt: booking.updatedAt
            }));

            res.json({ Bookings: bookings });
        } else {
            const spotBookings = await Booking.findAll({
                where: { spotId: spotId }
            });

            const bookings = spotBookings.map(booking => ({
                spotId: booking.spotId,
                startDate: booking.startDate,
                endDate: booking.endDate,
            }));
            res.json({ Bookings: bookings });
        }
    }
);

//Create a booking from a spot based on spotId
router.post(
    '/:spotId/bookings',
    requireAuth,
    async (req, res, next) => {
        const spotId = req.params.spotId;
        const userId = req.user.id;
        const { startDate, endDate } = req.body;
        const spot = await Spot.findByPk(spotId);

        if (!spot) {
            return res.status(404).json({ "message": "Spot couldn't be found" });
        }
        if (startDate >= endDate) {
            return res.status(400).json({
                "message": "Bad Request",
                "errors": {
                    "endDate": "endDate cannot be on or before startDate"
                }
            });
        }
        if (spot.ownerId === userId) {
            return res.status(403).json({ "message": "Forbidden" });
        }



        const newStartDate = new Date(startDate);
        const newEndDate = new Date(endDate);
        if (spot) {
            const spotBookingsEndDate = await Booking.findAll({
                where: {
                    spotId: spotId,
                    startDate: { [Op.lte]: newEndDate },
                    endDate: { [Op.gte]: newEndDate }
                }
            });
            const spotBookingsStartDate = await Booking.findAll({
                where: {
                    spotId: spotId,
                    startDate: { [Op.lte]: newStartDate },
                    endDate: { [Op.gte]: newStartDate }
                }
            });
            const spotBookingStraddle = await Booking.findAll({
                where: {
                    spotId: spotId,
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

            const spotBooking = await Booking.create({ userId, startDate, endDate });
            await spotBooking.setSpot(spot);

            return res.json({
                id: spotBooking.id,
                spotId: spotBooking.spotId,
                userId: userId,
                startDate: spotBooking.startDate,
                endDate: spotBooking.endDate,
                createdAt: spotBooking.createdAt,
                updatedAt: spotBooking.updatedAt,
            });
        }
        return res.json({ "message": "Spot couldn't be found" });
    }
);






module.exports = router;
