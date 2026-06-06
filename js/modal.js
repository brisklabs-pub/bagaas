// =========================================
//   CONFIG
// =========================================

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );
}

const PR_URL = "twqcnzdwoddataqwvfzk";
const PR_KEY = "sb_publishable_M-4aR3fue1pliD0bnU2WGw_OzO3dwU3";

/* =========================================
  FETCH
========================================= */

async function fetchTable(table, { select = "*", filters = "", order = "", limit = "" } = {}) {
  try {
    let url = `https://${PR_URL}.supabase.co/rest/v1/${table}?select=${select}`;
    if (filters) { url += `&${filters}`; }
    if (order) { url += `&order=${order}`; }
    if (limit) { url += `&limit=${limit}`; }
    const response = await fetch(url, {
      headers: { apikey: PR_KEY, Authorization: `Bearer ${PR_KEY}` },
    });
    if (!response.ok) {
      throw new Error(`Supabase Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed fetching ${table}:`, error);
    return [];
  }
}

// =========================================
// GLOBALS
// =========================================
const heroSlides = document.getElementById("heroSlides");
const websiteTitle = document.getElementById("websiteTitle");
const websiteSubtitle = document.getElementById("websiteSubtitle");

const newsGrid = document.getElementById("newsGrid");
const announcementGrid = document.getElementById("announcementGrid");
const facilityGrid = document.getElementById("facilityGrid");

let allArticles = [];
let allAnnouncements = [];

let facilities = [];
let currentFacility = 0;

// =========================================
// UPDATE URL
// =========================================
function updateUrl(url) {
  window.location.hash = url;
}

// =========================================
//  HASH CHANGE
// =========================================
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

// =========================================
//  WEBSITE INFO
// =========================================
async function loadWebsite() {
  try {
    const website = await fetchTable("website", {order: "created_at.desc"} );
    websiteTitle.textContent = website[0]?.title || "Building Future Leaders Through Quality Education";
    websiteSubtitle.textContent = website[0]?.sub_title || "Empowering students with innovation, leadership, and academic excellence for a brighter tomorrow.";
    populateHeroImages( website[0]?.hero_images || []);
    console.log("Loaded website data:", website);
  } catch (error) {
    console.error("Failed loading website data:", error);
  }
}

function populateHeroImages(images) {
  heroSlides.innerHTML = "";
  const delay = 5; // seconds per slide
  const totalDuration = images.length * delay;
  images.forEach((image, index) => {
    const slide = document.createElement("div");
    slide.className = "hero-slide";
    slide.style.backgroundImage = `
    linear-gradient(rgba(15,23,42,.45), rgba(15,23,42,.45)), url("${image.url}")`;
    slide.style.animation = `slideShow ${totalDuration}s infinite`;
    slide.style.animationDelay = `${index * delay}s`;
    heroSlides.appendChild(slide);
  });
}

// =========================================
//  ANNOUNCEMENTS
// =========================================
async function loadAnnouncements() {
  try {
    const announcements = await fetchTable("announcements", {order: "created_at.desc"} );
    allAnnouncements = announcements;
    announcementGrid.innerHTML = "";
    announcements.forEach(
      (announcement, index) => {
        const card = document.createElement("div");
        card.id = announcement.announcement_id;
        // FEATURED
        if (announcement.category === "important" && index === 0) {
          card.className = "announcement-card featured";
          card.innerHTML = `
            <div class="announcement-badge">
              IMPORTANT
            </div>
            <div class="announcement-content">
              <span class="announcement-date">${formatDate(announcement.created_at)}</span>
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
              ${announcement.category === "important" ? "📢" : "📌"}
            </div>
            <div class="announcement-content">
              <span class="announcement-date">${formatDate(announcement.created_at)}</span>
              <h3>${announcement.title}</h3>
              <p>${announcement.content}</p>
            </div>
          `;
        }
        card.onclick = () =>
          openContentModal({
            ...announcement,
            category: "Announcement"
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

// =========================================
//  ARTICLES
// =========================================
async function loadArticles() {
  const articles = await fetchTable("articles", {order: "created_at.desc"} );
  allArticles = articles;
  console.log("Loaded articles:", articles);
  articles.forEach((article) => {
    const card = document.createElement("div");
    card.className = "news-card";
    card.id = article.article_id;
    card.innerHTML = `
      <img src="${article.thumbnail}" alt="${article.title}"/>
      <div class="news-body">
        <span class="news-date">${formatDate(article.created_at)}</span>
        <h3>${article.title}</h3>
        <p>${article.content}</p>
        <button class="read-more">
          Read More →
        </button>
      </div>`;
    card.onclick = () => {
      openContentModal({
            ...article,
            category:"Article"
          });
    };
    newsGrid.appendChild(card);
  });
}

// =========================================
//  FACILITIES
// =========================================
async function loadFacilities() {
  facilities = await fetchTable("facilities", {order: "created_at.desc"} );
  console.log("Loaded facilities:", facilities);
  facilities.forEach(
    (facility, index) => {
      const item = document.createElement("div");
      item.className = "facility-item";
      item.innerHTML = `
        <img src="${facility.thumbnail}" alt="${facility.name}"/>
        <div class="facility-label">
          <h3>${facility.name}</h3>
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
  document.getElementById("facilityModalImage").src = facility.thumbnail;
  document.getElementById("facilityModalTitle").innerText = facility.name;
}

// =========================================
//  OPEN MODAL
// =========================================
function openContentModal(data, pushUrl = true) {
  const modal = document.getElementById("contentModal");
  const container = document.querySelector(".content-modal-container");
  const image = document.getElementById("contentModalImage");
  // CATEGORY
  document.getElementById("contentModalCategory").innerText = data.category || "";
  // DATE
  document.getElementById("contentModalDate").innerText = formatDate(data.created_at) || "";
  // TITLE
  document.getElementById("contentModalTitle").innerText = data.title || "";
  // CONTENT
  document.getElementById("contentModalContent").innerText = data.content || "";
  // IMAGE
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

  // URL
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

// =========================================
//  CLOSE MODAL
// =========================================
function closeContentModal() {
  document.getElementById("contentModal").classList.remove("show");
  document.body.style.overflow = "auto";
  updateUrl("");
}

// =========================================
//  OPEN FROM URL
// =========================================
function openContentFromUrl() {
  const hash = window.location.hash;
  /* ARTICLE */
  if (hash.startsWith("#/article/")) {
    const id = hash.split("#/article/")[1];
    const article = allArticles.find((a) => a.article_id === id);
    if (article) {
      openContentModal(    {
          ...article,
          category:"Article"
        }, false);
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
          category: "Announcement"
        },
        false
      );
    }
  }
}

// =========================================
//  COPY LINK
// =========================================
function copyLink() {
  navigator.clipboard.writeText(
    window.location.href
  );
  alert("Link copied!");
}

// LOADER
function hideLoader() {
  const loader = document.getElementById("pageLoader");
  loader.classList.add("hide");
  setTimeout(() => {
    loader.remove();
  }, 5000);
}

// =========================================
//  INIT
// =========================================
Promise.all([
  loadWebsite(),
  loadArticles(),
  loadAnnouncements(),
  loadFacilities(),
])
  .then(() => {
    openContentFromUrl();
    hideLoader();
  })
  .catch(err => {
    console.error(err);
    hideLoader();
  });