<script>
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = 0;

const checkoutList = document.getElementById("checkoutList");
const checkoutTotal = document.getElementById("checkoutTotal");

/* SIMPAN CART */
function simpanCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* TAMPILKAN CART */
function renderCart() {
  checkoutList.innerHTML = "";
  total = 0;

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "checkout-item";
    div.innerHTML = `
      ${item.nama} - Rp ${item.harga.toLocaleString()}
      <span style="float:right;cursor:pointer;color:red"
        onclick="hapusItem(${index})">❌</span>
    `;
    checkoutList.appendChild(div);
    total += item.harga;
  });

  checkoutTotal.innerText = "Total: Rp " + total.toLocaleString();
}

/* TAMBAH KE CART */
function tambahCart(nama, harga) {
  cart.push({ nama, harga });
  simpanCart();
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
