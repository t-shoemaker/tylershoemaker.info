(function () {
  "use strict";

  // Load content for a single section
  async function loadSectionContent(sectionId, filePath) {
    const section = document.querySelector(`#${sectionId}`);

    try {
      const response = await fetch(filePath);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const html = await response.text();

      if (section) {
        section.innerHTML = html;
        section.classList.remove("loading");

        // If loading the publications HTML, populate from JSON
        if (sectionId === "publications") {
          await renderPublications();
        }
      }
    } catch (error) {
      console.error(`Error loading ${sectionId}:`, error);

      if (section) {
        section.innerHTML = "<p>Content could not be loaded.</p>";
        section.classList.remove("loading");
      }
    }
  }

  // Load all sections
  async function loadAllContent() {
    const sections = [
      { id: "about", file: "./includes/about.html" },
      { id: "research", file: "./includes/research.html" },
      { id: "publications", file: "./includes/publications.html" },
    ];

    await Promise.all(
      sections.map((section) => loadSectionContent(section.id, section.file)),
    );
  }

  // Update progress bar and active state based on what's visible
  function updateProgressBar() {
    const sections = document.querySelectorAll(".section");
    const progressItems = document.querySelectorAll(".progress-item");
    const progressIndicator = document.getElementById("progress-indicator");

    if (!progressIndicator || progressItems.length === 0) return;

    const windowHeight = window.innerHeight;
    let currentSection = "";
    let currentIndex = 0;

    // Find which section is most visible in viewport
    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;
      const sectionHeight = rect.height;

      // Calculate how much of the section is visible
      const visibleTop = Math.max(0, Math.min(windowHeight, sectionBottom));
      const visibleBottom = Math.max(
        0,
        Math.min(windowHeight, windowHeight - sectionTop),
      );
      const visibleHeight = Math.min(visibleTop, visibleBottom);

      // If more than 30% of section is visible, or it's in the top third of viewport
      if (
        visibleHeight / sectionHeight > 0.3 ||
        (sectionTop < windowHeight / 3 && sectionTop > -100)
      ) {
        currentSection = section.getAttribute("id");
        currentIndex = index;
      }
    });

    // Update active state for progress items
    progressItems.forEach((item, index) => {
      item.classList.remove("active");
      if (item.getAttribute("data-section") === currentSection) {
        item.classList.add("active");

        // Update progress indicator height
        const progressNav = document.getElementById("progress-nav");
        if (progressNav) {
          const progressNavHeight = progressNav.offsetHeight;
          const itemPosition =
            (index / (progressItems.length - 1)) * progressNavHeight;
          progressIndicator.style.height = `${itemPosition}px`;
        }
      }
    });
  }

  // Smooth scroll to section
  function handleProgressClick(e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // Update URL without reload
      history.pushState(null, null, targetId);
    }
  }

  // Setup progress navigation
  function setupProgressNav() {
    const progressLinks = document.querySelectorAll(".progress-item a");

    progressLinks.forEach((link) => {
      link.addEventListener("click", handleProgressClick);
    });
  }

  // Handle browser back/forward buttons
  function setupHistoryNavigation() {
    window.addEventListener("popstate", function () {
      const hash = window.location.hash || "#about";
      const section = document.querySelector(hash);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // Initialize everything
  async function init() {
    // Handle 404s by redirected bad URLs to "About"
    if (
      window.location.pathname !== "/" && 
      window.location.pathname !== "/index.html"
    ) {
      window.location.href = "/#about";
      return;
    }

    // Load all content first
    await loadAllContent();

    // Setup navigation
    setupProgressNav();
    setupHistoryNavigation();

    // Update progress bar on scroll
    window.addEventListener("scroll", updateProgressBar);

    // Set initial state
    updateProgressBar();

    // Handle direct hash links (e.g., tylershoemaker.info/#research)
    if (window.location.hash) {
      setTimeout(() => {
        const section = document.querySelector(window.location.hash);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 200);
    }
  }

  // Run when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

