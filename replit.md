# Portfolio Application - replit.md

## Overview

This is a modern portfolio website for Mattia Puntarello, built as a full-stack TypeScript application. The project showcases a professional portfolio with sections for projects, timeline/experience, blog posts, and contact functionality. It uses a clean, modern design with Italian content and responsive layout.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a full-stack architecture with clear separation between frontend and backend:

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state
- **Forms**: React Hook Form with Zod validation
- **Build Tool**: Vite with React plugin

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript (ESM modules)
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Validation**: Zod schemas shared between frontend and backend

## Key Components

### Frontend Components
- **Navigation**: Fixed header with smooth scrolling navigation
- **Hero Section**: Personal introduction with profile image
- **Portfolio Section**: Project showcase with filtering capabilities
- **History Section**: Timeline of professional experience and education
- **Blog Section**: Article previews with reading time
- **Contact Section**: Contact form with validation
- **Footer**: Social links and quick navigation

### Backend API Endpoints
- `GET /api/portfolio` - Fetch all portfolio projects
- `GET /api/portfolio/featured` - Fetch featured projects only
- `GET /api/timeline` - Fetch timeline items (work/education)
- `GET /api/blog` - Fetch published blog posts
- `GET /api/blog/:slug` - Fetch specific blog post by slug
- `POST /api/contact` - Submit contact form messages

### Database Schema
- **users**: User authentication (basic structure)
- **portfolio_projects**: Project information with technologies, URLs, and featured status
- **timeline_items**: Professional experience and education entries
- **blog_posts**: Blog articles with content, metadata, and publishing status
- **contact_messages**: Contact form submissions

## Data Flow

1. **Client Requests**: Frontend components use TanStack Query to fetch data from API endpoints
2. **API Layer**: Express.js routes handle requests and interact with the storage layer
3. **Storage Layer**: Currently implements in-memory storage with interface for database integration
4. **Database Integration**: Drizzle ORM provides type-safe database operations with PostgreSQL
5. **Response Handling**: API responses are typed and validated using shared Zod schemas

## External Dependencies

### Core Dependencies
- **UI Framework**: React with Radix UI primitives for accessibility
- **Database**: Neon Database serverless PostgreSQL
- **ORM**: Drizzle ORM with Drizzle Kit for migrations
- **Validation**: Zod for runtime type validation
- **HTTP Client**: Native fetch with TanStack Query wrapper
- **Fonts**: Google Fonts (Inter family)

### Development Tools
- **Build**: Vite for frontend, esbuild for backend
- **Development**: tsx for TypeScript execution
- **Code Quality**: TypeScript strict mode enabled
- **Hot Reload**: Vite HMR with custom error overlay

## Deployment Strategy

### Development Mode
- Frontend: Vite dev server with HMR
- Backend: Express server with auto-reload via tsx
- Database: Neon Database with connection pooling

### Production Build
- Frontend: Static assets built with Vite to `dist/public`
- Backend: Bundled with esbuild to `dist/index.js`
- Serving: Express serves both API and static files
- Database: Production Neon Database instance

### Environment Configuration
- `DATABASE_URL`: PostgreSQL connection string (required)
- `NODE_ENV`: Environment mode (development/production)
- Path aliases configured for clean imports (@, @shared, @assets)

### Database Management
- Schema: Defined in `shared/schema.ts` using Drizzle
- Migrations: Generated in `./migrations` directory
- Deployment: `npm run db:push` to sync schema with database

The application is designed to be easily deployable on Replit with automatic database provisioning and environment variable management.