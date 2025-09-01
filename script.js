// Global variables
let currentUser = null;
let cart = [];
let allPizzas = [];

// Pizza data
const pizzaData = [
    {
        id: 'margherita',
        name: 'Margherita Classic',
        price: 12.99,
        category: 'veg',
        size: 'medium',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        description: 'Fresh mozzarella, tomato sauce, and basil'
    },
    {
        id: 'pepperoni',
        name: 'Pepperoni Supreme',
        price: 15.99,
        category: 'non-veg',
        size: 'large',
        image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763f30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        description: 'Spicy pepperoni with mozzarella cheese'
    },
    {
        id: 'veggie',
        name: 'Veggie Garden',
        price: 14.99,
        category: 'veg',
        size: 'medium',
        image: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        description: 'Bell peppers, mushrooms, onions, olives'
    },
    {
        id: 'hawaiian',
        name: 'Hawaiian Paradise',
        price: 16.99,
        category: 'non-veg',
        size: 'large',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        description: 'Ham, pineapple, and mozzarella cheese'
    },
    {
        id: 'bbq-chicken',
        name: 'BBQ Chicken Deluxe',
        price: 18.99,
        category: 'non-veg',
        size: 'large',
        image: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        description: 'Grilled chicken, BBQ sauce, red onions'
    },
    {
        id: 'mushroom',
        name: 'Mushroom Medley',
        price: 13.99,
        category: 'veg',
        size: 'medium',
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        description: 'Mixed mushrooms, garlic, herbs'
    },
    {
        id: 'meat-lovers',
        name: 'Meat Lovers Special',
        price: 21.99,
        category: 'non-veg',
        size: 'large',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        description: 'Pepperoni, sausage, bacon, ham'
    },
    {
        id: 'spinach-feta',
        name: 'Spinach & Feta',
        price: 15.99,
        category: 'veg',
        size: 'medium',
        image: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        description: 'Fresh spinach, feta cheese, sun-dried tomatoes'
    },
    {
        id: 'supreme',
        name: 'Supreme Special',
        price: 19.99,
        category: 'non-veg',
        size: 'large',
        image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763f30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        description: 'Pepperoni, sausage, peppers, onions, mushrooms'
    },
    {
        id: 'caprese',
        name: 'Caprese Fresh',
        price: 14.99,
        category: 'veg',
        size: 'small',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        description: 'Fresh mozzarella, tomatoes, basil, balsamic glaze'
    },
    {
        id: 'buffalo-chicken',
        name: 'Buffalo Chicken',
        price: 17.99,
        category: 'non-veg',
        size: 'large',
        image: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        description: 'Spicy buffalo chicken, ranch, celery'
    },
    {
        id: 'four-cheese',
        name: 'Four Cheese Blend',
        price: 16.99,
        category: 'veg',
        size: 'medium',
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        description: 'Mozzarella, cheddar, parmesan, gorgonzola'
    }
];

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Load saved data
    loadUserData();
    loadCartData();
    
    // Set up navigation
    updateAuthButton();
    updateCartCount();
    
    // Set up page-specific functionality
    const currentPage = getCurrentPage();
    switch(currentPage) {
        case 'index':
            setupHomePage();
            break;
        case 'login':
            setupLoginPage();
            break;
        case 'shop':
            setupShopPage();
            break;
        case 'cart':
            setupCartPage();
            break;
    }
    
    // Set up mobile menu
    setupMobileMenu();
    
    // Set up auth button
    setupAuthButton();
}

function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('login.html')) return 'login';
    if (path.includes('shop.html')) return 'shop';
    if (path.includes('cart.html')) return 'cart';
    return 'index';
}

// User authentication functions
function loadUserData() {
    const savedUser = localStorage.getItem('pizzamania_user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
    }
}

function saveUserData() {
    if (currentUser) {
        localStorage.setItem('pizzamania_user', JSON.stringify(currentUser));
    } else {
        localStorage.removeItem('pizzamania_user');
    }
}

function login(username, password) {
    // Fake login - any credentials work
    if (username.trim() && password.trim()) {
        currentUser = {
            username: username,
            loginTime: new Date().toISOString()
        };
        saveUserData();
        return true;
    }
    return false;
}

function logout() {
    currentUser = null;
    cart = [];
    saveUserData();
    saveCartData();
    updateAuthButton();
    updateCartCount();
    
    // Redirect to home if on a protected page
    if (getCurrentPage() === 'cart') {
        window.location.href = 'index.html';
    }
}

function updateAuthButton() {
    const authBtn = document.getElementById('auth-btn');
    if (authBtn) {
        if (currentUser) {
            authBtn.textContent = 'Logout';
            authBtn.onclick = logout;
        } else {
            authBtn.textContent = 'Login';
            authBtn.onclick = () => window.location.href = 'login.html';
        }
    }
}

// Cart functions
function loadCartData() {
    const savedCart = localStorage.getItem('pizzamania_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

function saveCartData() {
    localStorage.setItem('pizzamania_cart', JSON.stringify(cart));
}

function addToCart(id, name, price, image) {
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: id,
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }
    
    saveCartData();
    updateCartCount();
    showNotification(`${name} added to cart!`, 'success');
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCartData();
    updateCartCount();
    
    if (getCurrentPage() === 'cart') {
        setupCartPage();
    }
}

function updateQuantity(id, change) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            saveCartData();
            updateCartCount();
            setupCartPage();
        }
    }
}

function clearCart() {
    cart = [];
    saveCartData();
    updateCartCount();
    setupCartPage();
    showNotification('Cart cleared!', 'success');
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

function getCartTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// Page setup functions
function setupHomePage() {
    // Add animation delays to cards
    const pizzaCards = document.querySelectorAll('.pizza-card');
    pizzaCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

function setupLoginPage() {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Redirect if already logged in
    if (currentUser) {
        window.location.href = 'index.html';
    }
}

function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageEl = document.getElementById('login-message');
    
    if (login(username, password)) {
        messageEl.textContent = 'Login successful! Redirecting...';
        messageEl.className = 'message success';
        messageEl.classList.remove('hidden');
        
        setTimeout(() => {
            // Check if there's a saved cart and redirect accordingly
            if (cart.length > 0) {
                window.location.href = 'cart.html';
            } else {
                window.location.href = 'index.html';
            }
        }, 1500);
    } else {
        messageEl.textContent = 'Please enter both username and password.';
        messageEl.className = 'message error';
        messageEl.classList.remove('hidden');
    }
}

function setupShopPage() {
    allPizzas = [...pizzaData];
    displayPizzas(allPizzas);
    setupFilters();
    setupSort();
}

function displayPizzas(pizzas) {
    const productsGrid = document.getElementById('products-grid');
    const resultsCount = document.getElementById('results-count');
    
    if (!productsGrid) return;
    
    resultsCount.textContent = pizzas.length;
    
    productsGrid.innerHTML = pizzas.map(pizza => `
        <div class="pizza-card animate-slide-up">
            <img src="${pizza.image}" alt="${pizza.name}">
            <div class="pizza-info">
                <h3>${pizza.name}</h3>
                <p>${pizza.description}</p>
                <div class="pizza-price">$${pizza.price.toFixed(2)}</div>
                <div class="pizza-meta">
                    <span class="category ${pizza.category}">${pizza.category === 'veg' ? '🌱 Vegetarian' : '🍖 Non-Veg'}</span>
                    <span class="size">${pizza.size.charAt(0).toUpperCase() + pizza.size.slice(1)}</span>
                </div>
                <button class="btn btn-primary" onclick="addToCart('${pizza.id}', '${pizza.name}', ${pizza.price}, '${pizza.image}')">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

function setupFilters() {
    // Category filters
    const categoryFilters = document.querySelectorAll('input[name="category"]');
    categoryFilters.forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });
    
    // Size filters
    const sizeFilters = document.querySelectorAll('input[name="size"]');
    sizeFilters.forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });
    
    // Price range filter
    const priceRange = document.getElementById('price-range');
    const maxPriceLabel = document.getElementById('max-price');
    
    if (priceRange) {
        priceRange.addEventListener('input', function() {
            maxPriceLabel.textContent = `$${this.value}`;
            applyFilters();
        });
    }
}

function setupSort() {
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', applySorting);
    }
}

function applyFilters() {
    let filteredPizzas = [...pizzaData];
    
    // Category filter
    const selectedCategory = document.querySelector('input[name="category"]:checked').value;
    if (selectedCategory !== 'all') {
        filteredPizzas = filteredPizzas.filter(pizza => pizza.category === selectedCategory);
    }
    
    // Size filters
    const selectedSizes = Array.from(document.querySelectorAll('input[name="size"]:checked'))
        .map(checkbox => checkbox.value);
    
    if (selectedSizes.length > 0) {
        filteredPizzas = filteredPizzas.filter(pizza => selectedSizes.includes(pizza.size));
    }
    
    // Price filter
    const maxPrice = document.getElementById('price-range').value;
    filteredPizzas = filteredPizzas.filter(pizza => pizza.price <= maxPrice);
    
    allPizzas = filteredPizzas;
    applySorting();
}

function applySorting() {
    const sortBy = document.getElementById('sort-select').value;
    let sortedPizzas = [...allPizzas];
    
    switch(sortBy) {
        case 'name':
            sortedPizzas.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'price-low':
            sortedPizzas.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedPizzas.sort((a, b) => b.price - a.price);
            break;
    }
    
    displayPizzas(sortedPizzas);
}

function clearFilters() {
    // Reset category
    document.querySelector('input[name="category"][value="all"]').checked = true;
    
    // Reset sizes
    document.querySelectorAll('input[name="size"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // Reset price range
    document.getElementById('price-range').value = 25;
    document.getElementById('max-price').textContent = '$25';
    
    // Reset sort
    document.getElementById('sort-select').value = 'name';
    
    // Apply filters
    applyFilters();
}

function setupCartPage() {
    const emptyCart = document.getElementById('empty-cart');
    const cartItems = document.getElementById('cart-items');
    
    if (cart.length === 0) {
        emptyCart.style.display = 'block';
        cartItems.style.display = 'none';
    } else {
        emptyCart.style.display = 'none';
        cartItems.style.display = 'block';
        displayCartItems();
        updateOrderSummary();
    }
    
    // Setup clear cart button
    const clearCartBtn = document.getElementById('clear-cart');
    if (clearCartBtn) {
        clearCartBtn.onclick = () => {
            if (confirm('Are you sure you want to clear your cart?')) {
                clearCart();
            }
        };
    }
    
    // Setup checkout button
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.onclick = handleCheckout;
    }
}

function displayCartItems() {
    const container = document.getElementById('cart-items-container');
    if (!container) return;
    
    container.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="item-info">
                <h3>${item.name}</h3>
                <div class="item-price">$${item.price.toFixed(2)}</div>
            </div>
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="updateQuantity('${item.id}', -1)">
                    <i class="fas fa-minus"></i>
                </button>
                <input type="number" class="quantity" value="${item.quantity}" readonly>
                <button class="quantity-btn" onclick="updateQuantity('${item.id}', 1)">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
            <div class="item-total">$${(item.price * item.quantity).toFixed(2)}</div>
            <button class="remove-btn" onclick="removeFromCart('${item.id}')">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
}

function updateOrderSummary() {
    const subtotal = getCartTotal();
    const deliveryFee = subtotal > 0 ? 3.99 : 0;
    const tax = subtotal * 0.085;
    const total = subtotal + deliveryFee + tax;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('delivery-fee').textContent = `$${deliveryFee.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

function handleCheckout() {
    if (!currentUser) {
        showLoginModal();
        return;
    }
    
    // Simulate checkout process
    showNotification('Order placed successfully! Thank you for your purchase.', 'success');
    cart = [];
    saveCartData();
    updateCartCount();
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
}

function showLoginModal() {
    const modal = document.getElementById('login-modal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeModal() {
    const modal = document.getElementById('login-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Mobile menu setup
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
}

function setupAuthButton() {
    const authBtn = document.getElementById('auth-btn');
    if (authBtn) {
        updateAuthButton();
    }
}

// Utility functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        backgroundColor: type === 'success' ? '#2ecc71' : '#3498db',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        boxShadow: '0 5px 25px rgba(0,0,0,0.15)',
        zIndex: '9999',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        transform: 'translateX(400px)',
        transition: 'transform 0.3s ease'
    });
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('login-modal');
    if (event.target === modal) {
        closeModal();
    }
}

// Handle page navigation animations
function handlePageTransition() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll effects to navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.backgroundColor = 'var(--bg-light)';
            navbar.style.backdropFilter = 'none';
        }
    }
});