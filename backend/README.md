# Ecoomerce Project Backend

This is the backend component of the ecommerce project application. It provides the server-side functionality to handle CRUD operations.

## Table of Contents

- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose (MongoDB object modeling tool)
- JWT (JSON Web Tokens)

## Getting Started

Follow the steps below to get the backend up and running:

1. Clone the repository
2. Install the dependencies:
```bash
cd backend
npm install
```
3. Set up the environment variables:
- Create a .env file in the root directory of the project (backend).
- Add the following environment variables:
```
PORT=<port_number> # The port number on which the server will run
MONGODB_URI=<mongodb_uri> # The URI of your MongoDB database
```

4. Start the server:
```bash
npm start
```

The server will start running on the specified port, and you should see a message indicating that the server is listening for requests.

## Contributing
Contributions are welcome! If you find any issues or want to add new features, feel free to open an issue or submit a pull request.

When contributing, please follow these guidelines:

- Fork the repository and create a new branch for your feature or bug fix.
- Make your changes and test them thoroughly.
- Commit your changes with descriptive commit messages following best practices.
- Push your changes to your forked repository.
- Submit a pull request to the main branch of the original repository.
## License
This project is licensed under the MIT License.