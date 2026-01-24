// =========================
// CART WARUNG ZIDAN (FIXED)
// =========================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// SIMPAN CART
function simpanCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// UPDATE BADGE
function updateBadge() {
  const badge = document.getElementById("cartBadge");
  const totalQty = cart.reduce((a, b) => a + b.qty, 0);

  if (badge) {
    badge.innerText = totalQty;
    badge.style.display = totalQty > 0 ? "inline-block" : "none";
  }
}

// TAMBAH KE KERANJANG
function tambahCart(nama, harga) {
  const item = cart.find(p => p.nama === nama);

  if (item) {
    item.qty += 1;
  } else {
    cart.push({ nama, harga, qty: 1 });
  }

  simpanCart();
  renderCart();
  updateBadge();
}

// BELI SEKARANG (langsung 1 item)
function beliSekarang(nama, harga) {
  cart = [{ nama, harga, qty: 1 }];
  simpanCart();
  renderCart();
  updateBadge();
  alert("Produk ditambahkan, silakan checkout");
}

// KURANGI QTY
function kurangQty(index) {
  cart[index].qty--;
  if (cart[index].qty <= 0) cart.splice(index, 1);

  simpanCart();
  renderCart();
  updateBadge();
}

// TAMBAH QTY
function tambahQty(index) {
  cart[index].qty++;
  simpanCart();
  renderCart();
  updateBadge();
}

// HAPUS SEMUA
function kosongkanCart() {
  if (!confirm("Hapus semua isi keranjang?")) return;
  cart = [];
  simpanCart();
  renderCart();
  updateBadge();
}

// TAMPILKAN CART
function renderCart() {
  const list = document.getElementById("checkoutList");
  const totalEl = document.getElementById("checkoutTotal");

  if (!list || !totalEl) return;

  list.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const subtotal = item.harga * item.qty;
    total += subtotal;

    const div = document.createElement("div");
    div.className = "checkout-item";
    div.innerHTML = `
      <span>
        <b>${item.nama}</b><br>
        Rp ${subtotal.toLocaleString("id-ID")}
      </span>
      <div>
        <button onclick="kurangQty(${index})">−</button>
        <b>${item.qty}</b>
        <button onclick="tambahQty(${index})">+</button>
      </div>
    `;
    list.appendChild(div);
  });

  totalEl.innerText = "Total: Rp " + total.toLocaleString("id-ID");
}

// LOAD SAAT BUKA
renderCart();
updateBadge();
