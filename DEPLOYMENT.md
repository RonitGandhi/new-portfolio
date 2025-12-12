# Netlify Deployment Guide

This guide will help you deploy your portfolio website to Netlify.

## Prerequisites

- A Netlify account (sign up at [netlify.com](https://www.netlify.com))
- Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Option 1: Deploy via Netlify Dashboard (Recommended)

### Step 1: Push to GitHub
1. Initialize git repository (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Create a new repository on GitHub and push:
   ```bash
   git remote add origin <your-github-repo-url>
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy on Netlify
1. Go to [app.netlify.com](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect to your Git provider (GitHub/GitLab/Bitbucket)
4. Select your repository
5. Netlify will auto-detect the build settings from `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Click **"Deploy site"**

### Step 3: Configure Environment (if needed)
- Go to **Site settings** → **Build & deploy** → **Environment**
- Add any environment variables if needed

## Option 2: Deploy via Netlify CLI

### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

### Step 2: Login to Netlify
```bash
netlify login
```

### Step 3: Deploy
```bash
# Build the project first
npm run build

# Deploy to Netlify
netlify deploy --prod
```

Or for a draft deployment:
```bash
netlify deploy
```

## Option 3: Drag & Drop Deployment

1. Build your project locally:
   ```bash
   npm run build
   ```

2. Go to [app.netlify.com/drop](https://app.netlify.com/drop)

3. Drag and drop the `dist` folder onto the page

4. Your site will be live in seconds!

## Post-Deployment

### Custom Domain
1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Follow the instructions to configure DNS

### Environment Variables
If you need to add environment variables:
1. Go to **Site settings** → **Environment variables**
2. Add your variables (e.g., Formspree endpoint)

### Continuous Deployment
Netlify automatically deploys when you push to your main branch. You can configure this in:
- **Site settings** → **Build & deploy** → **Continuous Deployment**

## Troubleshooting

### Build Fails
- Check the build logs in Netlify dashboard
- Ensure Node version is 18+ (configured in `netlify.toml`)
- Verify all dependencies are in `package.json`

### Assets Not Loading
- Ensure assets are in `client/public/assets/` directory
- Check that paths use `/assets/` (not `./assets/`)

### 404 Errors on Routes
- The `netlify.toml` includes redirect rules for SPA routing
- If issues persist, check the redirect configuration

## Build Configuration

The project uses:
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Node version:** 18 (configured in `netlify.toml`)

All configuration is in `netlify.toml` file.

