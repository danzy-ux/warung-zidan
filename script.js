const nomorWA = "6285158765900";
let cart = [];

function formatRupiah(a){
  return "Rp " + a.toLocaleString("id-ID");
}

function tambahCart(nama, harga){
  let item = cart.find(p => p.nama === nama);
  if(item){
    item.qty++;
  } else {
    cart.push({ nama, harga, qty: 1 });
  }
  renderCart();
}

function renderCart(){
  const list = document.getElementById("checkoutList");
  const totalEl = document.getElementById("checkoutTotal");

  list.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    let subtotal = item.harga * item.qty;
    total += subtotal;
    list.innerHTML += `
      <div class="checkout-item">
        ${item.nama} x${item.qty} (${formatRupiah(subtotal)})
      </div>
    `;
  });

  totalEl.innerText = "Total: " + formatRupiah(total);
}

function kosongkanCart(){
  cart = [];
  renderCart();
}

function kirimWA(){
  if(cart.length === 0){
    alert("Keranjang masih kosong!");
    return;
  }

  let pesan = "Halo kak, saya ingin pesan:%0A";
  let total = 0;

  cart.forEach(item => {
    let subtotal = item.harga * item.qty;
    pesan += `- ${item.nama} x${item.qty} (${formatRupiah(subtotal)})%0A`;
    total += subtotal;
  });

  let catatan = document.getElementById("catatan").value.trim();
  if(catatan){
    pesan += `%0A📝 Catatan:%0A${encodeURIComponent(catatan)}%0A`;
  }

  pesan += `%0ATotal: ${formatRupiah(total)}`;
  window.open(`https://wa.me/${nomorWA}?text=${pesan}`, "_blank");
}
