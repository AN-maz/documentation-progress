package p2.mahasiswa;

/**
 *
 * @author Andrian Maulana Dzikwan
 */
public class Mahasiswa {

    String membaca;
    int buku;
    String nyontek;
    int nilaiBerkurang;
    String modifikasi;
    int nilaiTambah;

    public static void main(String[] args) {

        Mahasiswa mahasiswaBaru = new Mahasiswa();

        mahasiswaBaru.membaca = "Buku buku";
        mahasiswaBaru.nyontek = "Nilainya berkurang";
        mahasiswaBaru.modifikasi = "NilaiTambah";

        System.out.println("mahasiswa mahasiswaku" + mahasiswaBaru.membaca);
        System.out.println("mahasiswaku nyontek pas UTS: " + mahasiswaBaru);
        System.out.println("mahasiswaku memodifikasi: " + mahasiswaBaru.modifikasi);

    }

    String getAlamat() {
        throw new UnsupportedOperationException("Not yet implemented");
    }

    String getNIM() {
        throw new UnsupportedOperationException("Not yet implemeted");
    }
    
    String getNama(){
        throw new UnsupportedOperationException("Not yet implemeted"); 
    }

}
