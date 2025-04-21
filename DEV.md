# Developer Guide (DEV.md)

## Table of Contents

1. Prerequisites
2. Scaffold the Project
3. Folder Structure
4. Running the Development Server
5. Building for Production
6. Coding Conventions
7. Styling & Assets
8. Testing
9. Linting & Formatting
10. Troubleshooting

## 1. Prerequisites

- Node.js ≥ 18.x (download from https://nodejs.org)
- npm (bundled with Node.js) or yarn (https://yarnpkg.com)
- Git (https://git-scm.com)
- Code editor (e.g., Visual Studio Code)

## 2. Scaffold the Project

1. Open a terminal in your working folder.
2. Run the Next.js scaffold command:
   ```bash
   npx create-next-app@latest onyx-portfolio \
     --typescript \
     --eslint \
     --tailwind \
     --import-alias "@/*" \
     --app
   ```
3. Change into the project directory:
   ```bash
   cd onyx-portfolio
   ```

## 3. Folder Structure

When you scaffold, you get this layout:

```
onyx-portfolio/
├── app/            # Entry point (Next.js App Router)
├── pages/          # Legacy page routes
├── public/         # Static assets
├── styles/         # Global CSS
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── next.config.js
```

## 4. Running the Development Server

To start your local dev server with hot reloading:

```bash
npm run dev       # or yarn dev
```

Open http://localhost:3000 in your browser.

## 5. Building for Production

1. Generate an optimized build:
   ```bash
   npm run build    # or yarn build
   ```
2. Run the build locally:
   ```bash
   npm run start    # or yarn start
   ```

## 6. Coding Conventions

- Use **PascalCase** for React component filenames and component names (e.g., `MyComponent.tsx`).
- Use **camelCase** for JavaScript/TypeScript variables and functions.
- Keep components small and focused: one component = one UI feature.
- Prefer **functional components** and **React Hooks** over class components.
- Document components with JSDoc or TypeScript types.

### Creating a Component

1. Create file: `components/HelloWorld.tsx`.
2. Import React and types:
   ```tsx
   import React from 'react';

   interface HelloWorldProps {
     name: string;
   }
   ```
3. Define and export component:
   ```tsx
   const HelloWorld: React.FC<HelloWorldProps> = ({ name }) => {
     return <div>Hello, {name}!</div>;
   };

   export default HelloWorld;
   ```
4. Use the component in a page or another component:
   ```tsx
   import HelloWorld from '@/components/HelloWorld';

   // ...existing code...
   <HelloWorld name="Onyx" />
   // ...existing code...
   ```

## 7. Styling & Assets

- Tailwind CSS is preconfigured. Add classes inline in JSX:
  ```jsx
  <button className="bg-blue-500 text-white px-4 py-2 rounded">
    Click me
  </button>
  ```
- To customize, edit `tailwind.config.js`:
  ```js
  module.exports = {
    theme: {
      extend: {
        colors: {
          primary: '#1e40af',
        },
      },
    },
  };
  ```
- For global CSS, modify `styles/globals.css`.
- Static assets (images, fonts) go in `public/` and referenced by `/filename.png`.

## 8. Testing

- Jest & React Testing Library are set up by Next.js.
- Write tests in `__tests__/` or alongside components with `.test.tsx` suffix.

Example: `components/HelloWorld.test.tsx`
```tsx
import { render, screen } from '@testing-library/react';
import HelloWorld from './HelloWorld';

test('renders greeting', () => {
  render(<HelloWorld name="Test" />);
  expect(screen.getByText('Hello, Test!')).toBeInTheDocument();
});
```
- Run tests:
  ```bash
  npm run test
  ```

## 9. Linting & Formatting

- ESLint rules are included. Run:
  ```bash
  npm run lint
  ```
- Prettier is configured. Run:
  ```bash
  npm run format
  ```
- Optional: add Husky pre-commit hooks to auto-run lint/format.

## 10. Troubleshooting

- Port in use: change `next.config.js` or run on different port:
  ```bash
  npm run dev -- -p 3001
  ```
- TypeScript errors: check types and restart TS server in VS Code.
- 404 pages: add `app/not-found.tsx` or `pages/404.tsx`.
- Consult Next.js docs: https://nextjs.org/docs
