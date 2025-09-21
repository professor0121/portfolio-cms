import { Router } from 'express';
import * as categoryController from '../controllers/category.controller.js';
import { userAuthMiddleware } from '../middlewares/userAuth.middleware.js';

const { createCategory, getAllCategories, getCategoryById, updateCategoryById, deleteCategoryById } = categoryController;
const router = Router();

router.post('/create',userAuthMiddleware, createCategory);
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.patch('/:id',userAuthMiddleware, updateCategoryById);
router.delete('/:id',userAuthMiddleware, deleteCategoryById);


export default router;