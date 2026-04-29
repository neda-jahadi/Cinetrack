import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { addMovie, getAllMovies, removeSingleMovie, updateMovie } from '../controllers/movieController.js';
import { addMovieSchema } from '../validators/addMovieValidators.js';


const router = express.Router();

router.get("/", getAllMovies);
router.post("/",authMiddleware, validateRequest(addMovieSchema), addMovie);
router.delete("/:id",authMiddleware, removeSingleMovie);
router.put("/:id",authMiddleware, validateRequest(addMovieSchema), updateMovie);

export default router;