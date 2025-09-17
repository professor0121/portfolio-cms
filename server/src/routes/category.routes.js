import {Router} from 'express';
import * as categoryController from '../controllers/category.controller.js';
import router from './auth.routes.js';

const { createCategory, getAllCategories, getCategoryById, updateCategoryById, deleteCategoryById, getCategoriesWithPostCount, getCategoriesByPopularity, getCategoriesByPagination, searchCategories, getCategoryHierarchy, assignPostToCategory, removePostFromCategory, getPostsByCategoryId } = categoryController;
const categoryRouter = Router();

router.post('/create', createCategory);
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.patch('/:id', updateCategoryById);
router.delete('/:id', deleteCategoryById);
router.get('/withPostCount', getCategoriesWithPostCount);
router.get('/byPopularity', getCategoriesByPopularity);
router.get('/pagination', getCategoriesByPagination);
router.get('/search', searchCategories);
router.get('/hierarchy', getCategoryHierarchy);
router.post('/:id/assignPost', assignPostToCategory);
router.post('/:id/removePost', removePostFromCategory);
router.get('/:id/posts', getPostsByCategoryId);

export default categoryRouter;