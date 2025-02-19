<h1 align="center">Contract Management Application</h1>

## Project Overview

This Contract Management Application is built using Laravel (Backend) and React (Frontend). It allows users to create, update, delete and filter contracts associated with clients. The application provides an interactive interface to manage contracts efficiently.

## Features
- Client Management: Add, edit, delete clients.
- Contract Management: Create, update, delete contracts.
- Contract Filtering: Filter contracts by client name, contract name, start date, and duration.
- Seamless Navigation: React Router for smooth transitions between pages.
- API Integration: Laravel-powered backend APIs to manage data.

## Technologies Used

### Frontend (React.js)
- React
- React Router
- Axios for API calls
- Bootstrap for styling

### Backend (Laravel)
- Laravel
- Laravel API Routes
- MySQL Database
- Eloquent ORM
- CORS Support

## Installation & Setup

### 1. Clone the Repository:
```bash
git clone https://github.com/Arv4ix/contract-management-project.git
```
### 2. Navigate to the project directory:
```bash
cd contract-management-project
```
### 3. Install the dependencies:
```bash
composer install
npm install
```
### 4. Set up the environment file:
```bash
cp .env.example .env
php artisan key:generate
```
### 5. Run Migrations & Seed Database:
```bash
php artisan migrate --seed
```
### 6. Start the development server:
```bash
php artisan serve
npm run dev
```

## API Endpoints

### Clients API
- **GET /api/clients** Get all clients
- **POST /api/clients** Create a new client
- **GET /api/clients/{id}** Get client by ID
- **PUT /api/clients/{id}** Update a client
- **DELETE /api/clients/{id}** Delete a client

### Contracts API
- **GET /api/contracts** Get all contracts
- **POST /api/contracts** Create a new contract
- **GET /api/contracts/{id}** Get contract by ID
- **PUT /api/contracts/{id}** Update a contract
- **DELETE /api/contracts/{id}** Delete a contract

## Usage Guide

1. Add Clients: Navigate to Clients Page and add a new client.
2. Edit/Delete Clients: Use the Clients Page to edit or delete existing client.
3. Add Contracts: Navigate to Contracts Page, select a client, and create a new contract.
4. Edit/Delete Contracts: Use the Contracts Page ot Contract List Page to edit or delete existing contracts.
5. Filter Contracts: Use the filters to find contracts by client name, contract name, start date, or duration.

## Common Issues & Fixes

### 1. API Errors (Failed to Fetch Clients/Contracts)
Ensure Laravel is running:
```bash
php artisan serve
```
Check CORS configuration in cors.php (if needed, allow **http://localhost:3000** for frontend requests).
### 2. Database Issues
Run migrations again:
```bash
php artisan migrate:refresh --seed
```
### 3.React Not Fetching Data
Check if **.env** in the frontend has the correct API URL:
```
REACT_APP_API_URL=http://127.0.0.1:8000/api
```
Restart React:
```bash
npm start
```

## Future Enhancements
- Implement Authentication (Login & User Roles)
- Add Contract Expiry Notifications
- Enhance UI/UX Improvements

## License

This project is licensed under the MIT License.

## Contact

For any questions or suggestions, feel free to reach out!
- [Email: meijersarvis@gmail.com](meijersarvis@gmail.com)
- [GitHub: Arv4ix](https://github.com/Arv4ix)


