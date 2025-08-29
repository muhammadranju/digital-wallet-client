# Digital Wallet Client

A modern, responsive frontend application for managing digital wallet operations, built with React, Redux, and Material-UI. This client interfaces seamlessly with the Digital Wallet API, enabling users to perform transactions, view balances, and manage their accounts.

## Live Demo

[hhttps://digital-wallet-client-omega.vercel.app](hhttps://digital-wallet-client-omega.vercel.app)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **User Authentication**: Secure login and registration with JWT support.
- **Dashboard**: Real-time wallet balance and recent transactions.
- **Transactions**: Transfer funds, add money, and withdraw with confirmation dialogs.
- **Responsive Design**: Mobile-first approach using Material-UI.
- **State Management**: Global state management with Redux.
- **API Integration**: Connects to the Digital Wallet API for backend operations.

---

## Tech Stack

- **Frontend**: React.ts
- **State Management**: Redux
- **UI Framework**: Material-UI
- **Routing**: React Router
- **API Communication**: Axios
- **Form Validation**: Formik & Yup
- **Build Tools**: Webpack, Babel
- **Version Control**: Git & GitHub

---

## Installation

### Prerequisites

- Node.ts (v16 or higher)
- npm or bun

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/muhammadranju/digital-wallet-client.git
   cd digital-wallet-client
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   bun install
   ```

3. Start the development server:

   ```bash
   npm start
   # or
   bun start
   ```

   The application will be available at [http://localhost:3000](http://localhost:3000).

---

## Usage

- **Login**: Use the login form to authenticate with the backend API.
- **Dashboard**: View your wallet balance and recent transactions.
- **Transactions**: Navigate to the transactions page to add, withdraw, or transfer funds.
- **Profile**: Update your account information and settings.

---

## Folder Structure

```
digital-wallet-client/
├── public/                  # Static files
├── src/
│   ├── assets/              # Images and icons
│   ├── components/          # Reusable UI components
│   ├── features/            # Redux slices
│   ├── pages/               # Application pages
│   ├── services/            # API calls
│   ├── App.ts               # Main application component
│   ├── index.ts             # Entry point
│   └── store.ts             # Redux store configuration
├── .gitignore               # Git ignore file
├── package.json             # Project metadata and dependencies
└── README.md                # Project documentation
```

---

## Contributing

We welcome contributions to improve the Digital Wallet Client. To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Create a new Pull Request.

Please ensure that your code adheres to the existing coding standards and includes appropriate tests.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
