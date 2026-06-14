const searchInput = document.getElementById("searchInput");
const grid = document.getElementById("experiencesGrid");

searchInput.addEventListener("keyup", function () {
  let query = searchInput.value;

  fetch("/api/experiences?q=" + query)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      grid.innerHTML = ""; // Clear existing results
      if (data.length === 0) {
        grid.innerHTML = "<p>No experiences found.</p>";
      }

      for (let i = 0; i < data.length; i++) {
        let exp = data[i];

        let newCard = `<div class="experience-card">
                                <div class="exp-image-wrapper">
                                    <img src="/images/${exp.image}" alt="${exp.name}">
                                </div>
                                <div class="exp-content-wrapper">
                                    <h3>${exp.name}</h3>
                                    <p>${exp.description}</p>
                                </div>
                            </div>`;
        grid.innerHTML += newCard;
      }
    })
    .catch(function (error) {
      console.error("Error fetching experiences:", error);
    });
});
