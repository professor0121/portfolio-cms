import { Router } from 'express';
import * as categoryController from '../controllers/category.controller.js';

const { createCategory, getAllCategories, getCategoryById, updateCategoryById, deleteCategoryById } = categoryController;
const router = Router();

router.post('/create', createCategory);
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.patch('/:id', updateCategoryById);
router.delete('/:id', deleteCategoryById);


export default router;