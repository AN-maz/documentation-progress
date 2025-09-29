public class App {
    public static void main(String[] args) throws Exception {

        Buku Novel = new Buku("Laskar Pelangi", 2005, "Andrea Hirata");
        Buku Fiksi = new Buku("Negeri 5 Menara", 2009, "Ahmad Fuadi");
        
        
        ItemPerpustakaan[] koleksi = new ItemPerpustakaan[2];
        koleksi[0] = Novel;
        koleksi[1] = Fiksi;

        
        System.out.println("---Sistem Informasi Perpustaan---");

        for(ItemPerpustakaan item : koleksi){
            item.displayInfo();
            item.statusKetersediaan();
            System.out.println("----------");
        }
    }
}
