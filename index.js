const products = [
  { id: 1, name: "T-shirt", price: 20, image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=150&q=80"},
  { id: 2, name: "Jeans", price: 40, image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=150&q=80" },
  { id: 3, name: "Sneakers", price: 60, image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=150&q=80" },
];

const productsDiv = document.getElementById("products");
const cartDiv = document.getElementById("cart");
const totalSpan = document.getElementById("total");

let cart = [];

function renderProducts() {
  productsDiv.innerHTML = "";
  products.forEach((product) => {
    const productEl = document.createElement("div");
    productEl.className = "product";
    productEl.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>$${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productsDiv.appendChild(productEl);
  });
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const cartItem = cart.find((item) => item.id === productId);

  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
}

function renderCart() {
  if (cart.length === 0) {
    cartDiv.innerHTML = "<p>No items in cart.</p>";
    totalSpan.textContent = "0";
    return;
  }

  cartDiv.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const itemEl = document.createElement("div");
    itemEl.className = "cart-item";
    itemEl.innerHTML = `
      <span>${item.name} (x${item.quantity})</span>
      <span>$${item.price * item.quantity}</span>
    `;
    cartDiv.appendChild(itemEl);

    total += item.price * item.quantity;
  });

  totalSpan.textContent = total.toFixed(2);
}

// Initial render
renderProducts();
renderCart();
