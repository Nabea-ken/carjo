// scripts.js

// Dummy car data
const cars = [
  { id: 1, brand: "Tesla", model: "Model 3", fuel: "Electric", year: 2022, price: 45000, img: "images/cars/tesla-model3.jpg" },
  { id: 2, brand: "BMW", model: "X5", fuel: "Petrol", year: 2021, price: 60000, img: "images/cars/bmw-x5.jpg" },
  { id: 3, brand: "Toyota", model: "Prius", fuel: "Hybrid", year: 2020, price: 30000, img: "images/cars/toyota-prius.jpg" },
  { id: 4, brand: "Honda", model: "Accord", fuel: "Petrol", year: 2019, price: 25000, img: "images/cars/honda-accord.jpg" },
  { id: 5, brand: "Tesla", model: "Model X", fuel: "Electric", year: 2023, price: 80000, img: "images/cars/tesla-modelx.jpg" },
];

// Global Variables
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let users = JSON.parse(localStorage.getItem('users')) || [];
let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || null;

// Update Cart Count
function updateCartCount() {
  const cartCount = document.getElementById('cartCount');
  if (cartCount) cartCount.textContent = cart.length;
}

// Save Cart
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Save Users
function saveUsers() {
  localStorage.setItem('users', JSON.stringify(users));
}

// Save Logged User
function saveLoggedInUser() {
  localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
}

// Render Cars (for index.html)
function renderCars() {
  const carList = document.getElementById('carList');
  if (!carList) return;

  carList.innerHTML = "";
  cars.forEach(car => {
    const carCard = document.createElement('div');
    carCard.className = "car-card";
    carCard.innerHTML = `
      <img src="${car.img}" alt="${car.brand} ${car.model}">
      <h3>${car.brand} ${car.model}</h3>
      <p>${car.fuel} - ${car.year}</p>
      <p>Price: $${car.price}</p>
      <button onclick="viewCar(${car.id})">View Details</button>
      <button onclick="addToCart(${car.id})">Add to Cart</button>
    `;
    carList.appendChild(carCard);
  });
}

// View Car Details
function viewCar(id) {
  localStorage.setItem('selectedCar', JSON.stringify(cars.find(c => c.id === id)));
  window.location.href = "car-details.html";
}

// Render Car Details Page
function renderCarDetails() {
  const car = JSON.parse(localStorage.getItem('selectedCar'));
  if (!car) return;

  document.getElementById('carImage').src = car.img;
  document.getElementById('carName').textContent = `${car.brand} ${car.model}`;
  document.getElementById('carBrand').textContent = `Brand: ${car.brand}`;
  document.getElementById('carFuel').textContent = `Fuel: ${car.fuel} - Year: ${car.year}`;
  document.getElementById('carPrice').textContent = `Price: $${car.price}`;

  document.getElementById('addToCartButton').onclick = () => addToCart(car.id);
}

// Add to Cart
function addToCart(id) {
  const car = cars.find(c => c.id === id);
  cart.push(car);
  saveCart();
  updateCartCount();
  alert(`${car.brand} ${car.model} added to cart!`);
}

// Render Cart Page
function renderCartItems() {
  const cartItems = document.getElementById('cartItems');
  if (!cartItems) return;

  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((car, index) => {
    const item = document.createElement('div');
    item.className = "cart-item";
    item.innerHTML = `
      <img src="${car.img}" alt="${car.model}">
      <div>
        <h3>${car.brand} ${car.model}</h3>
        <p>${car.fuel} - ${car.year}</p>
        <p>Price: $${car.price}</p>
        <button onclick="removeFromCart(${index})">Remove</button>
      </div>
    `;
    cartItems.appendChild(item);
    total += car.price;
  });

  const totalPrice = document.getElementById('totalPrice');
  if (totalPrice) totalPrice.textContent = total;
}

// Remove from Cart
function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  renderCartItems();
  updateCartCount();
}

// Checkout Function
function checkout() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  if (!loggedInUser) {
    alert('You need to log in first!');
    window.location.href = "login.html";
    return;
  }
  let orders = JSON.parse(localStorage.getItem('orders')) || {};
  if (!orders[loggedInUser.email]) orders[loggedInUser.email] = [];
  orders[loggedInUser.email] = orders[loggedInUser.email].concat(cart);
  localStorage.setItem('orders', JSON.stringify(orders));

  alert('Thank you for your purchase!');
  cart = [];
  saveCart();
  renderCartItems();
  updateCartCount();
}

// Register
function registerUser(e) {
  e.preventDefault();
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;

  if (users.find(u => u.email === email)) {
    alert('Email already exists!');
    return;
  }

  users.push({ email, password });
  saveUsers();
  alert('Registration successful! You can now log in.');
  window.location.href = "login.html";
}

// Login
function loginUser(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    if (email === "admin@carjo.com" && password === "admin123") {
      loggedInUser = { email: "admin@carjo.com", role: "admin" };
      saveLoggedInUser();
      window.location.href = "admin.html";
      return;
    }

    alert('Invalid credentials!');
    return;
  }

  loggedInUser = user;
  saveLoggedInUser();
  window.location.href = "index.html";
}

// Logout
function logout() {
  loggedInUser = null;
  localStorage.removeItem('loggedInUser');
  window.location.href = "index.html";
}

// Show User Info in Nav
function showUserInNav() {
  const userSection = document.getElementById('userSection');
  if (!userSection) return;

  if (loggedInUser) {
    userSection.innerHTML = `
      Welcome, ${loggedInUser.email.split('@')[0]} | 
      <a href="#" onclick="logout()">Logout</a>
    `;
  } else {
    userSection.innerHTML = `<a href="login.html">Login</a>`;
  }
}

// Protect Admin Page
function protectAdmin() {
  if (!loggedInUser || loggedInUser.email !== "admin@carjo.com") {
    alert('Access Denied! Admins only.');
    window.location.href = "login.html";
  }
}

// Render Orders Page
function renderOrders() {
  if (!loggedInUser) {
    alert('You must log in to view your orders!');
    window.location.href = "login.html";
    return;
  }

  const orders = JSON.parse(localStorage.getItem('orders')) || {};
  const userOrders = orders[loggedInUser.email] || [];

  const ordersContainer = document.getElementById('ordersContainer');
  if (!ordersContainer) return;

  ordersContainer.innerHTML = "";
  userOrders.forEach(car => {
    const item = document.createElement('div');
    item.className = "order-item";
    item.innerHTML = `
      <img src="${car.img}" alt="${car.model}">
      <div>
        <h3>${car.brand} ${car.model}</h3>
        <p>${car.fuel} - ${car.year}</p>
        <p>Price: $${car.price}</p>
      </div>
    `;
    ordersContainer.appendChild(item);
  });
}

// On page load actions
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  showUserInNav();
});


// Toggle Mobile Menu
function toggleMenu() {
  const navMenu = document.getElementById('navMenu');
  navMenu.classList.toggle('open');
}
