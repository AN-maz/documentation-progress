public class App {
    public static void main(String[] args) throws Exception {

        System.out.println("--- Encapculation ---");
        Pegawai p = new Pegawai("Purwa", 50_000.0);

        System.out.println("Nama Pegawai: " + p.getNama());
        System.out.println("Gaji Awal: " + p.getGaji());

        p.setGaji(10_000.0);
        System.out.println("Gaji Akhir:" + p.getGaji());

        System.out.println("\n---Inheritance & Polymorphism---");
        Kucing k = new Kucing();
        k.tidur();
        Hewan h1 = new Hewan();
        h1.bersuara();

        System.out.println("\n---Abstrak---");
        Lingkaran l = new Lingkaran(7.0);
        l.displayInfo();
        double luas = l.hitungLuas();
        System.out.printf("Luas Lingkaran: %.2f\n",luas);
    }
}
