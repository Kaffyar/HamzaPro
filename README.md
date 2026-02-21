# Hamzah Alkaff Portfolio

Cybersecurity-focused personal portfolio built with Vite, React, TypeScript-style components, Tailwind CSS v4, and Motion.

## Tech Stack

- Vite
- React
- Tailwind CSS v4
- Motion (`motion/react`)
- Lucide Icons

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start development server:
   ```bash
   npm run dev
   ```
3. Create a production build:
   ```bash
   npm run build
   ```
4. Preview production build locally:
   ```bash
   npm run preview
   ```

## Project Structure

- `src/main.tsx`: app entry point
- `src/app/App.tsx`: page composition
- `src/app/components/`: portfolio sections and effects
- `src/styles/`: theme, fonts, and global styles

## Deployment

This project deploys as a static site from the `dist/` folder after running:

```bash
npm run build
```

Compatible platforms include Vercel, Netlify, and GitHub Pages (via Actions).
