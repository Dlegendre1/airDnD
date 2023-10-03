const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, ReviewImage } = require('../../db/models');

const router = express.Router();


//Get all reviews of current user
router.get(
    '/current',
    async (req, res, next) => {
        const userId = req.user.id;
        const userReviews = await Review.findAll({ where: { userId: userId } });

        const reviews = userReviews.map(review => ({
            id: review.id,
            userId: review.userId,
            spotId: review.spotId,
            review: review.review,
            stars: review.stars,
            createdAt: review.createdAt,
            updatedAt: review.updatedAt,
            User: review.User,
            Spot: review.Spot,
            ReviewImages: review.ReviewImages
        }));
        res.json({ Reviews: reviews });
    }
);

//Add image to review based on reviewId
router.post(
    '/:reviewId/images',
    async (req, res, next) => {
        const reviewId = req.params.reviewId;
        const { url } = req.body;

        const reviewImage = await ReviewImage.create({ url });

        const safeReviewImage = {
            id: reviewId,
            url: reviewImage.url
        };

        return res.json({ ...safeReviewImage });
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
