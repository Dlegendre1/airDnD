const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const validateSignup = [
    // check('email')
    //     .exists({ checkFalsy: true })
    //     .isEmail()
    //     .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

// Sign up
router.post(
    '/',
    validateSignup,
    async (req, res, next) => {
        const { email, password, username, firstName, lastName } = req.body;
        const hashedPassword = bcrypt.hashSync(password);

        const otherUserEmail = await User.findOne({ where: { email } });
        const otherUsername = await User.findOne({ where: { username } });

        if (otherUsername) {
            const err = new Error('User already exists');
            err.status = 500;
            err.title = 'User already exists';
            err.errors = { "email": 'User with that email already exists' };
            return next(err);
        }

        if (otherUserEmail) {
            const err = new Error('User already exists');
            err.status = 500;
            err.title = 'User already exists';
            err.errors = { "username": 'User with that username already exists' };
            return next(err);
        }


        const user = await User.create({ email, username, hashedPassword, firstName, lastName });

        const safeUser = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username,
        };

        await setTokenCookie(res, safeUser);

        return res.json({
            user: safeUser
        });
    }
);


module.exports = router;
