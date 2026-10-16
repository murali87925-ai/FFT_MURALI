
const products = [
  {
    id: 1,
    name: "The Daily Journal",
    category: "Notebooks",
    price: 180,
    badge: "BESTSELLER",
    description: "A beautiful hardcover notebook for your thoughts, plans and everyday stories.",
    colors: ["Sage Green", "Blush Pink", "Cream", "Navy Blue"],
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    name: "Classic Spiral Notebook",
    category: "Notebooks",
    price: 120,
    badge: "EVERYDAY PICK",
    description: "A practical ruled notebook for college notes, study sessions and planning.",
    colors: ["Blue", "Pink", "Green", "Black"],
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    name: "Smooth Gel Pen Set",
    category: "Writing",
    price: 80,
    badge: "FAN FAVOURITE",
    description: "Comfortable, smooth-writing pens for neat notes and creative writing.",
    colors: ["Blue", "Black", "Red"],
    image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    name: "Signature Fountain Pen",
    category: "Writing",
    price: 250,
    badge: "SPECIAL PICK",
    description: "A classic writing companion for letters, journaling and thoughtful notes.",
    colors: ["Black", "Forest Green", "Navy Blue"],
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    name: "Colour Me Art Set",
    category: "Art",
    price: 150,
    badge: "GET CREATIVE",
    description: "A colourful collection for sketching, colouring and weekend art projects.",
    colors: ["Rainbow", "Pastel", "Bright"],
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 6,
    name: "Creative Pencil Set",
    category: "Art",
    price: 100,
    badge: "ARTIST'S PICK",
    description: "Versatile pencils for drawing, shading, sketching and classroom projects.",
    colors: ["Classic", "Pastel", "Rainbow"],
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 7,
    name: "Pastel Sticky Notes",
    category: "Office",
    price: 60,
    badge: "LITTLE HELPER",
    description: "Brighten your desk with handy notes for reminders, lists and page markers.",
    colors: ["Yellow", "Pink", "Green", "Blue"],
    image: "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 8,
    name: "Desk Essentials Kit",
    category: "Office",
    price: 220,
    badge: "DESK UPGRADE",
    description: "Everyday desk essentials to help keep your study space neat and organised.",
    colors: ["Natural", "Pastel", "Colourful"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80"
  }
];

let activeFilter = "All";
let cart = [];
let toastTimer;

const productGrid = document.getElementById("product-grid");
const cartItems = document.getElementById("cart-items");
const productCount = document.getElementById("product-count");
const cartCount = document.getElementById("cart-count");
const cartLabel = document.getElementById("cart-label");
const subtotalElement = document.getElementById("subtotal");
const deliveryElement = document.getElementById("delivery");
const grandTotalElement = document.getElementById("grand-total");
const shippingNote = document.getElementById("shipping-note");
const toast = document.getElementById("toast");
const productDialog = document.getElementById("product-dialog");

function money(amount) {
  return "₹" + amount.toLocaleString("en-IN");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2400);
}

function renderProducts() {
  const sort = document.getElementById("sort-products").value;

  let visibleProducts = products.filter(product =>
    activeFilter === "All" || product.category === activeFilter
  );

  if (sort === "low") {
    visibleProducts.sort((a, b) => a.price - b.price);
  } else if (sort === "high") {
    visibleProducts.sort((a, b) => b.price - a.price);
  }

  productCount.textContent =
    `${visibleProducts.length} product${visibleProducts.length === 1 ? "" : "s"}`;

  if (visibleProducts.length === 0) {
    productGrid.innerHTML =
      '<p class="no-products">No products found in this category.</p>';
    return;
  }

  productGrid.innerHTML = visibleProducts.map(product => `
    <article class="product-card">
      <div class="product-image">
        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy">
        <span class="product-badge">${product.badge}</span>
      </div>

      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h3>${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <strong class="product-price">${money(product.price)}</strong>

        <label class="color-label" for="color-${product.id}">
          Available colour
        </label>

        <select class="color-select" id="color-${product.id}">
          ${product.colors.map(color =>
            `<option value="${color}">${color}</option>`
          ).join("")}
        </select>

        <div class="product-actions">
          <button class="add-btn" data-add="${product.id}">
            + Add to Bag
          </button>
          <button class="details-btn" data-details="${product.id}">
            Details ↗
          </button>
        </div>
      </div>
    </article>
  `).join("");
}

function setFilter(category) {
  activeFilter = category;

  document.querySelectorAll(".filter-btn").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.filter === category
    );
  });

  renderProducts();
}

document.querySelectorAll(".filter-btn").forEach(button => {
  button.addEventListener("click", () => {
    setFilter(button.dataset.filter);
  });
});

document.querySelectorAll(".category-card").forEach(button => {
  button.addEventListener("click", () => {
    setFilter(button.dataset.category);
    document.getElementById("shop").scrollIntoView({
      behavior: "smooth"
    });
  });
});

document.getElementById("sort-products").addEventListener("change", renderProducts);

productGrid.addEventListener("click", event => {
  const addButton = event.target.closest("[data-add]");
  const detailsButton = event.target.closest("[data-details]");

  if (addButton) {
    const id = Number(addButton.dataset.add);
    const product = products.find(item => item.id === id);
    const color = document.getElementById(`color-${id}`).value;

    addToCart(product, color);
  }

  if (detailsButton) {
    showProductDetails(Number(detailsButton.dataset.details));
  }
});

function addToCart(product, color) {
  const existingItem = cart.find(item =>
    item.id === product.id && item.color === color
  );

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      color: color,
      quantity: 1
    });
  }

  renderCart();
  showToast(`${product.name} added to your bag!`);
}

function renderCart() {
  const itemCount = cart.reduce(
    (sum, item) => sum + item.quantity, 0
  );

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  // Free delivery on orders of ₹499 or more.
  const delivery = subtotal === 0 || subtotal >= 499 ? 0 : 40;
  const total = subtotal + delivery;

  cartCount.textContent = itemCount;
  cartLabel.textContent = `${itemCount} item${itemCount === 1 ? "" : "s"}`;

  subtotalElement.textContent = money(subtotal);
  deliveryElement.textContent = delivery === 0 && subtotal > 0
    ? "FREE"
    : money(delivery);

  grandTotalElement.textContent = money(total);

  if (subtotal === 0) {
    shippingNote.textContent = "Add products to see delivery charges.";
  } else if (subtotal >= 499) {
    shippingNote.textContent = "You've unlocked free delivery!";
  } else {
    shippingNote.textContent =
      `Add ${money(499 - subtotal)} more for free delivery.`;
  }

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        <span>🛍️</span>
        <h3>Your bag is waiting for inspiration.</h3>
        <p>Find something lovely in our collection.</p>
        <a class="primary-btn" href="#shop">Explore products</a>
      </div>
    `;
    return;
  }

  cartItems.innerHTML = cart.map((item, index) => `
    <div class="cart-row">
      <div>
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-meta">
          Colour: ${item.color} · ${money(item.price)} each
        </div>

        <div class="cart-controls">
          <button class="qty-btn" data-decrease="${index}"
            aria-label="Decrease quantity">−</button>
          <span class="qty-number">${item.quantity}</span>
          <button class="qty-btn" data-increase="${index}"
            aria-label="Increase quantity">+</button>
          <button class="remove-btn" data-remove="${index}">
            Remove
          </button>
        </div>
      </div>

      <div class="cart-item-price">
        ${money(item.price * item.quantity)}
      </div>
    </div>
  `).join("");
}

cartItems.addEventListener("click", event => {
  const decrease = event.target.closest("[data-decrease]");
  const increase = event.target.closest("[data-increase]");
  const remove = event.target.closest("[data-remove]");

  if (decrease) {
    const item = cart[Number(decrease.dataset.decrease)];
    item.quantity--;

    if (item.quantity <= 0) {
      cart = cart.filter(current => current !== item);
    }
  }

  if (increase) {
    cart[Number(increase.dataset.increase)].quantity++;
  }

  if (remove) {
    cart.splice(Number(remove.dataset.remove), 1);
    showToast("Item removed from your bag.");
  }

  renderCart();
});

document.getElementById("clear-cart").addEventListener("click", () => {
  cart = [];
  renderCart();
  showToast("Your shopping bag has been cleared.");
});

function showProductDetails(id) {
  const product = products.find(item => item.id === id);

  document.getElementById("dialog-content").innerHTML = `
    <span class="eyebrow">${product.category.toUpperCase()}</span>
    <img class="dialog-product-img" src="${product.image}" alt="${product.name}">
    <h2>${product.name}</h2>
    <strong class="product-price">${money(product.price)}</strong>
    <p class="dialog-description">${product.description}</p>
    <p><strong>Available colours:</strong> ${product.colors.join(", ")}</p>
    <button class="primary-btn" id="dialog-add" style="margin-top:20px">
      Add to Bag ↗
    </button>
  `;

  productDialog.showModal();

  document.getElementById("dialog-add").addEventListener("click", () => {
    addToCart(product, product.colors[0]);
    productDialog.close();
  });
}

document.getElementById("dialog-close").addEventListener("click", () => {
  productDialog.close();
});

document.getElementById("checkout-btn").addEventListener("click", () => {
  if (cart.length === 0) {
    showToast("Your bag is empty. Add a product first.");
    return;
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  const delivery = total >= 499 ? 0 : 40;

  alert(
    "Thank you for visiting PaperTrail!\n\n" +
    "Items: " + cart.reduce((sum, item) => sum + item.quantity, 0) +
    "\nOrder total: " + money(total + delivery) +
    "\n\nThis is a student demonstration. No real order or payment was made."
  );
});

renderProducts();
renderCart();
