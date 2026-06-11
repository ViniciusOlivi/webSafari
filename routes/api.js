import express from "express";
const router = express.Router();

// Placeholder route for your future AJAX search features
router.get("/search", (req, res) => {
  res.json({ message: "Search API is working" });
});

// Export the router as default
export default router;
