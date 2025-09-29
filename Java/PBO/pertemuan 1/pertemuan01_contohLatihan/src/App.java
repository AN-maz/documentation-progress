public class App {
    public static void main(String[] args) throws Exception {

        Buku Novel = new Buku("Laskar Pelangi", 2005, "Andrea Hirata");
        Buku Fiksi = new Buku("Negeri 5 Menara", 2009, "Ahmad Fuadi");
        Majalah Tempo = new Majalah("Sejarah Bahlil", 2025, 1);
        
        ItemPerpustakaan[] koleksi = new ItemPerpustakaan[3];
        koleksi[0] = Novel;
        koleksi[1] = Fiksi;
        koleksi[2] = Tempo;
        
        System.out.println("---Sistem Informasi Perpustaan---");

        for(ItemPerpustakaan item : koleksi){
            item.displayInfo();
            item.statusKetersediaan();
            System.out.println("----------");
        }
    }
}
