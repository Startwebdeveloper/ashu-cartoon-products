# Ashu Cartoon Products - Amazon Affiliate Recommendation Website

Welcome to **Ashu Cartoon Products**! This is a modern, responsive, mobile-first product recommendation website designed to showcase hand-picked Amazon products using a clean, "Neobrutalist-Playful" aesthetic.

The website runs completely as a **static website** with no database, PHP, Node.js, or server-side functionality, making it perfect to host for free on **GitHub Pages**, Netlify, or Vercel.

---

## 📁 File Structure

```text
ashu-cartoon-products/
│
├── index.html       # The main website structure and layout shell
├── style.css        # The Neobrutalist design system, typography, and responsive styles
├── script.js        # Product array data and search/filter rendering logic
├── README.md        # This instruction manual
│
└── images/          # Local directory for product images
    ├── product1.jpg # Cute Astronaut Projector Night Light
    ├── product2.jpg # Cartoon Panda Wireless Mouse
    └── product3.jpg # Kawaii Grey Forest Spirit Mug
```

---

## ⚡ How to Run Locally

Since this is a client-side static site, you can view it by simply double-clicking **`index.html`** to open it directly in any modern web browser.

Alternatively, you can run a local development server for testing:
* **VS Code extension**: Right-click `index.html` and select **"Open with Live Server"**.
* **Python**: Run `python -m http.server 8000` in your command line inside the directory and open `http://localhost:8000`.

---

## 🛍️ How to Add a New Product

You can add, edit, or remove products easily **without touching the HTML file**. You only need to edit the `products` array inside **[`script.js`](file:///e:/Coding%20Instagram%20Best%20Website/Ashu%20Cartoon%20Website/script.js)**.

### Step 1: Prepare the Product Image
1. Save your product image inside the `/images/` folder (e.g. `images/study-lamp.jpg`).
2. Make sure it is clear and cropped to a square ratio if possible (the CSS will automatically scale it using `object-fit: contain` to prevent stretching).

### Step 2: Edit `script.js`
Open **[`script.js`](file:///e:/Coding%20Instagram%20Best%20Website/Ashu%20Cartoon%20Website/script.js)** and add a new object to the `products` array. 

Here is the template format:

```javascript
  {
    name: "Study Desk Lamp with USB Port",
    image: "images/study-lamp.jpg",
    description: "A flexible and dimmable LED desk lamp designed for study sessions. Includes a built-in phone stand and USB charging port.",
    price: "₹799",
    category: "Study",
    badge: "Recommended",
    link: "https://www.amazon.in/dp/YOUR_AFFILIATE_ID"
  },
```

### Supported Data Fields
| Field Name | Type | Required | Description | Example |
| :--- | :--- | :---: | :--- | :--- |
| **`name`** | String | Yes | Name of the product | `"Cute Panda Wireless Mouse"` |
| **`image`** | String | Yes | Relative path to local image or external URL | `"images/product2.jpg"` |
| **`description`** | String | Yes | A short paragraph detailing features | `"Silent click mouse, ergonomic design..."` |
| **`price`** | String | No | Price with currency symbol (leave as `""` to hide) | `"₹899"` |
| **`category`** | String | Yes | Filters product. Must match category buttons. | `"Electronics"` |
| **`badge`** | String | No | Floating label tag in corner (leave as `""` to hide) | `"Best Seller"`, `"Popular"`, `"Recommended"`, `"Trending"` |
| **`link`** | String | Yes | Your Amazon Associates Affiliate Link | `"https://amzn.to/..."` |

---

## 🔍 How to Modify Categories

The category filters can be changed easily. If you want to add or remove a category:

1. Open **[`index.html`](file:///e:/Coding%20Instagram%20Best%20Website/Ashu%20Cartoon%20Website/index.html)** and locate the category buttons inside `<div class="category-container">`:
   ```html
   <button class="category-tab" data-category="Study">Study</button>
   ```
2. Simply add a new button or remove an existing one. Ensure the `data-category` attribute matches the text value.
3. Make sure any new products you write in `script.js` set their `category` field to match this `data-category` name (e.g. `category: "Study"`).

---

## 📜 Compliance & Affiliate Rules

To keep your Amazon Associates account active and in good standing, this website enforces the following rules out-of-the-box:

1. **Independent site**: We clearly present this website as an independent curator, NOT as Amazon itself.
2. **Clear disclosures**: A prominent affiliate disclosure is displayed in the About card, explaining that we earn commissions, alongside the legally mandated Amazon disclaimer: *"As an Amazon Associate I earn from qualifying purchases."*
3. **No automatic redirect**: All affiliate links open in a new tab (`target="_blank"` with `rel="noopener noreferrer"`) and require an intentional user click. 
4. **No fake reviews/ratings**: To build trust and comply with FTC/Amazon guidelines, we avoid displaying fake stars, reviews, or fake discounted countdown timers.
