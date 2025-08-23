# Digital Wallet Client - Template

## Description

This repository contains the frontend client for a digital wallet application. It is built using React, TypeScript, and Vite, with ESLint for code quality and pre-configured for integration with shadcn/ui components. The client provides a user-friendly interface for managing digital wallet features, including user authentication, balance viewing, transactions, and more. It connects to a backend API for data handling and authentication.

The backend API can be found at: [https://github.com/muhammadranju/digital-wallet-api](https://github.com/muhammadranju/digital-wallet-api)

This project serves as a starter template enhanced for building modern web applications, but tailored here for digital wallet functionality.

## Features

- React with Fast Refresh for efficient development
- TypeScript support for type-safe code
- Vite as the build tool for fast performance
- ESLint integration with customizable rules
- Ready for shadcn/ui components (optional integration)
- User authentication and role-based access (via backend API)
- Wallet balance display and transaction management
- Responsive UI components

## Prerequisites

- Node.js (v16 or higher recommended)
- A package manager such as npm, yarn, pnpm, or bun
- The backend API running locally or deployed (configure API endpoint in environment variables)

## Getting Started

1. Clone the repository:

   ```
   git clone https://github.com/muhammadranju/digital-wallet-client.git
   cd digital-wallet-client
   ```

2. Install dependencies:

   ```
   npm install
   ```

   (Or use `yarn install`, `pnpm install`, or `bun install`)

3. Configure environment variables (e.g., create a `.env` file with the backend API URL):

   ```
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

4. Run the development server:

   ```
   npm run dev
   ```

   (Or use `yarn dev`, `pnpm dev`, or `bun dev`)

   The application will be available at `http://localhost:5173` (or the port specified by Vite).

## Available Scripts

- `dev`: Starts the Vite development server with hot module replacement.
- `build`: Builds the application for production.
- `lint`: Runs ESLint to check for code issues.
- `preview`: Previews the production build locally.

## Project Structure

```
digital-wallet-client/
├── public/                   # Static assets
├── src/                      # Source code
│   ├── components/           # Reusable React components (e.g., UI elements for wallet features)
│   ├── App.tsx               # Main application component
│   └── index.tsx             # Entry point
├── .gitignore                # Git ignore file
├── components.json           # shadcn/ui configuration
├── eslint.config.js          # ESLint configuration
├── index.html                # HTML template
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── tsconfig.app.json         # App-specific TypeScript config
├── tsconfig.node.json        # Node-specific TypeScript config
└── vite.config.ts            # Vite configuration
```

## Integration with shadcn/ui (Optional)

To add shadcn/ui components:

1. Ensure Tailwind CSS is set up (if not already).
2. Run the shadcn CLI to add components:
   ```
   npx shadcn-ui@latest add button
   ```
3. Update TypeScript path aliases if needed (refer to shadcn/ui documentation).

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests for improvements, bug fixes, or new features. Please follow standard coding practices and run `npm run lint` before committing.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
