const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage } = require('../../db/models');

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
        const { address, city, state, country, lat, lng, name, description, price } = req.body;
        const ownerId = req.user.id;
        const spot = await Spot.create({ ownerId, address, city, state, country, lat, lng, name, description, price });

        const safeSpot = {
            ownerId: ownerId,
            address: spot.address,
            city: spot.city,
            state: spot.state,
            country: spot.country,
            lat: spot.lat,
            lng: spot.lng,
            name: spot.name,
            description: spot.description,
            price: spot.price
        };
        await setTokenCookie(res, req.user);
        return res.json({
            spot: safeSpot
        });
    }
);

// //Add image to spot based on spot id
// router.post(
//     '/:spotId/images', requireAuth,
//     async (req, res, next) => {
//         const { url, preview } = req.body;
//         const spotImage = await SpotImage.create({ url, preview });
//         //STILL HAVE WORK TO DO

//     }
// );





module.exports = router;
