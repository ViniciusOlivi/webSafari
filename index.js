import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import sqlite3 from "sqlite3";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000; // (http://localhost:5000)

// Connection to SQLite database
const db = new sqlite3.Database("./wildlife.db", (err) => {
  if (err) {
    console.error("Error connecting to SQLite database:", err.message);
  } else {
    console.log(
      "Connected to SQLite database successfully (Verdoliva Eco Park).",
    );
  }
});

// Making the database accessible in the app (optional, but can be useful for routes)
app.locals.db = db;

// Confguration of the view engine (EJS) and views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Middlewares for parsing request bodies (for forms and JSON)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Importing routes
import pageRoutes from "./routes/pages.js";
import apiRoutes from "./routes/api.js";

// Activating routes
app.use("/", pageRoutes);
app.use("/api", apiRoutes);

// starting the server

app.listen(PORT, () => {
  console.log(`Server Verdoliva running on http://localhost:${PORT}`);
});
