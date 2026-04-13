# Assessment App

This repository now uses a custom React + TypeScript + Vite app implementation for a small assessment project.

## What’s included

- Dashboard view for browsing products from the Fake Store API
- Search, sort, and pagination support
- Registration form with validation and password-strength feedback
- Tab navigation between the dashboard and form

## Getting started

Install dependencies and start the Vite development server:

```bash
cd assessment
npm install
npm run dev
```

Open the app at the URL shown in your terminal, typically `http://localhost:5173`.

## Project structure

- `src/App.tsx` — entry point that renders the assessment component
- `src/Assessment.tsx` — dashboard and registration app logic
- `src/index.css` — global site styles

## Notes

- The product data is fetched from `https://fakestoreapi.com/products`
- Use the top tabs to switch between **Dashboard** and **Register**
- The registration form includes field validation and a success state after submission

## Existing Vite template info

The original Vite boilerplate files are still available in the repository, but the app now renders the custom assessment UI from `src/Assessment.tsx`.
