import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';

const router = Router();

router.post('/login',authController.loginUser);
router.post('/register',authController.registerUser);
router.post('/logout',authController.logoutUser);
router.post('/refresh',authController.refreshToken);
router.get('/profile',authController.getUserProfile);
router.patch('/updateUser',authController.updateUserProfile);


export default router;