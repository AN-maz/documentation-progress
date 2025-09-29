// Enkapsulasi

public class Pegawai {

    private String nama;
    private double gaji;

    public Pegawai(String nama, double gaji) {
        this.nama = nama;
        this.gaji = gaji;
    }

    public String getNama() {
        return nama;
    }

    public void setGaji(double gajiBaru) {
        if (gajiBaru > this.gaji) {
            this.gaji = gajiBaru;
            System.out.println(nama + " Mendapatkan kenaikan gaji");
        }else{
            System.out.println("Gagal! Gaji baru harus lebih tinggi dari gaji saat ini.");
        }
    }

    public double getGaji(){
        return gaji;
    }
}
