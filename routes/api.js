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

// Filtering events
router.get("/events", (req, res) => {
  const db = req.app.locals.db;

  const year = req.query.year || 2026;
  const category = req.query.category || "All";

  let sql = "SELECT * FROM events WHERE year = ?";
  let params = [year];

  if (category !== "All") {
    sql += " AND category = ?";
    params.push(category);
  }

  sql += " ORDER BY event_date ASC";

  db.all(sql, params, (err, rows) => {
    if (err) {
      console.error("Database query error:", err.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(rows);
  });
});

// Export the router as default
export default router;
