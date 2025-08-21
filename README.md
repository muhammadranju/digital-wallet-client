# ts-react‑shadcn‑template

A minimal React + TypeScript + Vite starter template, enhanced with ESLint integration and ready for shadcn/ui component usage.

---

## Features

- **React** with Fast Refresh (via `@vitejs/plugin-react` or optional SWC-based plugin) :contentReference[oaicite:1]{index=1}
- **TypeScript** support
- **Vite** build tool, optimized for speed
- **ESLint** with default configuration—expandable with type-aware and React-specific rules :contentReference[oaicite:2]{index=2}
- Ready-to-use **`shadcn/ui`** setup (add-on integration suggested)
- Organized configuration files for ease of customization (e.g., `tsconfig.json`, `vite.config.ts`, etc.) :contentReference[oaicite:3]{index=3}

---

## Prerequisites

Ensure the following are installed:

- Node.js (v16+ recommended)
- A JavaScript package manager (`npm`, `pnpm`, `yarn` or `bun`)

---

## Getting Started

```bash
git clone https://github.com/muhammadranju/ts-react-shadcn-template.git
cd ts-react-shadcn-template
# Install dependencies:
npm install
# or yarn install / pnpm install / bun install
```

### Run Development Server

```bash
npm run dev
# or yarn dev / pnpm dev / bun dev
```

You’ll have a development server with hot reload and ESLint support ready to go.

---

## Available Scripts

- `dev` — Start the Vite development server
- `build` — Create a production-ready build
- `lint` — Run ESLint checks (customizable rules supported)
- `preview` — Preview production build locally (via `vite preview`)

_(Note: adjust actual script names if different in your `package.json`.)_

---

## ESLint Configuration

By default, ESLint is set up for basic React and TypeScript linting. To enable stricter, type-aware rules, you can extend your config like this:

```js
// eslint.config.js
export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      // or for stricter checks:
      ...tseslint.configs.strictTypeChecked,
      // optional stylistic rules:
      ...tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);
```

You can also install and integrate plugins like `eslint-plugin-react-x` and `eslint-plugin-react-dom` for improved React linting ([GitHub][1]).

---

## Project Structure

```
ts-react-shadcn-template/
├── public/                   # Static web assets
├── src/                      # Application source
│   ├── components/           # React UI components
│   ├── App.tsx               # Main component
│   └── index.tsx             # Application entry point
├── .gitignore
├── components.json           # shadcn/ui component config
├── eslint.config.js          # ESLint rules (configurable)
├── index.html
├── package.json
├── tsconfig*.json            # TypeScript configs
└── vite.config.ts            # Vite configuration
```

_(Tailor as needed—add any additional folders or files relevant to your repo.)_

---

## Integration with shadcn/ui (Optional)

To incorporate `shadcn/ui`, follow the official Vite setup guide:

1. Add Tailwind CSS and necessary dependencies
2. Configure TypeScript path aliasing (`@` → `src/`) in `tsconfig.json` / `tsconfig.app.json` and `vite.config.ts`
3. Run the shadcn CLI for initialization and component installation

You can refer to the official documentation for detailed steps ([Shadcn UI][2]).

---

## License

This project is released under the **MIT License**. See the `LICENSE` file for full details.

---

## About / Acknowledgments

_(Feel free to personalize this—mention your name, any specific inspirations, or the purpose of the project.)_

---

### Feedback & Contributions

Contributions, feedback, and suggestions are welcome! Open an issue or a pull request to get started.

---

Let me know if you'd like to refine any section further—whether it’s installation, usage examples, adding a badges panel, or customizing shadcn integration!

[1]: https://github.com/muhammadranju/ts-react-shadcn-template "GitHub - muhammadranju/ts-react-shadcn-template"

[2]: https://ui.shadcn.com/docs/installation/vite"Vite - Shadcn UI"
