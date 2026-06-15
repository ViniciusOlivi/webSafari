document.addEventListener("DOMContentLoaded", function () {
  const yearFilter = document.getElementById("yearFilter");
  const categoryFilter = document.getElementById("categoryFilter");
  const eventsGrid = document.getElementById("eventsGrid");

  // Load events when the page loads
  function loadEvents() {
    const year = yearFilter.value;
    const category = categoryFilter.value;

    fetch("/api/events?year=" + year + "&category=" + category)
      .then(function (response) {
        return response.json();
      })
      .then(function (events) {
        eventsGrid.innerHTML = ""; // Clear existing events

        if (events.length === 0) {
          eventsGrid.innerHTML =
            "<p>No events found for the selected filters.</p>";
          return;
        }

        const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

        for (let i = 0; i < events.length; i++) {
          let ev = events[i];

          // Check if the event date is in the past
          let isPast = ev.event_date < today;
          let badgeHtml = "";

          if (isPast) {
            badgeHtml = '<span class="badge past-event">Event Passed</span>';
          }

          let card = `
                <div class="event-card ${isPast ? "past-event" : ""}">
                    <div class="event-img">
                        <img src="/images/${ev.image}" alt="${ev.title}">
                        </div>
                        <div class="event-info">
                        <span class="event-date">${ev.event_date}</span>
                        <h3>${ev.title}</h3>
                        <p class="event-category">${ev.category}</p>
                        <a href="/events/${ev.event_id}" class="btn btn-primary">View Details</a>
                    </div>
                    </div>
                `;
          eventsGrid.innerHTML += card;
        }
      })
      .catch(function (error) {
        console.error("Error fetching events:", error);
        eventsGrid.innerHTML =
          "<p>Error loading events. Please try again later.</p>";
      });
  }

  yearFilter.addEventListener("change", loadEvents);
  categoryFilter.addEventListener("change", loadEvents);

  if (eventsGrid) {
    loadEvents(); // Initial load of events
  }
});
