import { prisma } from "../configs/prisma.js";

export const addMovie = async (req, res) => {
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

 return res.status(201).json({status: "Success", data: addedMovie})

};

export const removeSingleMovie = async (req, res) => {
  const movieId = Number(req.params.id);

  const isExistedMovie = await prisma.movie.findUnique({
    where: {
     id: movieId,
    }
  })

  if (!isExistedMovie) {
    return res.status(404).json({error: "Movie not found"})
  }
  
  if (isExistedMovie.createdBy !== req.user.id) {
    return res.status(403).json({error: "User is not allowed to remove this movie"})
  }

  const removedMovie = await prisma.movie.delete({
    where: {
      id: movieId,
    }
  })

  if (!removedMovie) {
    return res.status(404).json({error: "Failed to remove the item"})
  }

  return res.status(201).json({status: "Success", message: "Movie removed successfully from the list"})

}

export const updateMovie = async (req, res) => {
  const movieId = Number(req.params.id);
  const { title, overview, releaseYear, genres, runtime, posterUrl } = req.body;

  
  const isExistedMovie = await prisma.movie.findUnique({
    where: {
     id: movieId,
    }
  })

  if (!isExistedMovie) {
    return res.status(404).json({error: "Movie not found"})
  }

  if (isExistedMovie.createdBy !== req.user.id) {
    return res.status(403).json({error: "Not allowed tu update this movie"})
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
    status: "Success",
    data: {
      movie: updatedMovie
    }
  })
  
}

export const getAllMovies = async (req, res) => {
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
    status: "Success",
    data: movies
  })
}