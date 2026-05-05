import { prisma } from "../configs/prisma.js";

export const addMovie = async (req, res) => {
  try {
    const { title, overview, releaseYear, genres, runtime, posterUrl } = req.body;
    const userId = Number(req.user.id);
  
    const addedMovie = await prisma.movie.create({
      data: {
          title,
          overview,
          releaseYear,
          genres,
          runtime,
          posterUrl,
          createdBy: userId
      },
    })
  
   return res.status(201).json({ success: true, message: "Movie added successfully", data: addedMovie})
 
  } catch (error) {
      console.error("Add movie error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to add movie",
      });
  }
};

export const removeSingleMovie = async (req, res) => {
  try {
    const movieId = Number(req.params.id);
  
    const isExistedMovie = await prisma.movie.findUnique({
      where: {
       id: movieId,
      }
    })
  
    if (!isExistedMovie) {
      return res.status(404).json({ success: false, message: "Movie not found"})
    }
    
    if (isExistedMovie.createdBy !== req.user.id) {
      return res.status(403).json({ success: false, message: "User is not allowed to remove this movie"})
    }
  
    const removedMovie = await prisma.movie.delete({
      where: {
        id: movieId,
      }
    })
  
    if (!removedMovie) {
      return res.status(404).json({ success: false, message: "Failed to remove the item"})
    }
  
    return res.status(201).json({ success: true, message: "Movie removed successfully from the list"})
  } catch (error) {
      console.error("Remove single movie error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to remove movie",
      });
  }

}

export const updateMovie = async (req, res) => {
  try {
    const movieId = Number(req.params.id);
    const { title, overview, releaseYear, genres, runtime, posterUrl } = req.body;
    
    
    const isExistedMovie = await prisma.movie.findUnique({
      where: {
       id: movieId,
      }
    })
    
    if (!isExistedMovie) {
      return res.status(404).json({ success: false, message: "Movie not found"})
    }
    
    if (isExistedMovie.createdBy !== req.user.id) {
      return res.status(403).json({ success: false, message: "Not allowed tu update this movie"})
    }
     
    const updatedMovie = await prisma.movie.update({
      where: {
        id: movieId
      },
      data: {
        title,
        overview,
        releaseYear,
        genres,
        runtime,
        posterUrl,
        createdBy: req.user.id
      }
    })
    
    return res.status(200).json({
      success: true,
      message: "movie updated successfully",
      data: {
        movie: updatedMovie
      }
    })
  } catch (error) {
      console.error("Update movie error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to update movie",
      });
  }
}

export const getAllMovies = async (req, res) => {
  try {
    const movies = await prisma.movie.findMany({
      include: {
        creator: {
          select: {
              id: true,
              name: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    })
  
    return res.status(200).json({
      success: true,
      message: "Got all movies successfully",
      data: movies
    })
  } catch (error) {
      console.error("Get all movies error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to get all movies",
      });
  }
}