Ticket System
A Customer Support Ticket System built with Laravel backend API and React frontend.

Project Overview
This application allows support agents to manage customer inquiries by creating, viewing, updating, and deleting support tickets with a responsive, user-friendly interface.

Features
Create new support tickets with customer name, issue description, and priority
View and filter tickets by status (open/closed)
Search tickets by customer name or issue description
Sort tickets by various attributes (priority, created date, etc.)
Update existing tickets including changing status
Delete tickets with confirmation
Color-coded priorities for better visualization
Responsive design works on both desktop and mobile


Technologies Used
Backend
Laravel 10.x
MySQL
PHP 8.4

Frontend
React.js
Axios for API communication
React Router for navigation
Tailwind CSS for styling

Prerequisites
PHP 8.0 or higher
Composer
Node.js 14.x or higher
npm or yarn
MySQL server
Git

Setup Instructions

Clone Repository


https://github.com/AnujaLd/Ticket-SystemV1

cd Ticket-SystemV1

Backend Setup (Laravel)

Navigate to the backend directory:

cd ticket-system-backend

Start the apache and MYSQL server in the XAMPP

Install PHP dependencies:
composer install

Create a copy of the environment file:
cp .env.example .env

Configure your database connection in the .env file:
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ticket_system
DB_USERNAME=root
DB_PASSWORD=your_password

Generate application key:
php artisan key:generate

Run database migrations and seed data:
php artisan migrate --seed

Configure CORS to allow requests from React frontend:
PHP
// In config/cors.php
'allowed_origins' => ['http://localhost:5173', 'http://localhost:3000'],
Start the Laravel development server:
bash
php artisan serve

The backend will now be running at http://localhost:8000

Frontend Setup (React)
Open a new terminal and navigate to the frontend directory:
cd ticket-system-frontend

Install JavaScript dependencies:
npm install

Verify the API URL in src/services/api.js:
JavaScript
const API_URL = 'http://localhost:8000/api';

Start the React development server:
npm run dev

The frontend will now be running at http://localhost:5173

Using the Application
Open your browser and navigate to http://localhost:5173
You'll see a list of existing tickets (if any)
Use the filters at the top to show open or closed tickets
Use the search box to find tickets by customer name or issue description
Click on "Create Ticket" in the navigation to add a new ticket
Click "Edit" on any ticket to update its details or change its status
Click "Delete" to remove a ticket (with confirmation)
