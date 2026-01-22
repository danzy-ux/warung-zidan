const nomorWA = "6285158765900";

const produk = [
  { nama: "Kolang Kaling", harga: 13000, gambar: "img/kolang.jpg" },
  { nama: "Cireng Ayam Suwir", harga: 1000, gambar: "img/cireng.jpg" },
  { nama: "Risol", harga: 1000, gambar: "img/risol.jpg" }
];

const grid = document.getElementById("produkGrid");
const cartList = document.getElementById("cartList");
const totalHargaEl = document.getElementById("totalHarga");

let cart = [];

function formatRupiah(angka) {
  return "Rp " + angka.toLocaleString("id-ID");
}

/* ===== PRODUK ===== */
produk.forEach((item, index) => {
  grid.innerHTML += `
    <div class="produk">
      <img src="${item.gambar}">
      <h3>${item.nama}</h3>
      <p class="harga">${formatRupiah(item.harga)}</p>
      <button onclick="tambahCart(${index})">Tambah</button>
    </div>
  `;
});

/* ===== CART ===== */
function tambahCart(index) {
  const item = cart.find(i => i.nama === produk[index].nama);

  if (item) {
    item.qty++;
  } else {
    cart.push({
      nama: produk[index].nama,
      harga: produk[index].harga,
      qty: 1
    });
  }

  renderCart();
}

function renderCart() {
  cartList.innerHTML = "";
  let total = 0;

  cart.forEach((item, i) => {
    total += item.harga * item.qty;

    cartList.innerHTML += `
      <div class="cart-item">
        <span>${item.nama}</span>

        <div class="qty">
          <button onclick="kurang(${i})">−</button>
          <strong>${item.qty}</strong>
          <button onclick="tambah(${i})">+</button>
        </div>

        <button class="hapus" onclick="hapusItem(${i})">❌</button>
      </div>
    `;
  });

  totalHargaEl.innerText = "Total: " + formatRupiah(total);
}

function tambah(i) {
  cart[i].qty++;
  renderCart();
}

function kurang(i) {
  cart[i].qty--;
  if (cart[i].qty <= 0) cart.splice(i, 1);
  renderCart();
}

function hapusItem(i) {
  cart.splice(i, 1);
  renderCart();
}

/* ===== WHATSAPP ===== */
function kirimWA() {
  if (cart.length === 0) {
    alert("Keranjang masih kosong!");
    return;
  }

  let pesan = "Halo kak, saya ingin pesan:%0A";
  let total = 0;

  cart.forEach(item => {
    pesan += `- ${item.nama} x${item.qty} (${formatRupiah(item.harga * item.qty)})%0A`;
    total += item.harga * item.qty;
  });

  pesan += `%0ATotal: ${formatRupiah(total)}`;

  window.open(`https://wa.me/${nomorWA}?text=${pesan}`, "_blank");
}
