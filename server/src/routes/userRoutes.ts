import { Router } from 'express';

import { getUser, getMe, getUsers } from '../controllers/userController';
import { protect, signup, login, logout } from '../controllers/authController';

const router = Router();

router.post('/signup', signup);
router.post('/signin', login);

router.use(protect);
router.get('/', getUsers);
router.get('/me', getMe, getUser);
router.get('/logout', logout);

export default router;
