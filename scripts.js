// Toggle mobile menu
function toggleMenu() {
  const navMenu = document.getElementById("navMenu");
  if (navMenu) {
    navMenu.classList.toggle("show");
  }
}

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
