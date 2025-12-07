# Shanvi Property Solutions - Replit Configuration

## Overview

Shanvi Property Solutions is a premium real estate platform serving Vidisha, Bhopal, Raisen, and pan-India markets. The application provides property listings, city-specific pages, administrative management, and contact capabilities with a focus on elegant user experience and spiritual branding ("Devotion in Every Deal").

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React 18+ with TypeScript
- Vite as build tool and development server
- Wouter for client-side routing
- TanStack Query for server state management
- Framer Motion for animations
- Shadcn UI components built on Radix UI primitives
- Tailwind CSS v4 with custom theme configuration

**Design System:**
- Custom color scheme featuring saffron (#FF9933) and gold (#E2B552) as brand colors
- Typography: Poppins for sans-serif, Playfair Display for serif elements
- Responsive design with mobile-first approach
- Component library based on Shadcn UI patterns with New York style variant

**State Management:**
- React Context for authentication (`AuthProvider`)
- React Context for property data (`PropertyProvider`)
- TanStack Query for API data fetching and caching
- Local component state with React hooks

**Routing Structure:**
- `/` - Home page with hero section and featured properties
- `/properties` - Full property listings with search and filters
- `/about` - Company story and philosophy
- `/services` - Service offerings
- `/city/:name` - City-specific property pages (Bhopal, Vidisha, Raisen)
- `/pan-india` - National presence overview
- `/contact` - Contact form
- `/login` - Admin authentication
- `/admin` - Property management dashboard (protected route)

### Backend Architecture

**Technology Stack:**
- Node.js with Express.js
- TypeScript with ES modules
- Better-sqlite3 for SQLite database (local development)
- Mongoose models defined (suggests MongoDB was considered/used previously)
- Session-based authentication using express-session
- bcrypt for password hashing
- Multer for file upload handling

**API Structure:**
- `/api/auth/login` - User authentication
- `/api/auth/logout` - Session termination
- `/api/auth/check` - Authentication status verification
- `/api/properties` - CRUD operations for property listings
- `/api/health` - Health check endpoint

**Middleware:**
- CORS enabled for cross-origin requests
- Session middleware with cookie-based sessions
- Custom `requireAuth` middleware for protected routes
- Static file serving for uploads directory

**Database Schema:**

Properties table:
- id (primary key, auto-increment)
- title, location, price, type (enum: Residential/Commercial/Land/Industrial)
- beds, baths, area
- image (file path)
- status (enum: Available/Sold/Pending)
- city (optional, for filtering)
- timestamps (created_at, updated_at)

Users table:
- id (primary key, auto-increment)
- username (unique)
- password (hashed)
- created_at

**Authentication & Authorization:**
- Session-based authentication using express-session
- Password hashing with bcrypt (10 salt rounds)
- Session cookies configured with:
  - 7-day expiration
  - httpOnly flag for security
  - secure flag disabled (for development)
  - sameSite: 'lax'
- Protected routes use `requireAuth` middleware
- Single admin role system

### Data Storage

**Current Implementation:**
- SQLite database via better-sqlite3
- Database file location: `data/shanvi.db`
- WAL (Write-Ahead Logging) mode enabled for better concurrency
- Initial seed data for properties included

**File Storage:**
- Uploaded property images stored in `/uploads` directory
- Multer configuration with 5MB file size limit
- Allowed formats: JPEG, JPG, PNG, GIF, WEBP
- Unique filename generation using timestamp + random suffix

**Migration System:**
- Drizzle Kit configured for PostgreSQL dialect
- Migration files output to `./migrations` directory
- Schema defined in `shared/schema.ts`
- Note: Current runtime uses SQLite, but Drizzle config suggests PostgreSQL for production

### External Dependencies

**Third-Party UI Libraries:**
- Radix UI component primitives (accordion, dialog, dropdown, select, toast, etc.)
- Lucide React for icons
- Embla Carousel for image carousels
- CMDK for command palette functionality
- Vaul for drawer components

**Development Tools:**
- Replit-specific plugins:
  - `@replit/vite-plugin-runtime-error-modal` - Runtime error overlay
  - `@replit/vite-plugin-cartographer` - Development tooling
  - `@replit/vite-plugin-dev-banner` - Development banner
- Custom `vite-plugin-meta-images` - Updates OpenGraph images for Replit deployments

**Form Management:**
- React Hook Form for form state
- Zod for schema validation
- @hookform/resolvers for Zod integration

**Styling:**
- Tailwind CSS v4 with @tailwindcss/vite plugin
- PostCSS with Autoprefixer
- Custom CSS variables for theming
- Class Variance Authority (CVA) for component variants
- clsx and tailwind-merge for className management

**Build & Deployment:**
- Vite production builds output to `dist/public`
- Server proxy configuration for API routes in development
- Environment variables managed via dotenv
- TypeScript with strict mode enabled

**Fonts:**
- Google Fonts: Inter, Playfair Display, Poppins
- Preconnected for performance optimization

**Session Management:**
- express-session with configurable secret
- Default secret: 'shanvi-property-secret-key-change-in-production'
- Cookie-based session storage

**Image Handling:**
- Stock images stored in `attached_assets/stock_images/` for city pages
- Generated images stored in `attached_assets/generated_images/`
- OpenGraph image support (opengraph.png/jpg/jpeg in public directory)
- Automatic URL construction for deployed environments