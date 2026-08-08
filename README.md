# Projectify

Projectify is a project management application designed to make it easier to organise projects, track progress, and keep deadlines visible in one place.

**Live application:** [https://projectify-eta.vercel.app/]

## Problem

Managing multiple projects can quickly become difficult when project information, progress, and deadlines are spread across different places. This makes it easy to lose track of what needs to be done and when.

## Solution

Projectify brings this information into one application. Users can create and manage projects, assign statuses, search and filter projects, and use an interactive calendar to track deadlines and upcoming work.

The application also uses a reusable project modal so projects can be created or edited from different parts of the application without forcing the user to navigate to a dedicated form page.

## Current Features

* Project creation, editing and deletion
* Project status tracking
* Global project search and filtering
* Interactive month, week, day and agenda calendar views
* Deadline tracking
* Dashboard overview
* Reusable project modal
* Responsive navigation
* Local project persistence

## Tech Stack

* React
* Vite
* JavaScript
* React Router
* React Big Calendar
* date-fns
* React Icons
* CSS
* LocalStorage

## Current Architecture

The current version is a frontend application with project data stored in the browser using `localStorage`.

The next stage will introduce a backend API, database, authentication, and server-side data persistence, turning Projectify into a full-stack application.

## Running Locally

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Future Development

The planned backend will introduce:

* Node.js and Express API
* PostgreSQL database
* User authentication
* Server-side project storage
* User-specific projects
* API-based CRUD operations

Projectify is being developed progressively from a frontend application into a complete full-stack project management system.
