import express from 'express';
import UserController from '../controllers/UserController';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const router = express.Router();

router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);

router.get('/profile', AuthMiddleware);

export default router;