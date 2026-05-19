# Portfolio Website

A simple static portfolio website for video work and writing.

## What is included

- `index.html` — homepage with sections for videos, writing, and about
- `styles.css` — responsive styling for layout and cards
- `script.js` — data-driven portfolio items for easy updates
- `assets/videos/` — place your local MP4 or MOV files here

## How to use

1. Add your video files to `assets/videos/` or use hosted embeds.
2. Edit `script.js`:
   - Add video items to `videoItems`
   - Add writing items to `writingItems`
3. Open `index.html` in your browser.

## Recommended workflow

- For local files, use `type: 'file'` and set `src` to `assets/videos/your-video.mp4`
- For hosted videos, use `type: 'embed'` and add a YouTube or Vimeo embed URL
- For writing, use the `link` field to point at full articles, documents, or other pages

## Next steps

- Add a custom logo or brand colors in `styles.css`
- Replace sample placeholders with your real content
- Host it on GitHub Pages, Netlify, or Vercel by publishing the folder
