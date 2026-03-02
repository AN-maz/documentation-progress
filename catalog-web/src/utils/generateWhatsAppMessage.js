export const generateWhatsAppMessage = (cartItems, totalAmount) => {
    // Ganti dengan nomor WhatsApp pemilik toko
    const phoneNumber = "6281234567890";

    let message = "Halo, saya ingin memesan:\n\n";

    cartItems.forEach((item, index) => {
        message += `${index + 1}. ${item.name} (${item.quantity} ${item.unit})\n`;
        message += `   Harga: Rp ${item.price.toLocaleString("id-ID")} x ${item.quantity}\n`;
        message += `   Subtotal: Rp ${(item.price * item.quantity).toLocaleString("id-ID")}\n\n`;
    });

    message += `*Total Belanja: Rp ${totalAmount.toLocaleString("id-ID")}*\n\n`;
    message += "Tolong dikirim ke alamat saya. Terima kasih!";

    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};
