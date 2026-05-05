import { prisma } from "../configs/prisma.js";

export const addToWatchlist = async (req, res) => {
  try {
    const { movieId, status, rating, notes } = req.body;
  
      const movie = await prisma.movie.findUnique({
        where: {id: movieId}
      })

      if (!movie) {
      return res.status(404).json({ success: false, message: "Movie not found"})
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
        return  res.status(409).json({ success: false, message: "Movie already in the watchlist"})
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

      return res.status(201).json({success: true, message: "Watch list item created for the movie", data: watchlistItem})
  } catch (error) {
    console.error("Add to watchlist error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to add to watchlist",
    });
  }
};

export const removeFromWatchlist = async (req, res) => {
  try {
    const itemId = Number(req.params.id);

    const watchListItem = await prisma.watchlistItem.findUnique({
      where: {
      id: itemId,
      }
    })

    if (!watchListItem) {
      return res.status(404).json({ success: false, message: "Watchlist Item not found"})
    }
    
    if (watchListItem.userId !== req.user.id) {
      return res.status(403).json({ success: false, message: "User is not allowed to remove this item"})
    }

    const removedWatchListItem = await prisma.watchlistItem.delete({
      where: {
        id: itemId,
      }
    })

    if (!removedWatchListItem) {
      return res.status(404).json({ success: false, message: "Failed to remove the item"})
    }

    return res.status(201).json({success: true, message: "Item removed successfully from watchlist"})

  } catch (error) {
    console.error("Remove from watchlist:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to remove from watchlist",
    });
  }

}

export const updateWatchListitem = async (req, res) => {
  try {
    const itemId = Number(req.params.id);
    const { status, rating, notes } = req.body;
    
    const watchListItem = await prisma.watchlistItem.findUnique({
      where: {
       id: itemId,
      }
    })
  
    if (!watchListItem) {
      return res.status(404).json({ success: false, message: "Watchlist Item not found"})
    }
  
    if (watchListItem.userId !== req.user.id) {
      return res.status(403).json({ success: false, message: "Not allowed to update this item from watchlist"})
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
      success: true,
      message: "Watchlist item updated successfully",
      data: {
        watchListItem: updatedItem
      }
    })
  } catch (error) {
    console.error("Update watchlist item:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update watchlist item",
    });
  }

  
}

export const getMyWatchlist = async (req, res) => {
  try {
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
      success: true,
      message: "Got watch list successfully",
      data: myWatchlistItems
    })
  } catch (error) {
    console.error("Get whole watchlist:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to get watchlist",
    });
  }
}