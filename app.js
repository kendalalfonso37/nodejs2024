const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");

// importando routes
const authRoutes = require("./routes/authRoutes");

// This will be our application entry. We'll setup our server here
const http = require("http");
const notFoundHandler = require("./middlewares/notFoundHandler");

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger("dev"));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Registrar rutas:
app.use("/auth", authRoutes);

// Middleware para manejar rutas inexistentes (404)
app.use(notFoundHandler);

const port = parseInt(process.env.PORT, 10) || 8000;
app.set("port", port);

const server = http.createServer(app);
server.listen(port, () =>
  console.log(`Servidor escuchando en el puerto ${port}`),
);

module.exports = app;
