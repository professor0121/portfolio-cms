import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';
import { userAuthMiddleware } from '../middlewares/userAuth.middleware.js'

const router = Router();

router.post('/login', authController.loginUser);
router.post('/register', authController.registerUser);
router.post('/logout', userAuthMiddleware, authController.logoutUser);
router.post('/refresh',userAuthMiddleware, authController.refreshToken);
router.get('/profile', userAuthMiddleware, authController.getUserProfile);
router.patch('/update-user',userAuthMiddleware, authController.updateUserProfile);


export default router;  