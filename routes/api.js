import express from "express";
const router = express.Router();

// Placeholder route for your future AJAX search features
router.get("/search", (req, res) => {
  res.json({ message: "Search API is working" });
});

// route to fetch experiences based on search query
router.get("/experiences", (req, res) => {
  const db = req.app.locals.db;
  const searchTerm = req.query.q || "";

  // Basic SQL query to search experiences by name using LIKE operator
  const sql = "SELECT * FROM experiences WHERE name LIKE '%' || ? || '%'";

  db.all(sql, [searchTerm], (err, rows) => {
    if (err) {
      console.log("Erro na busca:", err);
      res.status(500).json({ error: "Database error" });
    } else {
      res.json(rows);
    }
  });
});

// Export the router as default
export default router;
