const newsGrid = document.getElementById("newsGrid");

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
        src="${article.thumbnail}"
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
      openContentModal(article);

    newsGrid.appendChild(card);

  });
}

function copyLink() {
  navigator.clipboard.writeText(window.location.href);
  alert("Link copied!");
}

// Acticles
loadArticles();


/* =========================================
 ANNOUNCEMENTS
========================================= */

const announcementGrid = document.getElementById("announcementGrid");
async function loadAnnouncements() {
  try {

    const response =
      await fetch(
        "https://raw.githubusercontent.com/brisklabs-pub/bagaas/refs/heads/main/data/announce.json"
      );

    const announcements =
      await response.json();

    announcementGrid.innerHTML = "";

    announcements.forEach(
      (announcement, index) => {

        const card =
          document.createElement("div");

        /* FEATURED */
        if (
          announcement.type === "important"
          && index === 0
        ) {

          card.className =
            "announcement-card featured";

          card.innerHTML = `

                    <div class="announcement-badge">
                        IMPORTANT
                    </div>

                    <div class="announcement-content">

                        <span class="announcement-date">
                            ${announcement.date}
                        </span>

                        <h3>
                            ${announcement.title}
                        </h3>

                        <p>
                            ${announcement.content}
                        </p>

                        <a href="#">
                            Read More →
                        </a>

                    </div>
                `;

        } else {

          card.className =
            "announcement-card";

          card.innerHTML = `

                    <div class="announcement-icon">

                        ${announcement.type === "important"
              ? "📢"
              : "📌"
            }

                    </div>

                    <div class="announcement-content">

                        <span class="announcement-date">
                            ${announcement.date}
                        </span>

                        <h3>
                            ${announcement.title}
                        </h3>

                        <p>
                            ${announcement.content}
                        </p>

                    </div>
                `;
        }

        /* OPEN MODAL */
        card.onclick = () => {

          openContentModal({

            category:
              "Announcement",

            title:
              announcement.title,

            date:
              announcement.date,

            content:
              announcement.content,

            image:
              announcement.image || ""

          });
        };

        announcementGrid.appendChild(card);

      });

  } catch (error) {

    console.error(
      "Failed loading announcements:",
      error
    );

    announcementGrid.innerHTML = `
            <p class="empty-content">
                Failed to load announcements.
            </p>
        `;
  }
}

/* LOAD */
loadAnnouncements();

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


/* =========================================
   OPEN CONTENT MODAL
========================================= */
function openContentModal(data) {
  const modal = document.getElementById("contentModal");
  const container = document.querySelector(".content-modal-container");
  const image = document.getElementById("contentModalImage");

  /* CATEGORY */
  document.getElementById("contentModalCategory").innerText = data.category || "";
  /* DATE */
  document.getElementById("contentModalDate").innerText = data.date || "";
  /* TITLE */
  document.getElementById("contentModalTitle").innerText = data.title || "";
  /* CONTENT */
  document.getElementById("contentModalContent").innerText = data.content || "";

  /* IMAGE */
  const imageSource =
    data.thumbnail ||
    data.image ||
    "";

  if (imageSource) {
    image.src = imageSource;
    container.classList.remove("no-image");
  } else {
    image.src = "";
    container.classList.add("no-image");
  }

  /* OPEN */
  modal.classList.add("show");
  document.body.style.overflow = "hidden";
}

/* =========================================
   CLOSE
========================================= */

function closeContentModal() {
  document
    .getElementById("contentModal")
    .classList.remove("show");
  document.body.style.overflow = "auto";
}

/* =========================================
   COPY LINK
========================================= */

function copyLink() {
  navigator.clipboard.writeText(window.location.href);
  alert("Link copied!");
}
