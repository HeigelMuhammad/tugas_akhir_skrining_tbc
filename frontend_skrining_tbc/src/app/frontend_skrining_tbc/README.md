# Frontend Skrining TBC

This project is a frontend application for TBCheck, designed to facilitate user registration and login functionalities. It interacts with a backend API to manage user authentication.

## Project Structure

```
frontend_skrining_tbc
├── src
│   ├── app
│   │   └── (public)
│   │       └── auth
│   │           ├── login
│   │           │   └── page.tsx      # Login page component
│   │           └── register
│   │               └── page.tsx      # Registration page component
│   ├── components
│   │   └── ui
│   │       ├── button.tsx            # Button component
│   │       ├── form.tsx              # Form components
│   │       └── input.tsx             # Input component
│   └── services
│       └── auth.service.ts            # Authentication service for API requests
├── package.json                       # NPM configuration file
├── tsconfig.json                      # TypeScript configuration file
└── README.md                          # Project documentation
```

## Features

- **User Registration**: Users can create an account by providing their full name, email, password, and password confirmation.
- **User Login**: Users can log in using their email and password.
- **Responsive Design**: The application is designed to be responsive and user-friendly.

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd frontend_skrining_tbc
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage

To start the development server, run:
```
npm run dev
```
Open your browser and navigate to `http://localhost:3000` to view the application.

## API Endpoints

The frontend communicates with the following backend endpoints for authentication:

- **Register**: `POST /register`
- **Login**: `POST /login`

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.