// routes/api/register.js

const express = require('express');
const { body, validationResult } = require('express-validator');
const { register } = require('../../controllers/authController');
const router = express.Router();

router.post('/', 
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  register
);

module.exports = router;
