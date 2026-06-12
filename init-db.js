import sqlite3 from "sqlite3";
import fs from "fs";

// Connect to the database
const db = new sqlite3.Database("./wildlife.db");

// Read the SQL file
const sqlScript = fs.readFileSync("./database/setup.sql", "utf8");

db.exec(sqlScript, (err) => {
  if (err) {
    console.error("Error creating tables:", err.message);
  } else {
    console.log("SUCCESS: Database tables created and populated perfectly!");
  }
  db.close();
});
