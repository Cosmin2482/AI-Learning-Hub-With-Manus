# AI Learning Hub - Setup Guide

## Quick Start

Follow these steps to get the AI Learning Hub running on your local machine:

### Prerequisites

- **Node.js** (version 18 or higher)
- **npm**, **pnpm**, or **yarn** package manager
- **Git** for version control

### Installation Steps

1. **Clone or Download the Repository**
   ```bash
   git clone https://github.com/yourusername/ai-learning-hub.git
   cd ai-learning-hub
   ```

2. **Install Dependencies**
   ```bash
   # Using npm
   npm install

   # Using pnpm (recommended)
   pnpm install

   # Using yarn
   yarn install
   ```

3. **Start Development Server**
   ```bash
   # Using npm
   npm run dev

   # Using pnpm
   pnpm dev

   # Using yarn
   yarn dev
   ```

4. **Open in Browser**
   Navigate to `http://localhost:5173` in your web browser

## Project Structure

```
ai-learning-hub/
├── public/                 # Static assets
├── src/
│   ├── components/
│   │   ├── ui/            # Reusable UI components
│   │   ├── Achievements.jsx
│   │   ├── Glossary.jsx
│   │   ├── InteractiveExercises.jsx
│   │   ├── LessonViewer.jsx
│   │   ├── ModuleViewer.jsx
│   │   └── SearchResults.jsx
│   ├── data/
│   │   └── learningContent.js
│   ├── App.jsx            # Main application component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
└── eslint.config.js       # ESLint configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Building for Production

1. **Create Production Build**
   ```bash
   npm run build
   ```

2. **Preview Production Build**
   ```bash
   npm run preview
   ```

The production files will be generated in the `dist/` directory.

## Deployment Options

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect it's a Vite project
3. Deploy with default settings

### Netlify
1. Run `npm run build`
2. Drag and drop the `dist` folder to Netlify
3. Or connect your GitHub repository for automatic deployments

### GitHub Pages
1. Install `gh-pages` package: `npm install --save-dev gh-pages`
2. Add to package.json scripts: `"deploy": "gh-pages -d dist"`
3. Run `npm run build && npm run deploy`

### Custom Server
Upload the contents of the `dist` folder to any static hosting service.

## Customization

### Adding New Content
Edit `src/data/learningContent.js` to add new modules, lessons, or glossary terms.

### Styling Changes
- Global styles: `src/index.css`
- Component styles: Use Tailwind CSS classes
- Custom components: `src/components/ui/`

### Adding New Features
1. Create new components in `src/components/`
2. Import and use in `src/App.jsx`
3. Update routing if needed

## Troubleshooting

### Common Issues

**Port 5173 already in use:**
```bash
# Kill the process using the port
npx kill-port 5173
# Or use a different port
npm run dev -- --port 3000
```

**Module not found errors:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Build errors:**
```bash
# Check for TypeScript/ESLint errors
npm run lint
# Fix any issues and rebuild
npm run build
```

### Performance Optimization

For better performance in production:

1. **Enable compression** on your server
2. **Use a CDN** for static assets
3. **Enable caching** headers
4. **Monitor bundle size** with `npm run build`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

If you encounter any issues:

1. Check this setup guide
2. Review the main README.md
3. Check existing GitHub issues
4. Create a new issue with detailed information

---

**Happy Learning!** 🚀
