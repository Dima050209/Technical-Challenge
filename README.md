# Movie Browser App

A web application to browse films by categories, view detailed information, and manage a wishlist.

---

## Starting project

To start it you need to create a .env file where you need to set your api token: API_READ_ACCESS_TOKEN='<your_token>'

---

## Tech Stack

- **Frontend Framework:** React  
- **Language:** TypeScript 
- **Styling:** SCSS
- **Bundler:** Vite  
- **SSR:** Server-Side Rendering supported  
- **Routing:** React Router 
- **Data Fetching:** Ordinary fetch
- **API:** Open movie API

---

## Features

### Homepage

- Displays **three carousels**, each representing a different movie category and a **favlist**
- Movies are fetched dynamically from the API.  
- Clicking on a movie navigates to the **Movie Details Page**.

### Movie Details Page

- Shows the movie **poster, description, release date, rating, and additional info**.  
- Includes an **“Add to Favlist” button**.  
- Page styling changes based on the **movie category**, e.g.:  
  - Different **font family** for each genre  
  - Different **button styles** and **bottom line** 
  - Optional additional visual differentiators

### Wishlist Section

- Displays all movies that have been added to the wishlist
- Wishlist is persisted locally (using `localStorage`)
- Supports removing movies from the wishlist

### Carousel

- Pretty much universal component, you can pass different kind of cards in here, just specify their width and gap between them
- You can also set number of visible elements



