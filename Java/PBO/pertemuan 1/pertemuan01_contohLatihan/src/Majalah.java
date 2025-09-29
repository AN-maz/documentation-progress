public class Majalah extends ItemPerpustakaan {

    private int edisi;

    public Majalah(String judul, int TahunTerbit, int edisi) {
        super(judul, TahunTerbit);
        this.edisi = edisi;
    }

    @Override
    public void displayInfo() {
        System.out.println("---Detail Buku---");
        System.out.println("Judul: " + getJudul());
        System.out.println("Edisi: " + edisi);
        System.out.println("Tahun: " + getTahunTerbit());
    }

    @Override
    public void statusKetersediaan() {
        System.out.println("Status: Majalah ada di ruang baca (Rak M).");
    }
}
