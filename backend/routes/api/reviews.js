const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage } = require('../../db/models');

const router = express.Router();


//Get all reviews of current user
router.get(
    '/current',
    async (req, res, next) => {

    }
);

//Add image to review based on reviewId
router.post(
    '/:spotId/reviews',
    async (req, res, next) => {

    }
);

//Edit a review
router.put(
    '/:reviewId',
    async (req, res, next) => {

    }
);

//Delete a review
router.delete(
    '/:reviewId',
    async (req, res, next) => {

    }
);

module.exports = router;
