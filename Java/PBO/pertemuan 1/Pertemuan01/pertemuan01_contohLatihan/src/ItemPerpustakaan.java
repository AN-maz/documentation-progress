public abstract class ItemPerpustakaan {

    private String judul;
    private int TahunTerbit;

    public ItemPerpustakaan(String judul, int TahunTerbit) {
        this.judul = judul;
        this.TahunTerbit = TahunTerbit;
    }

    public String getJudul() {
        return judul;
    }

    public int getTahunTerbit() {
        return TahunTerbit;
    }

    public abstract void displayInfo();

    public void statusKetersediaan() {
        System.out.println("Status: Item tersedia di rak.");
    }
}
