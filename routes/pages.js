import express from "express";
const router = express.Router();

// Home page route
router.get("/", (req, res) => {
  res.render("pages/index", { title: "Home" });
});

// Habitats page route
router.get("/habitats", (req, res) => {
  // Access the global SQLite database instance
  const db = req.app.locals.db; // Query all records from habitats table
  db.all("SELECT * FROM habitats", [], (err, rows) => {
    if (err) {
      console.error("Database query error:", err.message);
      return res.status(500).send("Internal Server Error");
    }
    // Render the habitats view and pass the database rows as an array
    res.render("pages/habitats", {
      title: "Our Wildlife Habitats",
      habitats: rows,
    });
  });
});

export default router;
