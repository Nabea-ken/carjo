// Sample car data const cars = [ { id: 1, brand: 'Toyota', model: 'Corolla', price: 20000, fuel: 'Petrol', year: 2023, img: 'https://via.placeholder.com/250x140?text=Corolla', desc: 'Reliable and efficient' }, { id: 2, brand: 'BMW', model: 'X5', price: 55000, fuel: 'Diesel', year: 2024, img: 'https://via.placeholder.com/250x140?text=X5', desc: 'Luxury SUV' }, { id: 3, brand: 'Ford', model: 'Mustang', price: 45000, fuel: 'Petrol', year: 2022, img: 'https://via.placeholder.com/250x140?text=Mustang', desc: 'Sporty and stylish' }, { id: 4, brand: 'Tesla', model: 'Model 3', price: 48000, fuel: 'Electric', year: 2025, img: 'https://via.placeholder.com/250x140?text=Model+3', desc: 'Electric performance' }, { id: 5, brand: 'Honda', model: 'Civic', price: 22000, fuel: 'Hybrid', year: 2023, img: 'https://via.placeholder.com/250x140?text=Civic', desc: 'Economical and reliable' }, // Add more cars here ];

const carList = document.getElementById('car-list'); const pagination = document.getElementById('pagination'); const loader = document.getElementById('loader'); const modal = document.getElementById('carModal'); const modalImage = document.getElementById('modalImage'); const modalTitle = document.getElementById('modalTitle'); const modalDesc = document.getElementById('modalDesc'); const modalPrice = document.getElementById('modalPrice');

let currentPage = 1; const carsPerPage = 4;

function showLoader(show) { loader.style.display = show ? 'block' : 'none'; }

function displayCars(data, page = 1) { showLoader(true); setTimeout(() => { carList.innerHTML = ''; const start = (page - 1) * carsPerPage; const end = start + carsPerPage; const paginatedCars = data.slice(start, end);

paginatedCars.forEach(car => {
  const card = document.createElement('div');
  card.className = 'car-card show';
  card.innerHTML = `
    <img src="${car.img}" alt="${car.model}">
    <h3>${car.brand} ${car.model}</h3>
    <p class="price">$${car.price}</p>
  `;
  card.onclick = () => openModal(car);
  carList.appendChild(card);
});

setupPagination(data.length);
showLoader(false);

}, 500); }

function setupPagination(totalCars) { const totalPages = Math.ceil(totalCars / carsPerPage); pagination.innerHTML = '';

for (let i = 1; i <= totalPages; i++) { const btn = document.createElement('button'); btn.textContent = i; btn.className = i === currentPage ? 'active' : ''; btn.onclick = () => { currentPage = i; applyFilters(); }; pagination.appendChild(btn); } }

function applyFilters() { const brand = document.querySelector('.filter-btn.active').dataset.brand; const search = document.getElementById('searchInput').value.toLowerCase(); const minPrice = parseFloat(document.getElementById('minPrice').value) || 0; const maxPrice = parseFloat(document.getElementById('maxPrice').value) || Infinity; const fuel = document.getElementById('fuelType').value; const year = document.getElementById('yearFilter').value;

const filtered = cars.filter(car => { return ( (brand === 'all' || car.brand === brand) && car.model.toLowerCase().includes(search) && car.price >= minPrice && car.price <= maxPrice && (!fuel || car.fuel === fuel) && (!year || car.year.toString() === year) ); });

displayCars(filtered, currentPage); }

function openModal(car) { modal.style.display = 'flex'; modalImage.src = car.img; modalTitle.textContent = ${car.brand} ${car.model}; modalDesc.textContent = car.desc; modalPrice.textContent = $${car.price}; modal.setAttribute('data-car-id', car.id); }

document.querySelector('.close-modal').onclick = () => { modal.style.display = 'none'; };

window.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };

document.querySelectorAll('.filter-btn').forEach(btn => { btn.onclick = () => { document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active'); currentPage = 1; applyFilters(); }; });

document.getElementById('searchInput').oninput = applyFilters; document.getElementById('minPrice').oninput = applyFilters; document.getElementById('maxPrice').oninput = applyFilters; document.getElementById('fuelType').onchange = applyFilters; document.getElementById('yearFilter').onchange = applyFilters;

function addToCart() { const carId = modal.getAttribute('data-car-id'); let cart = JSON.parse(localStorage.getItem('cart')) || []; const existing = cart.find(item => item.id == carId);

if (!existing) { const car = cars.find(c => c.id == carId); if (car) { cart.push(car); localStorage.setItem('cart', JSON.stringify(cart)); alert("Car added to cart!"); } } else { alert("Car already in cart!"); } }

// Initial load applyFilters();


