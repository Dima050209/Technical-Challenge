# Movie Browser App

A web application to browse films by categories, view detailed information, and manage a wishlist.

---

## Setup

To start the project, follow these steps:

1) **Clone the project** to your computer:

```bash
git clone https://github.com/Dima050209/Technical-Challenge.git
```
2) **Open the project in VS Code or any other editor**
(for VS Code)
```bash
cd Technical-Challenge
```
```bash
code .
```
3) **Create a .env file** at the root folder of the project where you need to set your api token: 
```bash
API_READ_ACCESS_TOKEN='<your_token>'
```
4) run 
```bash 
npm install
```
5) run 
```bash 
npm run dev
```
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



