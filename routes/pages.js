import express from "express";
const router = express.Router();

// Define the root home route
router.get("/", (req, res) => {
  // Render index.ejs from inside your views/pages directory
  res.render("pages/index", { title: "Home" });
});

// Export the router as default
export default router;
