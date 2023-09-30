const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot } = require('../../db/models');

const router = express.Router();


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

        return res.json({
            spot: safeSpot
        });
    }
);







module.exports = router;
