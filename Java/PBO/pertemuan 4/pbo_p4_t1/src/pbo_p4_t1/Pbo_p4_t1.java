package pbo_p4_t1;

import java.util.Scanner;

/**
 *
 * @author yan
 */
public class Pbo_p4_t1 {

    public static void main(String[] args) {
        // TODO code application logic here

        Scanner input = new Scanner(System.in);

        // Array menu dan harga
        String[] menu = {"Kopi Gula Aren", "Green Tea", "Thai Tea"};
        int[] harga = {18000, 20000, 17000};

        System.out.println("=== SELAMAT DATANG DI CAFFE JAVA BEANS ===");
        System.out.println("Daftar Menu:");
        for (int i = 0; i < menu.length; i++) {
            System.out.println((i + 1) + ". " + menu[i] + " - Rp" + harga[i]);
        }

        System.out.print("\nPilih menu (1-3): ");
        int pilihan = input.nextInt();

        String pesanan = "";
        int total = 0;

        switch (pilihan) {
            case 1:
                pesanan = menu[0];
                total = harga[0];
                break;
            case 2:
                pesanan = menu[1];
                total = harga[1];
                break;
            case 3:
                pesanan = menu[2];
                total = harga[2];
                break;
            default:
                System.out.println("Menu tidak tersedia!");
                return;
        }

        System.out.print("Masukkan jumlah pesanan: ");
        int jumlah = input.nextInt();

        total *= jumlah;

        int diskon = 0;
        if (total >= 50000) {
            diskon = total * 10 / 100;
            System.out.println("Selamat! Anda mendapat diskon 10%");
        } else if (total >= 30000) {
            diskon = total * 5 / 100;
            System.out.println("Anda mendapat diskon 5%");
        } else {
            System.out.println("Belum ada diskon untuk pembelian ini.");
        }

        int totalBayar = total - diskon;

        System.out.println("\n=== STRUK PEMBAYARAN ===");
        System.out.println("Pesanan : " + pesanan);
        System.out.println("Jumlah  : " + jumlah);
        System.out.println("Total   : Rp" + total);
        System.out.println("Diskon  : Rp" + diskon);
        System.out.println("Bayar   : Rp" + totalBayar);
        System.out.println("==========================");
        System.out.println("Terima kasih telah berbelanja di CaffeQu");

        input.close();
    }

}
