(function () {
  "use strict";

  // Render publications from JSON data
  async function renderPublications() {
    try {
      const response = await fetch("./docs/publications.json");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

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

      // Render each publication
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
      console.error("Error rendering publications:", error);
      throw error; // Re-throw for caller to handle
    }
  }

  // Format publication year
  function formatYear(pub) {
    try {
      if (pub.status) return pub.status;
      if (pub.issued?.literal) return pub.issued.literal;
      return pub.issued?.["date-parts"]?.[0]?.[0] || "";
    } catch (error) {
      console.error("Error formatting year:", error);
      return "";
    }
  }

  // Format publication entry
  function formatPub(pub) {
    try {
      const title = pub.URL
        ? `<a href="${pub.URL}">${pub.title}</a>`
        : pub.title;

      const venue = pub["container-title"] || pub.publisher || "";
      const year = formatYear(pub);

      return `${title}. ${venue ? `${venue}` : ""}${year ? ` (${year})` : ""}`;
    } catch (error) {
      console.error("Error formatting publication:", error);
      return "<p>Publication could not be formatted.</p>";
    }
  }

  // Export for use in app.js
  window.renderPublications = renderPublications;
})();
