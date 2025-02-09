# Next.js Puck Form Widget

A Next.js implementation featuring Puck visual builder with a custom Form widget component. This project demonstrates how to extend Puck's capabilities with custom components while implementing database integration and dynamic routing.

## Features

- Next.js App Router implementation
- JSON database implementation with HTTP API
- Catch-all routes using Puck for any route on the platform
- Incremental Static Regeneration (ISR) for all Puck pages
- Custom Form widget for the Puck editor
- Real-time form preview and configuration
- Support for multiple form field types

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later) or yarn

## Installation

1. Create a new project using the generator:
   ```bash
   npx create-puck-app my-app
   ```
   When prompted, select `next` as your template.

2. Navigate to the project directory:
   ```bash
   cd my-app
   ```

3. Install dependencies:
   ```bash
   yarn install
   # or
   npm install
   ```

## Getting Started

1. Start the development server:
   ```bash
   yarn dev
   # or
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser to view the homepage
3. Access the Puck editor at [http://localhost:3000/edit](http://localhost:3000/edit)

## Page Creation and Editing

- Visit any route on your application, even if it doesn't exist yet (e.g., `/hello/world`)
- Add `/edit` to any route to access the Puck editor (e.g., `/hello/world/edit`)
- After publishing, your new page will be available at the original URL

## Form Widget Features

The custom Form widget allows you to:
- Add multiple form fields through the Puck editor interface
- Configure field properties:
  - Text labels
  - Field types (textbox, radio buttons, etc.)
  - Additional field-specific settings
- Preview forms in real-time while editing




## Implementation Guide

To implement this in your project:

1. **Add Authentication (REQUIRED)**
   - Modify `/app/puck/api/route.ts` to include authentication
   - Update the server component in `/app/puck/[...puckPath]/page.tsx`
   - ⚠️ **IMPORTANT**: Do not deploy without implementing authentication

2. **Database Integration**
   - Integrate your database with the API calls in `/app/puck/api/route.ts`

3. **Custom Configuration**
   - Implement your custom Puck configuration in `puck.config.tsx`

## Static vs Dynamic Pages

By default, this implementation generates static pages using Next.js's `force-static` configuration. To enable dynamic pages:

1. Remove the `dynamic = 'force-static'` setting from `/app/[...puckPath]/page.tsx`
2. Update the page component to handle dynamic data as needed



## Security Considerations

⚠️ **Warning**: By default, Puck editor routes (`/edit`) are public. Implement proper authentication before deploying to production.

## Support

For issues and feature requests, please use the GitHub Issues page.

For more information about Puck, visit the [official documentation](https://puck.dev).