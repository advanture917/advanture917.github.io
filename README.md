# GitHub Pages Blog Assets

This directory contains all the static assets for your GitHub Pages blog.

## Directory Structure

```
assets/
├── css/
│   └── main.css          # Main stylesheet
├── js/
│   └── main.js           # JavaScript functionality
└── images/
    └── README.md         # Image guidelines
```

## CSS Structure

The `main.css` file includes:

- **CSS Variables**: Centralized color scheme
- **Responsive Design**: Mobile-first approach
- **Typography**: Clean, readable fonts
- **Components**: Styled blog components
- **Animations**: Smooth transitions and effects

## JavaScript Features

The `main.js` file provides:

- **Theme Management**: Light/dark mode support
- **Navigation**: Mobile menu and smooth scrolling
- **Search**: Client-side post search
- **Code Enhancement**: Copy buttons for code blocks
- **Scroll Features**: Back-to-top button and reading progress
- **Lazy Loading**: Performance optimization for images
- **Animations**: Fade-in effects and smooth interactions

## Customization

### Colors

Edit the CSS variables in `main.css`:

```css
:root {
  --primary-color: #2c3e50;    /* Main brand color */
  --secondary-color: #3498db;  /* Accent color */
  --text-color: #2c3e50;       /* Text color */
  --bg-color: #ffffff;         /* Background color */
}
```

### Fonts

Update the font family in the body selector:

```css
body {
  font-family: 'Your Font', 'Segoe UI', sans-serif;
}
```

### Layout

- Modify `.wrapper` max-width for different content widths
- Adjust breakpoints in media queries for responsive design
- Customize component spacing and sizing

## Performance

- CSS is optimized for minimal file size
- JavaScript uses modern features with fallbacks
- Images should be optimized before uploading
- Consider using a CDN for better global performance

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Graceful degradation for older browsers
- Mobile-first responsive design
- Progressive enhancement for JavaScript features