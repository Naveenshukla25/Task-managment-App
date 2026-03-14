# Todo App Backend

This is the backend part of the Todo App project. It is built using Node.js and Express.js and provides a RESTful API for managing todo items.

## Features

- Create, read, update, and delete (CRUD) todo items.
- User authentication middleware to protect routes.

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the backend directory:
   ```
   cd todo-app/backend
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Usage

To start the server, run:
```
npm start
```

The server will run on `http://localhost:3000` by default.

## API Endpoints

- **POST** `/create`: Create a new todo item.
- **GET** `/fetch`: Retrieve all todo items.
- **PUT** `/update/:id`: Update a todo item by ID.
- **DELETE** `/delete/:id`: Delete a todo item by ID.

## Contributing

Feel free to submit issues or pull requests for any improvements or bug fixes.

## License

This project is licensed under the MIT License.