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

export const removeFromWatchlist = async (req, res) => {
  const itemId = Number(req.params.id);

  const watchListItem = await prisma.watchlistItem.findUnique({
    where: {
     id: itemId,
    }
  })

  if (!watchListItem) {
    return res.status(404).json({error: "Watchlist Item not found"})
  }
  
  if (watchListItem.userId !== req.user.id) {
    return res.status(403).json({error: "User is not allowed to remove this item"})
  }

  const removedWatchListItem = await prisma.watchlistItem.delete({
    where: {
      id: itemId,
    }
  })

  if (!removedWatchListItem) {
    return res.status(404).json({error: "Failed to remove the item"})
  }

  return res.status(201).json({status: "Success", message: "Item removed successfully from watchlist"})

}

export const updateWatchListitem = async (req, res) => {
  const itemId = Number(req.params.id);
  const { status, rating, notes } = req.body;
  
  const watchListItem = await prisma.watchlistItem.findUnique({
    where: {
     id: itemId,
    }
  })

  if (!watchListItem) {
    return res.status(404).json({error: "Watchlist Item not found"})
  }

  if (watchListItem.userId !== req.user.id) {
    return res.status(403).json({error: "Not allowed tu update this item from watchlist"})
  }
   
  const updatedItem = await prisma.watchlistItem.update({
    where: {
      id: itemId
    },
    data: {
      status,
      rating,
      notes
    }
  })

  return res.status(200).json({
    status: "Success",
    data: {
      watchListItem: updatedItem
    }
  })
  
}

export const getMyWatchlist = async (req, res) => {
  const id = req.user.id;
  const myWatchlistItems = await prisma.watchlistItem.findMany({
    where: {
      userId: id
    },
    include: {
      movie: true,
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  return res.status(200).json({
    status: "Success",
    data: myWatchlistItems
  })
}