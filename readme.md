# OpenAtlas Website

The official website for the [OpenAtlas](https://openatlas.eu) project.

[OpenAtlas](https://openatlas.eu) is an open-source, web-based database system for complex archaeological, historical, and geospatial data.

This repository contains the source code for the **OpenAtlas project website**. The website itself is relatively lightweight and is primarily used to present information about the OpenAtlas project.

## Technology Stack

The website is built with:

- **[Nuxt 4](https://nuxt.com/)** – application framework
- **[Nuxt Content](https://content.nuxt.com/)** – content management and Markdown-based content
- **[Nuxt Studio](https://content.nuxt.com/docs/studio)** – visual content editing interface
- **TypeScript**
- **Vue**

Nuxt Content provides the content layer and allows website content to be maintained as files in the repository. Nuxt Studio provides a visual editing interface on top of Nuxt Content.

---

## Requirements

Before getting started, make sure you have:

- [Node.js](https://nodejs.org/) installed
- [pnpm](https://www.npmjs.com/) installed
- Access to this repository

Check your installed versions:

```bash
node --version
pnpm --version
```

---

## Installation

Copy the environment variables:

```bash
cp .env.local.example .env.local
```

Install the dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm run dev
```

The website should now be available at:

```text
http://localhost:3000
```

---

## Nuxt Content

Website content is managed using **Nuxt Content**.

Content is stored in the `content/` directory and can be written using Markdown and other supported content formats. Nuxt Content v3 also supports structured **Content Collections**, which can be configured in `content.config.ts`.

A typical project structure looks like:

```text
.
├── assets/
├── components/
├── content/
│   ├── index.md
│   └── ...
├── pages/
├── public/
├── app.vue
├── content.config.ts
├── nuxt.config.ts
├── package.json
└── .env.local
```

When changing website content, prefer editing the files in `content/` rather than hard-coding text directly into Vue components.

For more information, see the [Nuxt Content documentation](https://content.nuxt.com/docs/getting-started).

---

# Nuxt Studio

## What is Nuxt Studio?

**Nuxt Studio** is the visual editing interface for the website's Nuxt Content data.

It allows content editors to edit website content without having to work directly with Markdown files or a code editor.

The current version of Nuxt Studio is a free, open-source, self-hosted Nuxt module. It supports visual Markdown editing, frontmatter/form editing, media management, live preview, authentication, and Git integration.

The basic workflow is:

```text
Nuxt Studio
     │
     ▼
Edit content
     │
     ▼
Preview changes
     │
     ▼
Publish
     │
     ▼
Git repository
     │
     ▼
CI/CD
     │
     ▼
Website deployment
```

When changes are published from production Studio, Studio commits the changes to the configured Git repository. The deployment system then builds and deploys the updated website.

---

## Using Nuxt Studio Locally

To use Nuxt Studio during local development, make sure the dev option is enabled in `nuxt.config.ts`:

```bash
export default defineNuxtConfig({
studio: {
dev: true
})
```

Start the application:

```bash
pnpm run dev
```

Open:

```text
http://localhost:3000
```

Nuxt Studio should provide an editing button in the application.

You can use it to:

- Edit Markdown content
- Edit frontmatter
- Preview changes
- Create or modify content files
- Work with supported media files

Changes made locally are written to the local project files.

---

## Using Nuxt Studio in Production

The production Studio interface is normally available at:

```text
https://your-domain.example/admin
```

The default Studio route is `/admin`, although it can be changed in `nuxt.config.ts`.

Production Studio requires:

1. A server-side Nuxt deployment
2. A configured Git repository
3. An OAuth provider
4. The appropriate environment variables

Studio supports GitHub, GitLab, and Google authentication. GitHub and GitLab can also be used directly for Git operations.

## Publishing Content with Studio

When editing content in production:

1. Open `/admin`
2. Authenticate using the configured provider
3. Select the content you want to edit
4. Make your changes
5. Preview the changes
6. Publish the changes

When publishing, Studio commits the changes to the configured Git repository.

The normal deployment pipeline then builds the website and deploys the new version.

There can be a short delay between publishing and seeing the changes on the live website because the Git commit needs to go through the deployment process.

### Important

Studio is not a separate hosted CMS containing a second copy of the website content.

The Git repository remains the source of truth.

```text
Git repository
      │
      ├── content/
      │
      ▼
Nuxt Content
      │
      ▼
Nuxt application
      │
      ▼
Website
```

Studio provides an editing interface on top of this workflow.

---

## Adding and Editing Content

For developers, content can be edited directly in the `content/` directory.

For content editors, the preferred workflow is usually Nuxt Studio.

When adding a new type of structured content, consider defining a Content Collection in `content.config.ts`. Collections provide schema validation and type-safe querying and also improve the editing experience in Nuxt Studio.

Example:

```ts
import { defineCollection, defineContentConfig } from "@nuxt/content";

export default defineContentConfig({
	collections: {
		pages: defineCollection({
			type: "page",
			source: "**/*.md",
		}),
	},
});
```

---

## Build

Create a production build with:

```bash
pnpm run build
```

Preview the production build locally with:

```bash
pnpm run start
```

For production deployments, Nuxt Studio requires a deployment environment that supports server-side routes and an SSR build using `nuxt build`.

---

## Deployment

The website can be deployed using a Nuxt-compatible hosting provider.

A typical deployment workflow is:

```text
1. Push changes to Git
        ↓
2. CI/CD starts
        ↓
3. Install dependencies
        ↓
4. Build Nuxt application
        ↓
5. Deploy application
```

If content is published through Nuxt Studio, Studio creates the Git commit automatically and the existing CI/CD pipeline should take care of the deployment.

---

## Project Website

The live OpenAtlas website is available at:
**https://openatlas.eu**
For more information about OpenAtlas, visit the project website.

---

## Documentation

- [Nuxt](https://nuxt.com/)
- [Nuxt 4 Documentation](https://nuxt.com/docs/4.x)
- [Nuxt Content](https://content.nuxt.com/)
- [Nuxt Content Documentation](https://content.nuxt.com/docs/getting-started)
- [Nuxt Studio](https://content.nuxt.com/docs/studio)
- [Nuxt Studio OAuth Providers](https://content.nuxt.com/docs/studio/providers)

---

## Licensing

This project is licensed under the **MIT License**.
See the `LICENSE` file for the full license text.
