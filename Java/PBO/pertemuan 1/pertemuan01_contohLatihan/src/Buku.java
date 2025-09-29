public class Buku extends ItemPerpustakaan {

    private String penulis;

    public Buku(String judul, int TahunTerbit, String penulis) {
        super(judul, TahunTerbit);
        this.penulis = penulis;
    }

    @Override
    public void displayInfo() {
        System.out.println("---Detail Buku---");
        System.out.println("Judul: " + getJudul());
        System.out.println("Penulis: " + penulis);
        System.out.println("Tahun: " + getTahunTerbit());
    }

    @Override
    public void statusKetersediaan(){
        System.out.println("Status: Buku siap dipinjam (Rak. A)");
    }
}
