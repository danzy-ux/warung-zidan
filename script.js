const nomorWA = "6285158765900";
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function simpanCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function formatRupiah(angka) {
  return "Rp " + angka.toLocaleString("id-ID");
}

function tambahCart(nama, harga) {
  const item = cart.find(p => p.nama === nama);
  if (item) {
    item.qty++;
  } else {
    cart.push({ nama, harga, qty: 1 });
  }
  simpanCart();
  renderCart();
}

function renderCart() {
  const list = document.getElementById("checkoutList");
  const totalEl = document.getElementById("checkoutTotal");

  list.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const subtotal = item.harga * item.qty;
    total += subtotal;

    list.innerHTML += `
      <div class="checkout-item">
        ${item.nama} x${item.qty}
        <b>${formatRupiah(subtotal)}</b>
      </div>
    `;
  });

  totalEl.innerText = "Total: " + formatRupiah(total);
}

function kosongkanCart() {
  cart = [];
  simpanCart();
  renderCart();
}

function tampilInvoice() {
  if (cart.length === 0) {
    alert("Keranjang kosong");
    return;
  }

  const list = document.getElementById("invoiceList");
  const totalEl = document.getElementById("invoiceTotal");
  const noteEl = document.getElementById("invoiceNote");

  list.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const subtotal = item.harga * item.qty;
    total += subtotal;

    list.innerHTML += `
      <div style="display:flex;justify-content:space-between;font-size:14px">
        <span>${item.nama} x${item.qty}</span>
        <span>${formatRupiah(subtotal)}</span>
      </div>
    `;
  });

  totalEl.innerText = formatRupiah(total);

  const catatan = document.getElementById("catatan").value;
  noteEl.innerText = catatan ? "📝 " + catatan : "";

  document.getElementById("invoice").style.display = "block";
}

function kirimWA() {
  let pesan = "Halo kak, saya pesan:%0A";
  let total = 0;

  cart.forEach(item => {
    const subtotal = item.harga * item.qty;
    pesan += `- ${item.nama} x${item.qty} (${formatRupiah(subtotal)})%0A`;
    total += subtotal;
  });

  pesan += `%0ATotal: ${formatRupiah(total)}`;
  window.open(`https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`);
}

window.onload = renderCart;
  renderCart();
}

/* HAPUS SATU ITEM */
function hapusItem(index) {
  cart.splice(index, 1);
  simpanCart();
  renderCart();
}

/* KOSONGKAN CART */
function kosongkanCart() {
  if (confirm("Hapus semua keranjang?")) {
    cart = [];
    simpanCart();
    renderCart();
  }
}

/* KIRIM KE WHATSAPP */
function kirimWA() {
  if (cart.length === 0) {
    alert("Keranjang masih kosong");
    return;
  }

  let pesan = "Pesanan Warung Zidan:%0A";
  cart.forEach(item => {
    pesan += `- ${item.nama} (Rp ${item.harga.toLocaleString()})%0A`;
  });

  pesan += `%0ATotal: Rp ${total.toLocaleString()}`;

  const catatan = document.getElementById("catatan").value;
  if (catatan) {
    pesan += `%0ACatatan: ${catatan}`;
  }

  const noWA = "6281234567890"; // GANTI NOMOR WA
  window.open(`https://wa.me/${noWA}?text=${pesan}`, "_blank");
}

/* LOAD CART SAAT APK / WEB DIBUKA */
renderCart();
</script>
