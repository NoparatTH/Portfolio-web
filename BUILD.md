# Build Instructions for Portfolio

## Prerequisites
- Node.js installed (download from https://nodejs.org/)

## Setup
```bash
npm install
```

## Minify CSS & JS for Production
```bash
npm run build:all
```

This will create:
- `dist/style.min.css` 
- `dist/script.min.js`

## Individual Commands
```bash
npm run minify:css   # Minify CSS only
npm run minify:js    # Minify JS only
```

## Using Minified Files
Update your HTML files to use minified versions:
```html
<link rel="stylesheet" href="dist/style.min.css">
<script src="dist/script.min.js"></script>
```

---

## Alternative: Online Tools (No Node.js Required)
1. **CSS**: https://cssminifier.com/
2. **JS**: https://javascript-minifier.com/

Copy-paste your code, download the minified version.
