const path = require("path");
const express = require("express");
const { dbConnection } = require("./database/config");
const cors = require("cors");
require("dotenv").config();

// crear el servidor de express
const app = express();

// base de datos
dbConnection();

// cors
app.use(cors());

// Directorio publico
app.use(express.static("public"));

// lectura y parseo del body
app.use(express.json());

// Rutas
// autenticacion
app.use("/api/auth", require("./routes/auth"));
// CRUD de eventos
app.use("/api/events", require("./routes/events"));

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo ${process.env.PORT}`);
});
