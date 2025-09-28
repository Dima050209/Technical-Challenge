import 'dotenv/config'
import fs from 'node:fs/promises'
import express from 'express'

const api_token = process.env.API_READ_ACCESS_TOKEN;

// Constants
const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 5173
const base = process.env.BASE || '/'

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile('./dist/client/index.html', 'utf-8')
  : ''

// Create http server
const app = express()

// Add Vite or respective production middlewares
/** @type {import('vite').ViteDevServer | undefined} */
let vite
if (!isProduction) {
  const { createServer } = await import('vite')
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base,
  })
  app.use(vite.middlewares)
} else {
  const compression = (await import('compression')).default
  const sirv = (await import('sirv')).default
  app.use(compression())
  app.use(base, sirv('./dist/client', { extensions: [] }))
}

// Create endpoints to fetch movies data on server, not exposing api key to client
app.get('/api/movies', async (req, res) => {
  try {
    const genreId = req.query.genre;

    let url = 'https://api.themoviedb.org/3/discover/movie';

    if (genreId) {
      url += `?with_genres=${genreId}`;
    }
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`,
        'accept': 'application/json',
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch from TMDB' });
    }
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/movie/:movieId', async (req, res) => {
  try {
    const { movieId } = req.params;

    if (!movieId) {
      return res.status(400).json({ error: 'Movie ID is required' });
    }

    const url = `https://api.themoviedb.org/3/movie/${movieId}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`,
        'accept': 'application/json',
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch from TMDB' });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/movie/:movieId/images', async (req, res) => {
  try {
    const { movieId } = req.params;

    if (!movieId) {
      return res.status(400).json({ error: 'Movie ID is required' });
    }

    const url = `https://api.themoviedb.org/3/movie/${movieId}/images`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`,
        accept: 'application/json',
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch images from TMDB' });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Serve HTML
app.use('*all', async (req, res) => {
  try {
    // Adding '/' to the beginning of the url for react-router to p rocess normally
    let url = req.originalUrl.replace(base, '');
    if (!url.startsWith('/')) url = '/' + url;

    /** @type {string} */
    let template
    /** @type {import('./src/entry-server.ts').render} */
    let render
    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile('./index.html', 'utf-8')
      template = await vite.transformIndexHtml(url, template)
      render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render
    } else {
      template = templateHtml
      render = (await import('./dist/server/entry-server.js')).render
    }

    const rendered = await render(url)

    const html = template
      .replace(`<!--app-head-->`, rendered.head ?? '')
      .replace(`<!--app-html-->`, rendered.html ?? '')

    res.status(200).set({ 'Content-Type': 'text/html' }).send(html)
  } catch (e) {
    vite?.ssrFixStacktrace(e)
    console.log(e.stack)
    res.status(500).end(e.stack)
  }
})

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
