// ========== MOBILE MENU ==========
function toggleMenu() {
  const navMenu = document.getElementById("navMenu");
  if (navMenu) navMenu.classList.toggle("show");
}

// ========== UPDATE CART COUNT ==========
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  const cartCountElement = document.getElementById("cartCount");
  if (cartCountElement) cartCountElement.textContent = count;
}

document.addEventListener("DOMContentLoaded", updateCartCount);

// ========== DEMO DATA FOR TESTING ==========
const demoAccessories = [
  { id: 1, name: "Phone Holder", price: 15, description: "Universal smartphone holder.", img: "img/phone-holder.jpg", type: "Gadget" },
  { id: 2, name: "Seat Cover", price: 45, description: "Premium leather seat covers.", img: "img/seat-cover.jpg", type: "Interior" }
];
localStorage.setItem("accessories", JSON.stringify(demoAccessories));

const demoSpareParts = [
  { id: 1, name: "Brake Pads", price: 30, description: "High-performance brake pads.", img: "img/brake-pads.jpg", category: "Brakes" },
  { id: 2, name: "Oil Filter", price: 10, description: "Universal oil filter.", img: "img/oil-filter.jpg", category: "Engine" }
];
localStorage.setItem("spareParts", JSON.stringify(demoSpareParts));

// ========== GET ITEM BY ID ==========
function getAccessoryById(id) {
  const accessories = JSON.parse(localStorage.getItem("accessories")) || [];
  return accessories.find(item => item.id == id);
}

function getSparePartById(id) {
  const parts = JSON.parse(localStorage.getItem("spareParts")) || [];
  return parts.find(part => part.id == id);
}

const allItems = document.querySelectorAll(".featured-item");
const itemsPerPage = 6;
let currentPage = 1;

function paginate() {
  allItems.forEach((item, i) => {
    item.style.display = (i >= (currentPage - 1) * itemsPerPage && i < currentPage * itemsPerPage) ? "block" : "none";
  });

  const totalPages = Math.ceil(allItems.length / itemsPerPage);
  const paginationDiv = document.getElementById("productPagination");
  paginationDiv.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;
    btn.className = (i === currentPage) ? "active" : "";
    btn.onclick = () => {
      currentPage = i;
      paginate();
    };
    paginationDiv.appendChild(btn);
  }
}

document.addEventListener("DOMContentLoaded", paginate);

// ========== ADD TO CART ==========
function addAccessoryToCart(id) {
  const accessories = JSON.parse(localStorage.getItem("accessories")) || [];
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const accessory = accessories.find(item => item.id == id);

  if (!accessory) {
    alert("Accessory not found.");
    return;
  }

  const existing = cart.find(item => item.id == id && item.type === "accessory");

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...accessory, quantity: 1, type: "accessory" });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${accessory.name} added to cart.`);
}

function addSpareToCart(id) {
  const parts = JSON.parse(localStorage.getItem("spareParts")) || [];
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const part = parts.find(p => p.id == id);

  if (!part) {
    alert("Spare part not found.");
    return;
  }

  const existing = cart.find(item => item.id == id && item.type === "spare");

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...part, quantity: 1, type: "spare" });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${part.name} added to cart.`);
}

// ========== REMOVE ITEM FROM CART ==========
function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartDisplay();
  updateCartCount();
}

// ========== CHANGE QUANTITY ==========
function changeQuantity(index, change) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart[index]) {
    cart[index].quantity += change;
    if (cart[index].quantity < 1) {
      cart.splice(index, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
    updateCartCount();
  }
}

// ========== DISPLAY CART ITEMS ==========
function updateCartDisplay() {
  const cartItemsDiv = document.getElementById("cartItems");
  const checkoutBtn = document.getElementById("checkoutBtn");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (!cartItemsDiv) return;

  if (cart.length > 0) {
    let total = 0;

    cartItemsDiv.innerHTML = cart.map((item, index) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      return `
        <div class="cart-item">
          <img src="${item.img}" alt="${item.name}" width="60" />
          <div>
            <p><strong>${item.name}</strong></p>
            <p>$${item.price} x ${item.quantity} = $${itemTotal.toFixed(2)}</p>
            <div class="quantity-controls">
              <button onclick="changeQuantity(${index}, -1)">−</button>
              <span>${item.quantity}</span>
              <button onclick="changeQuantity(${index}, 1)">+</button>
            </div>
            <button onclick="removeFromCart(${index})" class="remove-btn">Remove</button>
          </div>
        </div>
      `;
    }).join("") + `<div class="cart-total"><strong>Total: $${total.toFixed(2)}</strong></div>`;

    if (checkoutBtn) checkoutBtn.style.display = "block";
  } else {
    cartItemsDiv.innerHTML = "<p>Cart is empty.</p>";
    if (checkoutBtn) checkoutBtn.style.display = "none";
  }
}

window.addEventListener("load", updateCartDisplay);

// ========== CHECKOUT FORM VALIDATION ==========
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("checkoutForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const phone = form.querySelector('[name="phone"]').value.trim();
    const address = form.querySelector('[name="address"]').value.trim();

    if (!name || !email || !phone || !address) {
      alert("Please fill in all fields.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert("Enter a valid 10-digit phone number.");
      return;
    }

    alert("Checkout successful!");
    localStorage.removeItem("cart");
    window.location.href = "thank-you.html";
  });
});

// ========== SEARCH/FILTER SCRIPT ==========
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  if (!searchInput) return;

  searchInput.addEventListener("input", function () {
    const keyword = this.value.toLowerCase();
    const products = document.querySelectorAll(".product-card");

    products.forEach(card => {
      const name = card.querySelector(".product-name").textContent.toLowerCase();
      const match = name.includes(keyword);
      card.style.display = match ? "block" : "none";
    });
  });
});
