export async function getMoviesByGenre(genreId: number | string) {
  const res = await fetch(`/api/movies?genre=${genreId}`);
  if (!res.ok) throw new Error(`Failed to fetch movies: ${res.status}`);
  
  const data = await res.json();
  return data;
}

export async function getMovieById(movieId: number) {
  const res = await fetch(`/api/movie/${movieId}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch movie ${movieId}: ${res.status}`);
  }

  const data = await res.json();
  return data;
}

export async function getMovieImages(movieId: number) {
  const res = await fetch(`/api/movie/${movieId}/images`);
  if (!res.ok) {
    throw new Error(`Failed to fetch images for movie ${movieId}: ${res.status}`);
  }

  const data = await res.json();
  return data;
}


