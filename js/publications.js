async function renderPublications() {
  try {
    const response = await fetch("./docs/publications.json");
    const pubs = await response.json();

    const categories = {
      "article-journal": document.querySelector("#journal-articles .pub-list"),
      chapter: document.querySelector("#book-chapters .pub-list"),
      review: document.querySelector("#reviews .pub-list"),
      webpage: document.querySelector("#essays .pub-list"),
    };

    // Sort by year descending, forthcoming first
    const getYear = (pub) => {
      if (pub.status === "forthcoming" || pub.issued?.literal === "forthcoming")
        return Infinity;
      return pub.issued?.["date-parts"]?.[0]?.[0] || 0;
    };

    const sorted = [...pubs].sort((a, b) => getYear(b) - getYear(a));

    sorted.forEach((pub) => {
      const container = categories[pub.type];
      if (container) {
        const p = document.createElement("p");
        p.innerHTML = formatPub(pub);
        container.appendChild(p);
      }
    });

    // Hide empty categories
    Object.entries(categories).forEach(([type, container]) => {
      if (container && container.children.length === 0) {
        container.parentElement.style.display = "none";
      }
    });
  } catch (error) {
    console.error("Error loading publications:", error);
  }
}

function formatYear(pub) {
  if (pub.status) return pub.status;
  if (pub.issued?.literal) return pub.issued.literal;
  return pub.issued?.["date-parts"]?.[0]?.[0] || "";
}

function formatPub(pub) {
  const title = pub.URL
    ? `<a href="${pub.URL}" target="_blank">${pub.title}</a>`
    : pub.title;

  const venue = pub["container-title"] || pub.publisher || "";
  const year = formatYear(pub);

  return `${title}. ${venue ? `${venue}` : ""}${year ? ` (${year})` : ""}`;
}
