# Customer Support Ticket System

A full-stack application built with Laravel backend API and React frontend for managing customer support tickets efficiently.

![Ticket System Logo](path/to/logo.png) <!-- You can add your logo image here -->

## Project Overview

This application allows support agents to manage customer inquiries by creating, viewing, updating, and deleting support tickets with a responsive, user-friendly interface.

## Features

- **Ticket Management:**
  - Create new support tickets with customer name, issue description, and priority
  - View and filter tickets by status (open/closed)
  - Search tickets by customer name or issue description
  - Sort tickets by various attributes (priority, created date, etc.)
  - Update existing tickets including changing status
  - Delete tickets with confirmation

- **User Interface:**
  - Color-coded priorities for better visualization
  - Responsive design works on both desktop and mobile
  - Intuitive navigation and user-friendly controls

## Technologies Used

### Backend
- Laravel
- MySQL
- PHP 8.4

### Frontend
- React.js
- Axios for API communication
- React Router for navigation
- Tailwind CSS for styling

## Prerequisites

Before you begin, ensure you have the following installed:
- PHP 8.0 or higher
- Composer
- Node.js 14.x or higher
- npm or yarn
- MySQL server
- Git

## Setup Instructions

### Clone Repository

```bash
git clone https://github.com/AnujaLd/Ticket-SystemV1.git
cd Ticket-SystemV1
```

### Backend Setup (Laravel)

1. Navigate to the backend directory:
```bash
cd ticket-system-backend
```

2. Start the Apache and MySQL server in XAMPP

3. Install PHP dependencies:
```bash
composer install
```

4. Create a copy of the environment file:
```bash
cp .env.example .env
```

5. Configure your database connection in the `.env` file:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ticket_system
DB_USERNAME=root
DB_PASSWORD=your_password
```

6. Generate application key:
```bash
php artisan key:generate
```

7. Run database migrations and seed data:
```bash
php artisan migrate --seed
```

8. Configure CORS to allow requests from React frontend:
```php
// In config/cors.php
'allowed_origins' => ['http://localhost:5173', 'http://localhost:3000'],
```

9. Start the Laravel development server:
```bash
php artisan serve
```

The backend will now be running at http://localhost:8000

### Frontend Setup (React)

1. Open a new terminal and navigate to the frontend directory:
```bash
cd ticket-system-frontend
```

2. Install JavaScript dependencies:
```bash
npm install
```

3. Verify the API URL in `src/services/api.js`:
```javascript
const API_URL = 'http://localhost:8000/api';
```

4. Start the React development server:
```bash
npm run dev
```

The frontend will now be running at http://localhost:5173

## Using the Application

1. Open your browser and navigate to http://localhost:5173
2. You'll see a list of existing tickets (if any)
3. Use the filters at the top to show open or closed tickets
4. Use the search box to find tickets by customer name or issue description
5. Click on "Create Ticket" in the navigation to add a new ticket
6. Click "Edit" on any ticket to update its details or change its status
7. Click "Delete" to remove a ticket (with confirmation)

## Screenshots

<!-- Add screenshots of your application here -->
![Dashboard View](path/to/dashboard-screenshot.png)
![Create Ticket Form](path/to/create-ticket-screenshot.png)
![Ticket Details](path/to/ticket-details-screenshot.png)

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /api/tickets | Retrieve all tickets |
| GET    | /api/tickets/{id} | Retrieve a specific ticket |
| POST   | /api/tickets | Create a new ticket |
| PUT    | /api/tickets/{id} | Update an existing ticket |
| DELETE | /api/tickets/{id} | Delete a ticket |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

[MIT License](LICENSE) <!-- You can add your license information here -->

## Contact

Anuja - [GitHub Profile](https://github.com/AnujaLd)

Project Link: [https://github.com/AnujaLd/Ticket-SystemV1](https://github.com/AnujaLd/Ticket-SystemV1)
