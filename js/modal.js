const newsGrid =
    document.getElementById(
        "newsGrid"
    );

async function loadArticles() {
    const response =
        await fetch("https://raw.githubusercontent.com/brisklabs-pub/bagaas/refs/heads/main/data/articles.json");
    const articles =
        await response.json();

    articles.forEach((article) => {

        const card =
            document.createElement("div");

        card.className =
            "news-card";

        card.innerHTML = `
      <img
        src="${article.thumb}"
        alt="${article.title}"
      />

      <div class="news-body">

        <span class="news-date">
          ${article.datetime}
        </span>

        <h3>
          ${article.title}
        </h3>

        <p>
          ${article.content}
        </p>

        <button class="read-more">
          Read More →
        </button>

      </div>
    `;

        card.onclick = () =>
            openArticleModal(article);

        newsGrid.appendChild(card);

    });

}

function openArticleModal(article) {

    document.getElementById(
        "modalTitle"
    ).innerText =
        article.title;

    document.getElementById(
        "modalDate"
    ).innerText =
        article.datetime;

    document.getElementById(
        "modalContent"
    ).innerText =
        article.content;

    document.getElementById(
        "modalImage"
    ).src =
        article.thumb;

    document.getElementById(
        "articleModal"
    ).classList.add("show");
}

function closeArticleModal() {

    document.getElementById(
        "articleModal"
    ).classList.remove("show");
}

function copyLink() {

    navigator.clipboard.writeText(
        window.location.href
    );

    alert("Link copied!");
}

// Acticles
loadArticles();

//=====================================================================
let facilities = [];
let currentFacility = 0;

async function loadFacilities() {

  const response = await fetch("https://raw.githubusercontent.com/brisklabs-pub/bagaas/refs/heads/main/data/facilities.json");
  facilities = await response.json();

  const facilityGrid =
    document.getElementById(
      "facilityGrid"
    );

  facilities.forEach(
    (facility, index) => {

      const item =
        document.createElement("div");

      item.className =
        "facility-item";

      item.innerHTML = `
        <img
          src="${facility.image}"
          alt="${facility.title}"
        />

        <div class="facility-label">

          <h3>
            ${facility.title}
          </h3>

        </div>
      `;

      item.onclick = () =>
        openFacilityModal(index);

      facilityGrid.appendChild(item);
    }
  );
}

function openFacilityModal(index) {
  currentFacility = index;
  updateFacilityModal();
  document.getElementById(
    "facilityModal"
  ).classList.add("show");
}

function closeFacilityModal() {

  document.getElementById(
    "facilityModal"
  ).classList.remove("show");
}

function nextFacility() {
  currentFacility++;
  if (currentFacility >= facilities.length) {
    currentFacility = 0;
  }
  updateFacilityModal();
}

function prevFacility() {
  currentFacility--;
  if (currentFacility < 0) {
    currentFacility = facilities.length - 1;
  }
  updateFacilityModal();
}

function updateFacilityModal() {
  const facility = facilities[currentFacility];
  document.getElementById(
    "facilityModalImage"
  ).src =
    facility.image;

  document.getElementById(
    "facilityModalTitle"
  ).innerText =
    facility.title;
}

// Facilities
loadFacilities();