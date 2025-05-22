# Creative Spark

Creative Spark is a modern, full-stack web application for creating, editing, and managing creative projects. It features a powerful editor with AI-assisted tools, image management, and a customizable dashboard. Built with Next.js, React, Drizzle ORM, and a suite of modern libraries, Creative Spark is designed for creators who want a seamless, collaborative, and extensible platform.

## Features

- **Project Dashboard**: Organize, create, duplicate, and delete projects from a central dashboard.
- **Rich Editor**: Edit projects with a feature-rich editor supporting layers, shapes, text, images, and more.
- **AI Tools**: Integrate AI-powered features (e.g., image generation, background removal) via Replicate and other APIs.
- **Image Management**: Upload, browse, and manage images using UploadThing and Unsplash integration.
- **Authentication**: Secure login and user management.
- **Customizable UI**: Light/dark mode, theme provider, and modular UI components.
- **Database Integration**: Uses Drizzle ORM for type-safe database access.
- **API Routes**: RESTful API endpoints for projects, images, users, and AI features.

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [UploadThing](https://uploadthing.com/) (file uploads)
- [Replicate](https://replicate.com/) (AI features)
- [Unsplash API](https://unsplash.com/developers) (image search)
- [Tailwind CSS](https://tailwindcss.com/) (via `globals.css`)
- [ESLint](https://eslint.org/) (linting)
- [PostCSS](https://postcss.org/) (styling)
- [Bun](https://bun.sh/) (optional, for fast JS runtime)

## Getting Started

### Prerequisites

- Node.js (v18+ recommended) or Bun
- npm, yarn, pnpm, or bun (for package management)
- A database (e.g., SQLite, PostgreSQL) configured via Drizzle ORM
- API keys for UploadThing, Replicate, and Unsplash (see `.env`)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/creative-spark.git
   cd creative-spark
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. **Configure environment variables:**

   - Copy `.env.example` to `.env` and fill in the required API keys and database connection strings.

4. **Run database migrations:**

   ```bash
   npx drizzle-kit push
   ```

5. **Start the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun run dev
   ```

6. **Open the app:**
   - Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- **Dashboard**: Manage your projects from the main dashboard.
- **Editor**: Click on a project to open the editor, where you can add images, text, shapes, and use AI tools.
- **Templates**: Use and manage project templates for faster creation.
- **Authentication**: Log in to access your projects and personalized features.

## Folder Structure

```
src/
  app/
    (auth)/           # Authentication pages and logic
    (dashboard)/      # Dashboard UI and hooks
    editor/           # Editor pages, components, and hooks
    api/              # API routes (REST endpoints)
    globals.css       # Global styles (Tailwind CSS)
    layout.tsx        # App layout
  components/         # Reusable UI components
  db/                 # Database schema and access (Drizzle)
  hooks/              # Custom React hooks
  lib/                # Utility libraries (auth, upload, AI, etc.)
public/               # Static assets (images, favicon, etc.)
```

## Environment Variables

Refer to the `.env.example` file for the required environment variables.

## Contributing

Contributions are welcome! Please open issues or submit pull requests for new features, bug fixes, or improvements.

## License

[MIT](LICENSE)

---

Built with ❤️ by the Creative Spark team.
