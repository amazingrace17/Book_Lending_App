import express from 'express';
import userController from '../controllers/UserController.js';
import categoryRouter from './categoryRoute.js';
import bookRouter from './bookRoutes.js';
import favouriteRouter from './favouritesRoute.js'

const router = express.Router();

// USER ROUTES
router.post("/register", userController.signUp);
router.post("/login", userController.login)

router.use('/categories', categoryRouter)
router.use('/books', bookRouter)

router.use('/book/favourites', favouriteRouter)
export default router;