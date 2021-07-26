import express from 'express';
import userController from '../controllers/UserController.js';

import shelfRouter from './shelfRoutes.js';

import categoryRouter from './categoryRoute.js';
import bookRouter from './bookRoutes.js';

const router = express.Router();

// USER ROUTES
router.post("/register", userController.signUp);
router.post("/admin/register", userController.signUpAdmin);
router.post("/login", userController.login);

router.use('/shelf', shelfRouter)
router.use('/categories', categoryRouter)
router.use('/books', bookRouter)

export default router;