
/* =========================================
   GLOBALS
========================================= */
const newsGrid = document.getElementById("newsGrid");
const announcementGrid = document.getElementById("announcementGrid");

let allArticles = [];
let allAnnouncements = [];

/* =========================================
   UPDATE URL
========================================= */
function updateUrl(url) {
  window.location.hash = url;
}

/* =========================================
   ARTICLES
========================================= */
async function loadArticles() {
  const response =
    await fetch(
      "https://raw.githubusercontent.com/brisklabs-pub/bagaas/refs/heads/main/data/articles.json"
    );

  const articles = await response.json();
  allArticles = articles;
  articles.forEach((article) => {
    const card = document.createElement("div");
    card.className = "news-card";
    card.id = article.article_id;
    card.innerHTML = `
      <img src="${article.thumbnail}" alt="${article.title}"/>
      <div class="news-body">
        <span class="news-date">${article.created_at}</span>
        <h3>${article.title}</h3>
        <p>${article.content}</p>
        <button class="read-more">
          Read More →
        </button>
      </div>
    `;
    card.onclick = () => openContentModal(article);
    newsGrid.appendChild(card);
  });
}

/* =========================================
   ANNOUNCEMENTS
========================================= */

async function loadAnnouncements() {
  try {
    const response =
      await fetch(
        "https://raw.githubusercontent.com/brisklabs-pub/bagaas/refs/heads/main/data/announce.json"
      );

    const announcements = await response.json();
    allAnnouncements = announcements;
    announcementGrid.innerHTML = "";
    announcements.forEach(
      (announcement, index) => {
        const card = document.createElement("div");
        card.id = announcement.announcement_id;
        /* FEATURED */
        if (announcement.type ==="important" && index === 0) {
          card.className ="announcement-card featured";
          card.innerHTML = `
            <div class="announcement-badge">
              IMPORTANT
            </div>
            <div class="announcement-content">
              <span class="announcement-date">${announcement.created_at}</span>
              <h3>${announcement.title}</h3>
              <p>${announcement.content}</p>
              <a href="#">
                Read More →
              </a>
            </div>`;

        } else {

          card.className = "announcement-card";
          card.innerHTML = `
            <div class="announcement-icon">
              ${announcement.type === "important"? "📢": "📌"}
            </div>
            <div class="announcement-content">
              <span class="announcement-date">${announcement.created_at}</span>
              <h3>${announcement.title}</h3>
              <p>${announcement.content}</p>
            </div>
          `;
        }
        card.onclick = () =>
          openContentModal({
            ...announcement,
            category:"Announcement"
          });
        announcementGrid.appendChild(card);
      });

  } catch (error) {
    console.error("Failed loading announcements:", error);

    announcementGrid.innerHTML = `
      <p class="empty-content">
        Failed to load announcements.
      </p>
    `;
  }
}

/* =========================================
   OPEN MODAL
========================================= */

function openContentModal(data,pushUrl = true) {
  const modal = document.getElementById("contentModal");
  const container = document.querySelector(".content-modal-container");
  const image = document.getElementById("contentModalImage");
  /* CATEGORY */
  document.getElementById("contentModalCategory").innerText = data.category || "";
  /* DATE */
  document.getElementById("contentModalDate").innerText = data.created_at || "";
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

  /* URL */
  if (pushUrl) {
    if (data.article_id) {
      updateUrl("/article/" + data.article_id);
    }
    if (data.announcement_id) {
      updateUrl("/announcement/" + data.announcement_id);
    }
  }
  modal.classList.add("show");
  document.body.style.overflow = "hidden";
}

/* =========================================
   CLOSE MODAL
========================================= */

function closeContentModal() {
  document.getElementById("contentModal").classList.remove("show");
  document.body.style.overflow = "auto";
  updateUrl("");
}

/* =========================================
   OPEN FROM URL
========================================= */

function openContentFromUrl() {
  const hash = window.location.hash;
  /* ARTICLE */
  if (hash.startsWith("#/article/")) {
    const id = hash.split("#/article/")[1];
    const article = allArticles.find((a) => a.article_id === id );
    if (article) {
      openContentModal(article, false);
    }
  }

  /* ANNOUNCEMENT */
  if (hash.startsWith("#/announcement/")) {
    const id = hash.split("#/announcement/")[1];
    const announcement = allAnnouncements.find((a) => a.announcement_id === id);
    if (announcement) {
      openContentModal(
        {
          ...announcement,
          category:
            "Announcement"
        },
        false
      );
    }
  }
}

/* =========================================
   HASH CHANGE
========================================= */

window.addEventListener("hashchange", () => {
    const hash = window.location.hash;
    if (!hash) {
      document.getElementById("contentModal").classList.remove("show");
      document.body.style.overflow = "auto";
      return;
    }
    openContentFromUrl();
  }
);

/* =========================================
   COPY LINK
========================================= */

function copyLink() {
  navigator.clipboard.writeText(
    window.location.href
  );
  alert("Link copied!");
}

/* =========================================
   INIT
========================================= */
Promise.all([
  loadArticles(),
  loadAnnouncements()
]).then(() => {
  openContentFromUrl();
});

/* =========================================
 FACILITIES
========================================= */
let facilities = [];
let currentFacility = 0;

async function loadFacilities() {
  const response = await fetch("https://raw.githubusercontent.com/brisklabs-pub/bagaas/refs/heads/main/data/facilities.json");
  facilities = await response.json();
  const facilityGrid = document.getElementById("facilityGrid");

  facilities.forEach(
    (facility, index) => {
      const item = document.createElement("div");
      item.className = "facility-item";
      item.innerHTML = `
        <img src="${facility.image}" alt="${facility.title}"/>
        <div class="facility-label">
          <h3>${facility.title}</h3>
        </div>`;
      item.onclick = () => openFacilityModal(index);
      facilityGrid.appendChild(item);
    }
  );
}
function openFacilityModal(index) {
  currentFacility = index;
  updateFacilityModal();
  document.getElementById("facilityModal").classList.add("show");
}
function closeFacilityModal() {
  document.getElementById("facilityModal").classList.remove("show");
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
  document.getElementById("facilityModalImage").src = facility.image;
  document.getElementById("facilityModalTitle").innerText = facility.title;
}

// Facilities
loadFacilities();