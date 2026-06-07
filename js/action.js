function shareFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        "_blank"
    );
}

function openEmail() {
    const subject = encodeURIComponent(document.getElementById("contentModalTitle").innerText);
    const body = encodeURIComponent(`${window.location.href}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
}

function copyLink() {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied!");
}

async function shareArticle() {
    if (!navigator.share) {
        copyLink();
        return;
    }
    await navigator.share({title:
        document.getElementById("contentModalTitle").innerText,
        url: window.location.href
    });
}