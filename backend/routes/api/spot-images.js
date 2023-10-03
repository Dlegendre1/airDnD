const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImages, Bookings } = require('../../db/models');

const router = express.Router();

//Delete a spot image
router.delete(
    '/:imageId',
    async (req, res, next) => {

    }
);














module.exports = router;
