/* ==========================================================================
   SUBKHAN MAULANA PORTFOLIO - JAVASCRIPT
   Clean interactions, Verified HTTPS Software Logos, Copy & CSV Exports
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initMobileNav();
  initToolsGrid();
  initFaqAccordion();
  initScrollWatchers();
  initContactForm();
});

/* ==========================================
   1. THEME TOGGLE & MOBILE NAV
   ========================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById("theme-toggle");
  const htmlTag = document.documentElement;

  const savedTheme = localStorage.getItem("theme") || "dark";
  htmlTag.setAttribute("data-theme", savedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const currentTheme = htmlTag.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      htmlTag.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
    });
  }
}

function initMobileNav() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("mobile-open");
    });

    document.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("mobile-open");
      });
    });
  }
}

/* ==========================================
   2. VERIFIED SOFTWARE LOGOS DISPLAY (EXACT 16 TOOLS)
   ========================================== */
const toolList = [
  {
    name: "Google Sheets",
    description: "Data entry, spreadsheets, and reporting.",
    slug: "googlesheets"
  },
  {
    name: "Microsoft Excel",
    description: "Data cleaning, formulas, and data analysis.",
    slug: "microsoftexcel"
  },
  {
    name: "Gmail",
    description: "Email and inbox management.",
    slug: "gmail"
  },
  {
    name: "Google Calendar",
    description: "Scheduling and appointment coordination.",
    slug: "googlecalendar"
  },
  {
    name: "Notion",
    description: "Documentation, knowledge bases, and SOPs.",
    slug: "notion"
  },
  {
    name: "Trello",
    description: "Task tracking and project management.",
    slug: "trello"
  },
  {
    name: "Slack",
    description: "Team communication and collaboration.",
    slug: "slack"
  },
  {
    name: "Canva",
    description: "Presentations and visual content creation.",
    slug: "canva"
  },
  {
    name: "Zapier",
    description: "Workflow automation and app integrations.",
    slug: "zapier"
  },
  {
    name: "ChatGPT",
    description: "AI-assisted writing, research, and productivity.",
    slug: "openai"
  },
  {
    name: "Microsoft Power BI",
    description: "Interactive dashboards and business reporting.",
    slug: "powerbi"
  },
  {
    name: "Python",
    description: "Data processing, scripting, and task automation.",
    slug: "python"
  },
  {
    name: "n8n",
    description: "Workflow automation and system integrations.",
    slug: "n8n"
  },
  {
    name: "SQL",
    description: "Database queries, data extraction, and analysis.",
    slug: "postgresql"
  },
  {
    name: "QuickBooks Online",
    description: "Bookkeeping, expense tracking, and financial reporting.",
    slug: "quickbooks"
  },
  {
    name: "Xero",
    description: "Cloud accounting, bank reconciliation, and financial reporting.",
    slug: "xero"
  }
];

function initToolsGrid() {
  const container = document.getElementById("tools-grid");
  if (!container) return;

  container.innerHTML = "";

  toolList.forEach(tool => {
    const tile = document.createElement("div");
    tile.className = "tool-tile surface-card";

    const primaryUrl = `https://cdn.simpleicons.org/${tool.slug}`;
    const fallbackUrl = `https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/${tool.slug}.svg`;

    tile.innerHTML = `
      <img src="${primaryUrl}" alt="${tool.name} logo" class="tool-logo-img" id="img-${tool.slug}">
      <span class="tool-label">${tool.name}</span>
      <p class="tool-desc">${tool.description}</p>
    `;

    container.appendChild(tile);

    const imgElem = tile.querySelector(`#img-${tool.slug}`);
    let hasTriedFallback = false;

    imgElem.onerror = () => {
      if (!hasTriedFallback) {
        hasTriedFallback = true;
        imgElem.src = fallbackUrl;
      } else {
        const initial = tool.name.charAt(0).toUpperCase();
        imgElem.outerHTML = `<div class="fallback-tile-box">${initial}</div>`;
      }
    };
  });
}

/* ==========================================
   3. UTILITY ACTIONS (COPY & CSV DOWNLOAD)
   ========================================== */
function copyText(elementId, feedbackId) {
  const textElem = document.getElementById(elementId);
  const fbElem = document.getElementById(feedbackId);
  if (!textElem) return;

  const cleanText = textElem.innerText.replace(/^"|"$/g, '');
  navigator.clipboard.writeText(cleanText).then(() => {
    if (fbElem) {
      fbElem.textContent = "Copied!";
      setTimeout(() => { fbElem.textContent = ""; }, 3000);
    }
  });
}

function downloadSampleCSV() {
  const csvContent = [
    ["ID", "Category", "Vendor", "Amount", "Audit Status"].join(","),
    ["REC-101", "SaaS Tool", "Google Workspace", "$150.00", "Verified"].join(","),
    ["REC-102", "Freight", "FedEx Freight", "$84.50", "Verified"].join(","),
    ["REC-103", "Travel", "Hyatt Hotels", "$450.00", "Pending"].join(","),
    ["REC-104", "SaaS Tool", "Zapier Inc", "$49.00", "Verified"].join(",")
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("href", url);
  a.setAttribute("download", "Sample_Operational_Expenses.csv");
  a.click();
  window.URL.revokeObjectURL(url);
}

/* ==========================================
   4. ACCORDION & SCROLL OBSERVERS
   ========================================== */
function initFaqAccordion() {
  document.querySelectorAll(".faq-item").forEach(item => {
    const q = item.querySelector(".faq-question");
    if (q) {
      q.addEventListener("click", () => {
        const isOpen = item.classList.contains("open");
        document.querySelectorAll(".faq-item").forEach(i => i.classList.remove("open"));
        if (!isOpen) item.classList.add("open");
      });
    }
  });
}

function initScrollWatchers() {
  const floatingHome = document.getElementById("floating-home");
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    if (floatingHome) {
      if (window.scrollY > 400) floatingHome.classList.add("visible");
      else floatingHome.classList.remove("visible");
    }

    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

/* ==========================================
   5. CONTACT FORM & MAILTO ACTION
   ========================================== */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("contact-name").value;
    const email = document.getElementById("contact-email").value;
    const service = document.getElementById("service-needed").value;
    const message = document.getElementById("contact-message").value;

    const subject = encodeURIComponent(`Service Inquiry: ${service} - ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nService: ${service}\n\nMessage:\n${message}`);

    window.location.href = `mailto:sangsubkhan@gmail.com?subject=${subject}&body=${body}`;

    const feedback = document.getElementById("form-feedback");
    if (feedback) {
      feedback.className = "form-feedback success";
      feedback.textContent = "Opening your default email client to send inquiry...";
    }
  });
}
