const express = require('express');

const blogController = require('../controllers/blog');

const router = express.Router();

router.get('/', blogController.getPosts);

module.exports = router;