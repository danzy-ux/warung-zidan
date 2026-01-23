// =========================
// CART WARUNG ZIDAN
// =========================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// SIMPAN CART
function simpanCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// TAMBAH PRODUK
function tambahCart(nama, harga) {
  const item = cart.find(p => p.nama === nama);

  if (item) {
    item.qty += 1;
  } else {
    cart.push({ nama, harga, qty: 1 });
  }

  simpanCart();
  renderCart();
}

// HAPUS CART
function kosongkanCart() {
  if (!confirm("Hapus semua isi keranjang?")) return;
  cart = [];
  simpanCart();
  renderCart();
}

// TAMPILKAN CART
function renderCart() {
  const list = document.getElementById("checkoutList");
  const totalEl = document.getElementById("checkoutTotal");

  list.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const subtotal = item.harga * item.qty;
    total += subtotal;

    const div = document.createElement("div");
    div.className = "checkout-item";
    div.innerHTML = `
      ${item.nama} x ${item.qty}
      <b>Rp ${subtotal.toLocaleString("id-ID")}</b>
    `;
    list.appendChild(div);
  });

  totalEl.innerText = "Total: Rp " + total.toLocaleString("id-ID");
}

// INVOICE
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
    div.innerHTML = `
      ${item.nama} x ${item.qty}
      <b>Rp ${subtotal.toLocaleString("id-ID")}</b>
    `;
    list.appendChild(div);
  });

  totalEl.innerText = "Rp " + total.toLocaleString("id-ID");
  note.innerText = "Catatan: " + document.getElementById("catatan").value;
}

// KIRIM WHATSAPP
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

  const nomorWA = "6281234567890"; // GANTI NOMOR KAMU
  window.open(`https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`);
}

// LOAD SAAT BUKA
renderCart();
