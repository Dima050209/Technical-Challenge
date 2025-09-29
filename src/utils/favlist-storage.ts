const FAVLIST_KEY = "favlist";

export function getFavlist(): number[] {
  const raw = localStorage.getItem(FAVLIST_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function addToFavlist(movieId: number) {
  const favlist = getFavlist();
  if (!favlist.includes(movieId)) {
    favlist.push(movieId);
    localStorage.setItem(FAVLIST_KEY, JSON.stringify(favlist));
  }
}

export function removeFromFavlist(movieId: number) {
  const favlist = getFavlist().filter((id) => id !== movieId);
  localStorage.setItem(FAVLIST_KEY, JSON.stringify(favlist));
}

export function isInFavlist(movieId: number): boolean {
  return getFavlist().includes(movieId);
}
