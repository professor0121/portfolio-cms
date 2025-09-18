import {Router} from 'express';
import * as categoryController from '../controllers/category.controller.js';
import router from './auth.routes.js';

const { createCategory, getAllCategories, getCategoryById, updateCategoryById, deleteCategoryById} = categoryController;
const categoryRouter = Router();

router.post('/create', createCategory);
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.patch('/:id', updateCategoryById);
router.delete('/:id', deleteCategoryById);
;

export default categoryRouter;