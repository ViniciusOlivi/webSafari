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

// Contact page
router.get("/contact", (req, res) => {
  res.render("pages/contact", { title: "Contact Us", success: false });
});

// Contact form submission route (POST) - Saves to database
router.post("/contact", (req, res) => {
  const db = req.app.locals.db;

  const { name, email, subject, message } = req.body;

  // Insert the data into the contact_messages table
  const sql =
    "INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)";

  db.run(sql, [name, email, subject, message], (err) => {
    if (err) {
      console.error("Database insert error:", err.message);
      return res.status(500).send("Internal Server Error");
    }

    //how the success message
    res.render("pages/contact", { title: "Contact Us", success: true });
  });
});

router.get("/experiences", (req, res) => {
  const db = req.app.locals.db;
  db.all("SELECT * FROM experiences", [], (err, rows) => {
    if (err) {
      console.error("Database query error:", err.message);
      return res.status(500).send("Internal Server Error");
    }
    res.render("pages/experiences", {
      title: "Our Experiences",
      experiences: rows,
    });
  });
});

router.get("/activity", (req, res) => {
  res.render("pages/activity", { title: " InteractiveActivity" });
});

router.get("/faq", (req, res) => {
  res.render("pages/faq", { title: "FAQ" });
});

router.get("/events", (req, res) => {
  res.render("pages/events", { title: "Park Events" });
});

// Route to fetch event details by ID
router.get("/events/:id", (req, res) => {
  const db = req.app.locals.db;
  const eventId = req.params.id;

  const sql = "SELECT * FROM events WHERE event_id = ?";

  db.get(sql, [eventId], (err, event) => {
    if (err || !event) {
      return res.status(404).send("Event not found");
    }

    res.render("pages/event-detail", {
      title: event.title,
      event: event,
    });
  });
});

// Route habitats details
router.get("/habitats/:id", (req, res) => {
  const db = req.app.locals.db;
  const habitatId = req.params.id;

  db.get(
    "SELECT * FROM habitats WHERE habitat_id = ?",
    [habitatId],
    (err, habitat) => {
      if (err || !habitat) {
        return res.status(404).send("Habitat not found");
      }

      db.all(
        "SELECT * FROM experiences WHERE habitat_id = ?",
        [habitatId],
        (err, experiences) => {
          if (err) {
            return res.status(500).send("Database error");
          }

          // db
          res.render("pages/habitat-detail", {
            title: habitat.name,
            habitat: habitat,
            experiences: experiences,
          });
        },
      );
    },
  );
});

// Export the router as default
export default router;
