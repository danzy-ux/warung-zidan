// =========================
// CART WARUNG ZIDAN (FINAL)
// =========================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// SIMPAN CART
function simpanCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// UPDATE BADGE (opsional)
function updateBadge() {
  const badge = document.getElementById("cartBadge");
  if (!badge) return;

  const totalQty = cart.reduce((a, b) => a + b.qty, 0);
  badge.innerText = totalQty;
  badge.style.display = totalQty > 0 ? "inline-block" : "none";
}

// TAMBAH KE KERANJANG
function tambahCart(nama, harga) {
  const item = cart.find(p => p.nama === nama);

  if (item) item.qty++;
  else cart.push({ nama, harga, qty: 1 });

  simpanCart();
  renderCart();
  updateBadge();
}

// BELI SEKARANG
function beliSekarang(nama, harga) {
  cart = [{ nama, harga, qty: 1 }];
  simpanCart();
  renderCart();
  updateBadge();
  tampilInvoice();
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
    div.style.display = "flex";
    div.style.justifyContent = "space-between";
    div.style.alignItems = "center";
    div.style.marginBottom = "8px";

    div.innerHTML = `
      <div>
        <b>${item.nama}</b><br>
        <small>Rp ${subtotal.toLocaleString("id-ID")}</small>
      </div>
      <div>
        <button onclick="kurangQty(${index})">−</button>
        <b style="margin:0 6px">${item.qty}</b>
        <button onclick="tambahQty(${index})">+</button>
      </div>
    `;
    list.appendChild(div);
  });

  totalEl.innerText = "Total: Rp " + total.toLocaleString("id-ID");
}

// =========================
// CHECKOUT / INVOICE
// =========================
function tampilInvoice() {
  if (cart.length === 0) {
    alert("Keranjang masih kosong");
    return;
  }

  document.getElementById("invoice").style.display = "block";

  const list = document.getElementById("invoiceList");
  const totalEl = document.getElementById("invoiceTotal");
  const note = document.getElementById("invoiceNote");

  list.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const subtotal = item.harga * item.qty;
    total += subtotal;

    const div = document.createElement("div");
    div.innerHTML = `${item.nama} x ${item.qty} = Rp ${subtotal.toLocaleString("id-ID")}`;
    list.appendChild(div);
  });

  totalEl.innerText = "Rp " + total.toLocaleString("id-ID");
  note.innerText = "Catatan: " + document.getElementById("catatan").value;
}

// =========================
// KIRIM WHATSAPP
// =========================
function kirimWA() {
  let pesan = "🧾 *Pesanan Warung Zidan*\n\n";
  let total = 0;

  cart.forEach(item => {
    const subtotal = item.harga * item.qty;
    total += subtotal;
    pesan += `• ${item.nama} x ${item.qty} = Rp ${subtotal.toLocaleString("id-ID")}\n`;
  });

  pesan += `\nTotal: Rp ${total.toLocaleString("id-ID")}`;
  pesan += `\nCatatan: ${document.getElementById("catatan").value}`;

  const nomorWA = "6281234567890"; // GANTI NOMOR
  window.open(`https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`);
}

// LOAD AWAL
renderCart();
updateBadge();
function closeModalOnOutsideClick(e) {
    const modalContent = document.querySelector('.modal-content');
    // Jika yang diklik adalah background hitamnya (bukan kotaknya), maka tutup
    if (e.target.id === 'cart-modal') {
        toggleModal('cart-modal');
    }
}
