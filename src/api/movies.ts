const baseUrl =
  typeof window === "undefined"
    ? "http://localhost:5173"
    : "";

export async function getMoviesByGenre(genreId: number | string) {
  const res = await fetch(`/api/movies?genre=${genreId}`);
  if (!res.ok) throw new Error(`Failed to fetch movies: ${res.status}`);
  
  const data = await res.json();
  return data;
}


