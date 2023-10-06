const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Bookings } = require('../../db/models');

const router = express.Router();

//Delete a spot image
router.delete(
    '/:imageId',
    async (req, res, next) => {
        const userId = req.user.id;
        const imageId = req.params.imageId;

        const image = await SpotImage.findByPk(imageId);
        if (!image) {
            return res.status(404).json({ "message": "Spot Image couldn't be found" });
        }
        if (userId !== image.userId) {
            res.status(403).json({ "message": "Forbidden" });
        }

        await image.destroy();
        return res.json({ "message": "Successfully deleted" });
    }
);














module.exports = router;
