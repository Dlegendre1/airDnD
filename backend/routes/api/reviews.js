const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, ReviewImage } = require('../../db/models');

const router = express.Router();

const validateBooking = [
    check('review')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .custom((value) => {
            if (value < 1 || value > 5) {
                return false;
            }
            return true;
        })
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
];
//Get all reviews of current user
router.get(
    '/current',
    requireAuth,
    async (req, res, next) => {
        const userId = req.user.id;
        const userReviews = await Review.findAll({
            where: { userId: userId },
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']

                },
                {
                    model: Spot,
                    attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price', 'previewImage']
                },
                {
                    model: ReviewImage,
                    attributes: ['id', 'url']
                }]

        });


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
    requireAuth,
    async (req, res, next) => {
        await setTokenCookie(res, req.user);
        const userId = req.user.id;
        const reviewId = req.params.reviewId;
        const { url } = req.body;
        const review = await Review.findOne({
            where: { id: reviewId },
            include: [ReviewImage]
        });
        if (!review) {
            return res.status(404).json({ "message": "Review couldn't be found" });
        }
        if (userId !== review.userId) {
            return res.status(403).json({ "message": "Forbidden" });
        }
        if (review.ReviewImages.length > 9) {
            return res.status(403).json({ "message": "Maximum number of images for this resource was reached" });
        }

        const reviewImage = await ReviewImage.create({ url });

        await reviewImage.setReview(review);

        const safeReviewImage = {
            id: reviewImage.id,
            url: reviewImage.url
        };

        return res.json({ ...safeReviewImage });
    }
);

//Edit a review
router.put(
    '/:reviewId',
    requireAuth,
    validateBooking,
    async (req, res, next) => {
        const userId = req.user.id;
        const reviewId = req.params.reviewId;
        const { review, stars } = req.body;

        const existingReview = await Review.findByPk(reviewId);
        if (!existingReview) {
            return res.status(404).json({ "message": "Review couldn't be found" });
        }
        if (existingReview.userId === userId) {
            const safeReview = {
                review: review,
                stars: stars
            };
            await existingReview.update(safeReview);
            return res.json({ id: existingReview.id, userId: existingReview.userId, spotId: existingReview.spotId, ...safeReview, createdAt: existingReview.createdAt, updatedAt: existingReview.updatedAt });
        } else {
            return res.json({ "message": "Forbidden" });
        }
    }
);

//Delete a review
router.delete(
    '/:reviewId',
    requireAuth,
    async (req, res, next) => {
        const userId = req.user.id;
        const reviewId = req.params.reviewId;

        const review = await Review.findByPk(reviewId);
        if (!review) {
            return res.status(404).json({ "message": "Review couldn't be found" });
        }
        if (userId !== review.userId) {
            return res.status(403).json({ "message": "Forbidden" });
        }
        await review.destroy();
        return res.json({ "message": "Successfully deleted" });
    }
);

module.exports = router;
