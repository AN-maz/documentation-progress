import { formatTitikRibuan, parseKeAngkaMurni } from '../utils/formatter';

export const ProductForm = {
  getValues() {
    return {
      id: document.getElementById('product-id').value,
      name: document.getElementById('input-name').value.trim(),
      price: parseKeAngkaMurni(document.getElementById('input-price').value),
      categoryName: document.getElementById('input-category').value.trim(),
    };
  },

  isiForm(id, name, price, categoryName) {
    document.getElementById('form-title').textContent = 'Edit Produk';
    document.getElementById('product-id').value = id;
    document.getElementById('input-name').value = name;
    
    document.getElementById('input-price').value = formatTitikRibuan(price);
    
    document.getElementById('input-category').value = categoryName;
    document.getElementById('btn-cancel').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  reset() {
    document.getElementById('form-title').textContent = 'Tambah Produk';
    document.getElementById('product-id').value = '';
    document.getElementById('input-name').value = '';
    document.getElementById('input-price').value = '';
    document.getElementById('input-category').value = '';
    document.getElementById('btn-cancel').classList.add('hidden');
  }
};