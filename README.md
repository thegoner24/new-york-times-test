# Praisindo News Search App

A modern web application to search and view New York Times articles, built with **React**, **TypeScript**, **Vite**, and **TailwindCSS**.

---

## Table of Contents
- [Features](#features)
- [Demo](#demo)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API & Environment](#api--environment)
- [Architecture](#architecture)
- [Contributing](#contributing)
- [License](#license)

---

## Features
- 🔍 Search for New York Times articles by keyword
- 📰 List and detail views for articles
- 🔎 Advanced news filtering by date, category, and source
- 📆 Date range selection for historical articles
- 🌙 Clean, responsive UI with TailwindCSS
- ⚡ Fast development with Vite HMR
- 🔒 Environment variable support for API keys
- 🧹 Linting and TypeScript strictness
- 🧪 Unit testing with Jest and React Testing Library
- 📱 Mobile-first responsive design
- 🔄 Latest React 19 with concurrent features
- 🛣️ Modern routing with React Router v7
- 🏗️ Type-safe development with TypeScript 5.8

## Demo
> [Click Here](https://new-york-times-test.vercel.app/)


## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- New York Times API Key ([Get one here](https://developer.nytimes.com/))
- Git for version control

### Installation
```bash
# Clone the repository
git clone https://github.com/thegoner24/new-york-times-test.git
cd praisindo-test

# Install dependencies
npm install
```

### Environment Setup
Create a `.env` file at the root:
```env
VITE_NYT_API_KEY=your_nyt_api_key_here
```

### Running the App
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Testing
```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch
```

### Linting
```bash
npm run lint
```

---

## Troubleshooting

- **ESM-only package errors**: If you see errors about ESM or `@tailwindcss/vite`, ensure your `package.json` contains:
  ```json
  "type": "module"
  ```
  (not `"_type": "module"`)
- **Vite server not accessible**: If you get `ERR_CONNECTION_TIMED_OUT`, make sure the dev server is running and accessible at http://localhost:5173/. Try `npm run dev -- --host` if accessing from another device or VM.
- **TypeScript errors**: If you encounter TypeScript errors, run `npm run build` to check for type issues. Make sure your tsconfig files are properly set up.
- **Testing errors**: If tests fail to run, ensure Jest is properly configured with `jest.config.cjs` and that test files follow the naming convention `*.test.tsx` or `*.spec.tsx`.
- **React version compatibility**: This project uses React 19. If you encounter compatibility issues with certain packages, check their documentation for React 19 support.

---

## Project Structure
```
├── public/               # Static assets
├── src/
│   ├── App.tsx           # Main app component & routing
│   ├── App.css           # App-level styles (Tailwind)
│   ├── index.css         # Global styles (Tailwind)
│   ├── main.tsx          # Entry point
│   ├── ArticleDetail.tsx # Detail page for articles
│   ├── components/
│   │   ├── ArticleCard.tsx   # Card component for articles
│   │   ├── BackToTopButton.tsx     # Back to top button component
│   │   ├── DarkModeToggle.tsx   # Dark mode toggle component
│   │   ├── NewsFilter.tsx    # News filter component
│   │   └── SkeletonArticleCard.tsx # Loading state component
│   ├── services/
│   │   └── nytService.ts     # NYT API service
│   ├── hooks/
│   │   └── useArticles.ts    # Custom hook for article data
│   ├── types/
│   │   └── article.ts        # TypeScript types
│   ├── utils/
│   │   └── formatters.ts     # Helper functions
│   └── vite-env.d.ts         # Vite env types
├── tests/                # Test files
│   ├── components/       # Component tests
│   └── services/         # Service tests
├── .env                  # API keys (not committed)
├── package.json          # Project metadata & scripts
├── vite.config.ts        # Vite config
├── jest.config.cjs       # Jest configuration
├── tsconfig.json         # TypeScript configuration
├── tsconfig.app.json     # App-specific TS config
├── tsconfig.node.json    # Node-specific TS config
└── README.md             # Project docs
```

---

## API & Environment
- Uses the [NYT Article Search API](https://developer.nytimes.com/docs/articlesearch-product/1/overview)
- API key is required and loaded from environment variable (`VITE_NYT_API_KEY`)
- Implements error handling for API failures
- Supports pagination for article results
- Includes caching strategy for improved performance
- Handles rate limiting gracefully
- Utilizes NYT API filter parameters for advanced news filtering:
  - `begin_date` and `end_date` for date range filtering
  - `fq` (filter query) for filtering by news desk, section name, and document type
  - `sort` parameter for ordering results by newest, oldest, or relevance

---

## Architecture
- **React Router** for navigation (`/` for search, `/article/:id` for detail)
- **Services** layer for API calls
- **Component-based** UI (ArticleCard, BackToTopButton, DarkModeToggle, NewsFilter, ArticleDetail)
- **Custom Hooks** for data fetching and state management
- **Filter System** for advanced news filtering by multiple criteria
- **TypeScript** for type safety and enhanced developer experience
- **TailwindCSS** for utility-first styling
- **Vite** for lightning-fast builds and HMR
- **Jest & React Testing Library** for component and unit testing
- **ESLint** with React-specific plugins for code quality

---

## Contributing
1. Fork this repo
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Create a new Pull Request

---

## License

MIT License. See [LICENSE](LICENSE) for details.

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
