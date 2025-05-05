// Hamburger menu toggle
function toggleMenu() {
  const menu = document.getElementById('navMenu');
  menu.classList.toggle('active');
}

// Universal add to cart
function addToCart(name, price) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} added to cart!`);
}

// Sample car data
const cars = [
  {
    id: 1,
    name: "Toyota Corolla",
    price: 45,
    image: "images/bmw-x5.jpg",
    description: "Reliable and fuel-efficient sedan."
  },
  {
    id: 2,
    name: "Honda Accord",
    price: 50,
    image: "images/honda-accord.jpg",
    description: "Sporty design with great handling."
  },
  {
    id: 3,
    name: "Tesla Model3",
    price: 80,
    image: "images/tesla-model3.jpg",
    description: "Spacious SUV for families or groups."
  }
  {
    id: 4,
    name: "Tesla Modelx",
    price: 80,
    image: "images/tesla-modelx.jpg",
    description: "Spacious SUV for families or groups."
  }
 {
    id: 5,
    name: "Toyota Prius",
    price: 80,
    image: "images/toyota-prius.jpg",
    description: "Spacious SUV for families or groups."
  }
];

// Render car cards to #car-list
function renderCars(carList = cars) {
  const container = document.getElementById('car-list');
  if (!container) return;

  container.innerHTML = '';

  carList.forEach(car => {
    const card = document.createElement('div');
    card.className = 'car-card';
    card.innerHTML = `
      <img src="${car.image}" alt="${car.name}" />
      <h3>${car.name}</h3>
      <p>${car.description}</p>
      <p><strong>$${car.price}/day</strong></p>
      <button onclick="addToCart('${car.name}', ${car.price})">Add to Cart</button>
    `;
    container.appendChild(card);
  });
}

// On load, render cars if applicable
//window.addEventListener('DOMContentLoaded', () => {
  //if (document.getElementById('car-list')) {
    //renderCars();
  //}
});

const spareParts = [
  {
    id: 1,
    name: "Brake Pads",
    price: 120,
    img: "images/spare/brake-pads.jpg",
    category: "Tires",
    description: "High-quality brake pads for improved stopping power."
  },
  {
    id: 2,
    name: "Air Filter",
    price: 50,
    img: "images/spare/air-filter.jpg",
    category: "Engine",
    description: "OEM air filter for clean engine performance."
  },
  {
    id: 3,
    name: "Oil Filter",
    price: 40,
    img: "images/spare/oil-filter.jpg",
    category: "Engine",
    description: "Long-lasting oil filter for optimal lubrication."
  },
  {
    id: 4,
    name: "Car Battery",
    price: 200,
    img: "images/spare/car-battery.jpg",
    category: "Electrical",
    description: "Reliable battery with 2-year warranty."
  },
  {
    id: 5,
    name: "Wiper Blades",
    price: 25,
    img: "images/spare/wiper-blades.jpg",
    category: "Accessories",
    description: "Durable all-season wiper blades."
  }
];

let currentCategory = 'All';

function renderSpareParts() {
  const list = document.getElementById("sparePartsList");
  if (!list) return;

  const searchText = document.getElementById("searchInput")?.value?.toLowerCase() || "";

  const filtered = spareParts.filter(part =>
    (currentCategory === "All" || part.category === currentCategory) &&
    part.name.toLowerCase().includes(searchText)
  );

  list.innerHTML = "";

  if (filtered.length === 0) {
    list.innerHTML = "<p>No spare parts found.</p>";
    return;
  }

  filtered.forEach(part => {
    const card = document.createElement("div");
    card.className = "car-card";
    card.innerHTML = `
      <img src="${part.img}" alt="${part.name}">
      <h3>${part.name}</h3>
      <p>Category: ${part.category}</p>
      <p>Price: $${part.price}</p>
      <button onclick="location.href='part-details.html?id=${part.id}'">View Details</button>
      <button onclick="addSpareToCart(${part.id})">Add to Cart</button>
    `;
    list.appendChild(card);
  });
}

function filterByCategory(category) {
  currentCategory = category;
  renderSpareParts();
}

function filterSpareParts() {
  renderSpareParts();
}

function getSparePartById(id) {
  return spareParts.find(p => p.id === parseInt(id));
}

function addSpareToCart(id) {
  alert(`Part ${id} added to cart! (Stub function)`);
}

function toggleMenu() {
  document.getElementById("navMenu").classList.toggle("show");
}

function showUserInNav() {
  const userSection = document.getElementById("userSection");
  if (userSection) {
    userSection.innerHTML = `<p>Welcome, User!</p>`;
  }
}

function updateCartCount() {
  // Stub for cart count
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  showUserInNav();
  renderCars?.();
  renderSpareParts?.();
});
