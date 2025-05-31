// Toggle mobile menu
function toggleMenu() {
  const navMenu = document.getElementById("navMenu");
  if (navMenu) {
    navMenu.classList.toggle("show");
  }
}

function getAccessoryById(id) {
  const accessories = JSON.parse(localStorage.getItem("accessories")) || [];

  return accessories.find(item => item.id == id);
}

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

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  const cartCountElement = document.getElementById("cartCount");
  if (cartCountElement) cartCountElement.textContent = count;
}
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
});

//Optional: Sample Local Storage Initialization (for testing)
const demoAccessories = [
  { id: 1, name: "Phone Holder", price: 15, description: "Universal smartphone holder.", img: "img/phone-holder.jpg", type: "Gadget" },
  { id: 2, name: "Seat Cover", price: 45, description: "Premium leather seat covers.", img: "img/seat-cover.jpg", type: "Interior" },
];

localStorage.setItem("accessories", JSON.stringify(demoAccessories));

function getSparePartById(id) {
  const parts = JSON.parse(localStorage.getItem("spareParts")) || [];

  return parts.find(part => part.id == id);
}

function addSpareToCart(id) {
  const parts = JSON.parse(localStorage.getItem("spareParts")) || [];
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const part = parts.find(p => p.id == id);

  if (!part) {
    alert("Spare part not found.");
    return;
  }
  
  // Get current cart or start new one
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  // Check if part already exists in cart
  const existing = cart.find(item => item.id == id && item.type === "spare");

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...part, quantity: 1, type: "spare" });
  }

  // Save updated cart
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${part.name} added to cart.`);
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  const cartCountElement = document.getElementById("cartCount");
  if (cartCountElement) cartCountElement.textContent = count;
}

//Optional: Demo Spare Parts (for testing)
const demoSpareParts = [
  { id: 1, name: "Brake Pads", price: 30, description: "High-performance brake pads.", img: "img/brake-pads.jpg", category: "Brakes" },
  { id: 2, name: "Oil Filter", price: 10, description: "Universal oil filter.", img: "img/oil-filter.jpg", category: "Engine" },
];

localStorage.setItem("spareParts", JSON.stringify(demoSpareParts));


// Remove an item from the cart (used in cart.html)
function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.reload();
}

// Display cart items on cart.html
window.addEventListener("load", function () {
  const cartItemsDiv = document.getElementById("cartItems");
  const checkoutBtn = document.getElementById("checkoutBtn");

  if (cartItemsDiv && checkoutBtn) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length > 0) {
      cartItemsDiv.innerHTML = cart
        .map(
          (item, index) => `
          <div class="cart-item">
            <p><strong>${item.name}</strong> - $${item.price}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
          </div>
        `
        )
        .join("");
      checkoutBtn.style.display = "block";
    } else {
      cartItemsDiv.innerHTML = "<p>Cart is empty.</p>";
    }

    checkoutBtn.addEventListener("click", function () {
      alert("Checkout successful! Thank you.");
      localStorage.removeItem("cart");
      window.location.reload();
    });
  }
});
