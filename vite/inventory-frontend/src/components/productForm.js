export const ProductForm = {
  getValues() {
    return {
      id: document.getElementById("product-id").value,
      name: document.getElementById("input-name").value.trim(),
      price: document.getElementById("input-price").value,
      categoryId: document.getElementById("input-category").value,
    };
  },

  isiForm(id, name, price, categoryId) {
    document.getElementById("form-title").textContent = "Edit Produk";
    document.getElementById("product-id").value = id;
    document.getElementById("input-name").value = name;
    document.getElementById("input-price").value = price;
    document.getElementById("input-category").value = categoryId;
    document.getElementById("btn-cancel").classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  },

  reset() {
    document.getElementById("form-title").textContent = "Tambah Produk";
    document.getElementById("product-id").value = "";
    document.getElementById("input-name").value = "";
    document.getElementById("input-price").value = "";
    document.getElementById("input-category").value = "";
    document.getElementById("btn-cancel").classList.add("hidden");
  },
};
