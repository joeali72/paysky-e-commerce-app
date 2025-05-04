# Modern E-commerce App

A full-featured e-commerce application built with React, TypeScript, and Tailwind CSS.

## Features

- **Authentication:** Secure login system with protected checkout
- **Product Management:** Browse, search, and filter products from the FakeStore API
- **Cart Functionality:** Add items, update quantities, and check out
- **Responsive Design:** Optimized for all device sizes
- **State Management:** Zustand for global state management
- **API Integration:** React Query for data fetching and caching

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **Routing:** React Router DOM
- **State Management:** Zustand, React Query
- **Forms:** React Hook Form with Zod validation
- **UI Components:** ShadCN UI
- **API Client:** Axios

## Getting Started

### Installation

```bash
# Clone the repository
git clone [https://github.com/joeali72/paysky-e-commerce-app.git]

# Navigate to project directory
cd paysky-e-commerce-app

# Install dependencies
npm install

# Start development server
npm run dev
```

### Test Credentials

For testing the login functionality, use:

- Username: `mor_2314`
- Password: `83r5^_`

## Project Structure

- `src/components` - UI components organized by feature
- `src/pages` - Page components
- `src/hooks` - Custom React hooks
- `src/store` - Zustand state management
- `src/types` - TypeScript interfaces
- `src/lib` - Utility functions and API client
- `src/features` - Components, Hooks, Store, Schema and Resources for every page
- `src/routes` - React Router DOM routes

## API

This project uses the [FakeStore API](https://fakestoreapi.com/docs) for product data and authentication.
