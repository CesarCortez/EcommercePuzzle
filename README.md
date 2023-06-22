# Important Note

## Live Demo: https://ecommerce-puzzle-challenge.vercel.app/

To run this application you need to have a MongoDB database. You can create one for free on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or have one on your local machine .

Configure environment variables as described in the [Getting Started](#getting-started) sections of the frontend and backend README files.

You can find the README files in the frontend and backend directories.

If you want to run the application locally, you need to have Node.js installed on your machine.

### If you want to run FrontEnd and Backend at the same time, you can use the following command in the root directory of the project (No need to run FrontEnd and Backend separately, both services will start) :

```bash
npm run dev
```

### if you want to run the project separately, you can use the following commands:

- To run the frontend:

```bash
cd frontend
npm start
```

- To run the backend:

```bash
cd backend
npm start
```

or to run with nodemon:

```bash
cd backend
npm run dev
```

# Challenges and Solutions Covered

- Fully responsive design
- User authentication
  - Login
  - Register
  - Logout
  - Password encryption
- Listed products
  - Product details
- Search products
  - By title
  - By category
  - By price
  - By description
- List My Orders
- Checkout
  - Shipping address
  - Place order
- Payment and Delivery
- Cart
  - Add to cart
  - Remove from cart
  - Update cart
- Order reviews and comments
  - Add review
  - Add comment
- Cancel order

# Ecommerce Project Frontend

This is the frontend component of the ecommerce application. It provides the user interface to interact with the application.

## Table of Contents

- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Technologies

- React
- Redux
- React Router
- React Bootstrap
- TypeScript

## Getting Started

Follow the steps below to get the frontend up and running:

1. Clone the repository:

2. Install the dependencies:

```bash
cd frontend
npm install
```

3. Start the development server:

```bash
npm start

```

The application will open in your default browser at http://localhost:3000.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

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
