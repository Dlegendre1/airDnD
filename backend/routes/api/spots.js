const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, ReviewImage } = require('../../db/models');
const { JsonWebTokenError } = require('jsonwebtoken');

const router = express.Router();

//Get all spots
router.get(
    '/',
    async (req, res, next) => {
        const allSpots = await Spot.findAll();

        const spots = allSpots.map(spot => ({
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
        res.json({ Spots: spots });
    }
);

//Get spots of current user
router.get(
    '/current',
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

        res.json({ Spots: spots });
    }
);

//Post a new spot
router.post(
    '/',
    async (req, res, next) => {
        const { id, address, city, state, country, lat, lng, name, description, price, createdAt, updatedAt } = req.body;
        const ownerId = req.user.id;
        const spot = await Spot.create({ id, ownerId, address, city, state, country, lat, lng, name, description, price, createdAt, updatedAt });

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
        return res.json({
            spot: safeSpot
        });
    }
);

//Get details of a spot from an id
router.get(
    '/:spotId',
    async (req, res, next) => {
        const spotId = req.params.spotId;
        const spot = await Spot.findByPk(spotId);

        if (spot) {
            return res.json({ spot });
        } else {
            return res.json({ "message": "Spot couldn't be found" });

        }

    }
);

//Add image to spot based on spot id
router.post(
    '/:spotId/images',
    async (req, res, next) => {
        const spotId = req.params.spotId;
        const { url, preview } = req.body;
        const spot = await Spot.findByPk(spotId);
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
    async (req, res, next) => {
        const userId = req.user.id;
        const spotId = req.params.spotId;
        const { address, city, state, country, lat, lng, name, description, price } = req.body;
        const spot = await Spot.findByPk(spotId);

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
            return res.json({ ...safeSpot });
        } else {
            res.status(404).json({ "message": "Spot couldn't be found" });
        }
    }
);

//Delete a spot
router.delete(
    '/:spotId',
    async (req, res, next) => {
        const userId = req.user.id;
        const spotId = req.params.spotId;
        const spot = await Spot.findByPk(spotId);
        if (!spot) {
            return res.status(404).json({ "message": "Spot couldn't be found" });
        };

        await spot.destroy();
        return res.status(200).json({ "message": "Successfully deleted" });
    }
);

//Get all reviews by spotId
router.get(
    '/:spotId/reviews',
    async (req, res, next) => {
        const spotId = req.params.spotId;
        const spotReviews = await Review.findAll({ where: { spotId: spotId } });

        const reviews = spotReviews.map(review => ({
            id: review.id,
            userId: review.userId,
            spotId: spotId,
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
    async (req, res, next) => {
        const { id, review, stars, createdAt, updatedAt } = req.body;
        const spotId = req.params.spotId;
        const userId = req.user.id;
        const spotReview = await Review.create({ id, userId, spotId, review, stars, createdAt, updatedAt });

        const safeReview = {
            id: spotReview.id,
            userId: userId,
            spotId: spotId,
            review: spotReview.review,
            stars: spotReview.stars,
            createdAt: spotReview.createdAt,
            updatedAt: spotReview.updatedAt
        };

        return res.json({ ...safeReview });
    }
);

//Get all bookings for a spot based on the spot's id
router.get(
    '/:spotId/bookings',
    async (req, res, next) => {

    }
);

//Create a booking from a spot based on spotId
router.post(
    '/:spotId/bookings',
    async (req, res, next) => {

    }
);






module.exports = router;
