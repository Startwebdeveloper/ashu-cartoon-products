/**
 * Ashu Cartoon Products - Frontend Application Logic
 * 
 * To add a new product, simply add a new object to the `products` array below.
 * Make sure the image path matches a file in the /images/ folder, or is a valid URL.
 */

// ==========================================================================
// 1. Product Database (Edit this array to manage your products)
// ==========================================================================
const products = [
  {
    name: "Kitchen Play Set Toy",
    image: "images/product1.jpeg",
    description: "Cable World Plastic 3 in 1 Portable Pretend Food Party Role Cooking Kitchen Play Set Toy for Boys and Girls.",
    price: "₹499",
    category: "Toy",
    badge: "Best Seller",
    link: "https://link.amazon/B02qHiVJB" // Replace with your actual Amazon Affiliate link
  },
  {
    name: "Skillmatics Doctor Set for Kids – 35+ Piece Interactive Pretend Play Kit",
    image: "images/product2.png",
    description: "Pretend Play Doctor set for kids interactive tools that feel real 35+ piece complete play set ",
    price: "₹1,279",
    category: "Kids",
    badge: "Popular",
    link: "https://link.amazon/B06rBdczY" // Replace with your actual Amazon Affiliate link
  },
  {
    name: "Rocket Toy for Kids",
    image: "images/product4.png",
    description: "Lefan Air Powered Flying Rocket Toy for Kids, Foam Rocket Launcher Set with Foot Pump, Indoor & Outdoor Garden Game for Boys & Girls Age 3 4 5 6 7 8+ Flies Up to 150 ft No Batteries Required ",
    price: "₹284",
    category: "Kids",
    badge: "Popular",
    link: "https://link.amazon/B00cSUjgI" // Replace with your actual Amazon Affiliate link
  },
  {
    name: "Comming soon",
    image: "images/product3.png",
    description: "This product is coming soon. Stay tuned for more details.",
    price: "Coming Soon",
    category: "Coming Soon",
    badge: "Coming Soon",
    link: "#" // Replace with your actual Amazon Affiliate link
  }
];

// ==========================================================================
// 2. State Management & DOM Selectors
// ==========================================================================
let currentCategory = "All";
let searchQuery = "";

// DOM Elements
const productGrid = document.getElementById("product-grid");
const searchInput = document.getElementById("search-input");
const categoryTabs = document.querySelectorAll(".category-tab");
const hamburgerBtn = document.getElementById("hamburger-btn");
const mobileNavDrawer = document.getElementById("mobile-nav-drawer");
const mobileNavOverlay = document.getElementById("mobile-nav-overlay");
const mobileLinks = document.querySelectorAll(".mobile-nav-drawer .nav-link");

// ==========================================================================
// 3. Helper Functions
// ==========================================================================
/**
 * Safely escapes HTML characters to prevent XSS.
 */
function escapeHTML(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ==========================================================================
// 4. Product Rendering Engine
// ==========================================================================
/**
 * Renders the products grid based on search and category filters.
 */
function renderProducts() {
  // Filter products based on search and category state
  const filteredProducts = products.filter(product => {
    // 1. Category Filter
    const matchesCategory = currentCategory === "All" || 
      product.category.toLowerCase() === currentCategory.toLowerCase();

    // 2. Search Filter (Search by Name, Description, and Category)
    const cleanSearch = searchQuery.toLowerCase().trim();
    const matchesSearch = cleanSearch === "" ||
      product.name.toLowerCase().includes(cleanSearch) ||
      product.description.toLowerCase().includes(cleanSearch) ||
      product.category.toLowerCase().includes(cleanSearch);

    return matchesCategory && matchesSearch;
  });

  // Clear current grid content
  productGrid.innerHTML = "";

  // If no products match, display the friendly fallback banner
  if (filteredProducts.length === 0) {
    productGrid.innerHTML = `
      <div class="no-results-banner">
        <span class="no-results-emoji">😢</span>
        <h3 class="no-results-title">No products found</h3>
        <p class="no-results-text">We couldn't find anything matching "${escapeHTML(searchQuery)}". Try searching for another keyword or check out a different category!</p>
      </div>
    `;
    return;
  }

  // Generate cards
  filteredProducts.forEach(product => {
    // Build badge HTML if present
    const badgeHTML = product.badge
      ? `<span class="badge-brutal product-card-badge" data-badge="${escapeHTML(product.badge)}">${escapeHTML(product.badge)}</span>`
      : "";

    // Build price HTML if present
    const priceHTML = product.price
      ? `<span class="product-price">${escapeHTML(product.price)}</span>`
      : "";

    // Build product card element
    const productCard = document.createElement("article");
    productCard.className = "product-card";
    productCard.innerHTML = `
      ${badgeHTML}
      <div class="card-image-wrapper">
        <img src="${escapeHTML(product.image)}" alt="${escapeHTML(product.name)}" loading="lazy">
      </div>
      <div class="card-info">
        <span class="product-category-tag">${escapeHTML(product.category)}</span>
        <h3 class="product-title" title="${escapeHTML(product.name)}">${escapeHTML(product.name)}</h3>
        <p class="product-desc">${escapeHTML(product.description)}</p>
        <div class="card-footer">
          ${priceHTML}
          <a href="${escapeHTML(product.link)}" class="btn-brutal btn-buy" target="_blank" rel="noopener noreferrer">
            Check on Amazon &rarr;
          </a>
        </div>
      </div>
    `;

    productGrid.appendChild(productCard);
  });
}

// ==========================================================================
// 5. Event Listeners & Interaction Handles
// ==========================================================================

// Search Input Listener (Instant Filter)
if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    renderProducts();
  });
}

// Category Tabs Selection
categoryTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    // Remove active state from all tabs
    categoryTabs.forEach(t => t.classList.remove("active"));
    
    // Set active class on clicked tab
    tab.classList.add("active");
    
    // Update state and render
    currentCategory = tab.getAttribute("data-category");
    renderProducts();
  });
});

// Mobile Navigation Toggle
function toggleMobileMenu() {
  const isActive = hamburgerBtn.classList.toggle("active");
  mobileNavDrawer.classList.toggle("active", isActive);
  mobileNavOverlay.classList.toggle("active", isActive);
  
  // Disable body scroll when menu is open
  document.body.style.overflow = isActive ? "hidden" : "";
}

// Mobile Menu Event Listeners
if (hamburgerBtn) {
  hamburgerBtn.addEventListener("click", toggleMobileMenu);
}
if (mobileNavOverlay) {
  mobileNavOverlay.addEventListener("click", toggleMobileMenu);
}

// Close mobile drawer when a nav link is clicked
mobileLinks.forEach(link => {
  link.addEventListener("click", () => {
    if (hamburgerBtn.classList.contains("active")) {
      toggleMobileMenu();
    }
  });
});

// Smooth Scroll to Explore Products from CTA Button
document.addEventListener("DOMContentLoaded", () => {
  const exploreCta = document.getElementById("explore-cta");
  const productsTarget = document.getElementById("explore-products-section");

  if (exploreCta && productsTarget) {
    exploreCta.addEventListener("click", (e) => {
      e.preventDefault();
      productsTarget.scrollIntoView({ behavior: "smooth" });
    });
  }

  // Initial render when the page loads
  renderProducts();
});
