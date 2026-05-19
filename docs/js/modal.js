const newsGrid =
  document.getElementById(
    "newsGrid"
  );

async function loadArticles() {

  const response =
    await fetch("../articles/articles.json");

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

loadArticles();