import { prisma } from "../configs/prisma.js";

export const addToWatchlist = async (req, res) => {
  const { movieId, status, rating, notes } = req.body;
  
  const movie = await prisma.movie.findUnique({
    where: {id: movieId}
  })

  if (!movie) {
   return res.status(404).json({error: "Movie not found"})
  }

  // Check if already added
  const existingInWatchlist = await prisma.watchlistItem.findUnique({
    where: {
        userId_movieId: {
            userId: req.user.id,
            movieId: movieId
        }}
  })

  if(existingInWatchlist) {
    return  res.status(400).json({error: "Movie already in the watchlist"})
  }

  const watchlistItem = await prisma.watchlistItem.create({
    data: {
        userId: req.user.id,
        movieId,
        status: status || "PLANNED",
        rating,
        notes
    },
  })

 return res.status(201).json({status: "Success", data: watchlistItem})

};