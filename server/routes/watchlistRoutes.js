import express from 'express';
import { addToWatchlist, getMyWatchlist, removeFromWatchlist, updateWatchListitem } from '../controllers/watchlistController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { addToWatchlistSchema, updateWatchlistSchema } from '../validators/watchlistValidators.js';

const router = express.Router();
router.use(authMiddleware);

router.get("/", authMiddleware, getMyWatchlist);
router.post("/", authMiddleware, validateRequest(addToWatchlistSchema), addToWatchlist);
router.delete("/:id", authMiddleware, removeFromWatchlist);
router.put("/:id", authMiddleware, validateRequest(updateWatchlistSchema), updateWatchListitem);

export default router;