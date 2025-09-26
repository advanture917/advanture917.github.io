# My GitHub Pages Blog

A modern, responsive blog built with Jekyll and hosted on GitHub Pages.

## Features

- 📱 **Responsive Design** - Works perfectly on all devices
- 🎨 **Modern UI** - Clean and professional appearance
- 📝 **Markdown Support** - Write posts in Markdown
- 🔍 **Search Functionality** - Find content easily
- 🌙 **Theme Support** - Light and dark modes
- ⚡ **Fast Loading** - Optimized for performance
- 📊 **SEO Optimized** - Built-in SEO best practices

## Quick Start

### Prerequisites

- Ruby 2.7 or higher
- Bundler gem
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/your-blog-repo.git
   cd your-blog-repo
   ```

2. **Install dependencies**
   ```bash
   bundle install
   ```

3. **Run locally**
   ```bash
   bundle exec jekyll serve
   ```

4. **Open your browser**
   Navigate to `http://localhost:4000`

### Writing Posts

Create new posts in the `_posts` directory with the filename format:
```
YYYY-MM-DD-title-of-post.markdown
```

Example post structure:
```markdown
---
layout: post
title: "Your Post Title"
date: 2024-01-15 10:00:00 +0000
categories: [category1, category2]
tags: [tag1, tag2, tag3]
author: Your Name
---

Your post content here...
```

## Customization

### Site Configuration

Edit `_config.yml` to customize:
- Site title and description
- Author information
- Social media links
- Build settings

### Styling

- **Colors**: Modify CSS variables in `assets/css/main.css`
- **Fonts**: Update font families in the CSS file
- **Layout**: Adjust layouts in the `_layouts` directory

### Adding Pages

Create new pages by adding files in the root directory:
```markdown
---
layout: page
title: Your Page Title
permalink: /your-page/
---

Page content here...
```

## Deployment

### GitHub Pages

1. **Enable GitHub Pages**
   - Go to repository Settings
   - Scroll to Pages section
   - Select source branch (usually `main`)

2. **Custom Domain** (optional)
   - Add `CNAME` file with your domain
   - Configure DNS settings

### Manual Deployment

```bash
# Build the site
bundle exec jekyll build

# Deploy _site directory to your hosting
```

## Directory Structure

```
├── _config.yml           # Jekyll configuration
├── _layouts/              # Page layouts
│   ├── default.html
│   ├── page.html
│   └── post.html
├── _includes/             # Reusable components
│   ├── head.html
│   ├── header.html
│   ├── footer.html
│   └── social.html
├── _posts/                # Blog posts
│   ├── 2024-01-15-welcome.markdown
│   └── ...
├── assets/                # Static assets
│   ├── css/
│   ├── js/
│   └── images/
├── about.markdown         # About page
├── index.html            # Homepage
├── Gemfile               # Ruby dependencies
└── README.md             # This file
```

## Advanced Features

### Search

The blog includes client-side search functionality. To enable:
1. Add search input to your layout
2. Include the search JavaScript
3. Customize search results styling

### Analytics

Add Google Analytics by including your tracking ID in `_config.yml`:
```yaml
google_analytics: UA-XXXXXXXX-X
```

### Comments

Enable Disqus comments by adding to `_config.yml`:
```yaml
disqus:
  shortname: your-disqus-shortname
```

### Social Sharing

Social sharing buttons can be added to post layouts using the included social media links.

## Performance Optimization

- **Image Optimization**: Compress images before uploading
- **Lazy Loading**: Implemented for images
- **Minification**: CSS and JS are optimized
- **Caching**: Leverages browser and CDN caching

## SEO Features

- Structured data markup
- Open Graph tags
- Twitter Card support
- Sitemap generation
- RSS feed

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

- 📚 [Jekyll Documentation](https://jekyllrb.com/docs/)
- 🌐 [GitHub Pages Documentation](https://docs.github.com/en/pages)
- 💬 [GitHub Issues](https://github.com/yourusername/your-blog-repo/issues)

## Acknowledgments

- Built with [Jekyll](https://jekyllrb.com/)
- Hosted on [GitHub Pages](https://pages.github.com/)
- Inspired by modern web design principles

---

**Happy blogging!** 🎉