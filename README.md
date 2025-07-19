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
- 🌙 Clean, responsive UI with TailwindCSS
- ⚡ Fast development with Vite HMR
- 🔒 Environment variable support for API keys
- 🧹 Linting and TypeScript strictness

## Demo
> [Click Here](https://new-york-times-test.vercel.app/)


## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- New York Times API Key ([Get one here](https://developer.nytimes.com/))

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
npm test
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
│   │   └── ArticleCard.tsx   # Card component for articles
│   ├── services/
│   │   └── nytService.ts     # NYT API service
│   ├── types/
│   │   └── article.ts        # TypeScript types
│   └── vite-env.d.ts         # Vite env types
├── .env                  # API keys (not committed)
├── package.json          # Project metadata & scripts
├── vite.config.ts        # Vite config
└── README.md             # Project docs
```

---

## API & Environment
- Uses the [NYT Article Search API](https://developer.nytimes.com/docs/articlesearch-product/1/overview).
- API key is required and loaded from environment variable (`VITE_NYT_API_KEY`).

---

## Architecture
- **React Router** for navigation (`/` for search, `/article/:id` for detail)
- **Services** layer for API calls
- **Component-based** UI (ArticleCard, ArticleList, ArticleDetail)
- **TypeScript** for type safety
- **TailwindCSS** for styling

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
