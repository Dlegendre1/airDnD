const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, ReviewImage } = require('../../db/models');

const router = express.Router();

//Delete a review image
router.delete(
    '/:imageId',
    requireAuth,
    async (req, res, next) => {
        const userId = req.user.id;
        const imageId = req.params.imageId;
        const image = await ReviewImage.findByPk(imageId);
        if (!image) {
            return res.status(404).json({ "message": "Review Image couldn't be found" });
        };
        const review = await Review.findByPk(image.reviewId);
        if (userId !== review.userId) {
            return res.status(403).json({ "message": "Forbidden" });
        }

        await image.destroy();
        return res.status(200).json({ "message": "Successfully deleted" });
    }
);















module.exports = router;
