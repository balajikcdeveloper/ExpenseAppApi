const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const CategoryController = require('../controllers/categories');

router.get('/', checkAuth, CategoryController.categories_get_all);

router.post('/', checkAuth, CategoryController.categories_create_category);

router.get('/:categoryId', checkAuth, CategoryController.categories_get_category);

router.patch('/:categoryId', checkAuth, CategoryController.categories_update_category);

router.delete('/:categoryId', checkAuth, CategoryController.categories_delete_category);

module.exports = router;