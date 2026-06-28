/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package dao;

import config.KoneksiDB;
import model.Pengerjaan;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author : Purwa | Andrian M.D
 *
 * Created : 28 Jun 2026
 */
public class PengerjaanDAO {

    // 1. Menyimpan hasil pengerjaan soal (Dipakai setelah selesai kuis 10 soal)
    public boolean simpanHasil(String namaPengguna, int skor) {
        String sql = "INSERT INTO pengerjaan_soal (pengguna, skor, tanggal_pengerjaan, jam_pengerjaan) VALUES (?, ?, CURDATE(), CURTIME())";
        try (Connection conn = KoneksiDB.dB_koneksi(); PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, namaPengguna);
            ps.setInt(2, skor);
            return ps.executeUpdate() > 0;

        } catch (SQLException e) {
            System.out.println("Error simpan hasil: " + e.getMessage());
            return false;
        }
    }

    // 2. Menampilkan semua hasil (Untuk Level 1 - Terurut berdasarkan pengguna dan waktu)
    public List<Pengerjaan> ambilSemuaHasil() {
        List<Pengerjaan> daftar = new ArrayList<>();
        String sql = "SELECT * FROM pengerjaan_soal ORDER BY pengguna ASC, tanggal_pengerjaan DESC, jam_pengerjaan DESC";

        try (Connection conn = KoneksiDB.dB_koneksi(); Statement st = conn.createStatement(); ResultSet rs = st.executeQuery(sql)) {

            while (rs.next()) {
                Pengerjaan p = new Pengerjaan();
                p.setIdPengerjaan(rs.getInt("id_pengerjaan"));
                p.setPengguna(rs.getString("pengguna"));
                p.setSkor(rs.getInt("skor"));
                p.setTanggalPengerjaan(rs.getDate("tanggal_pengerjaan"));
                p.setJamPengerjaan(rs.getTime("jam_pengerjaan"));
                daftar.add(p);
            }
        } catch (SQLException e) {
            System.out.println("Error ambil semua hasil: " + e.getMessage());
        }
        return daftar;
    }

    // 3. Menampilkan hasil per user saja (Untuk Level 2)
    public List<Pengerjaan> ambilHasilPerUser(String namaPengguna) {
        List<Pengerjaan> daftar = new ArrayList<>();
        String sql = "SELECT * FROM pengerjaan_soal WHERE pengguna = ? ORDER BY tanggal_pengerjaan DESC, jam_pengerjaan DESC";

        try (Connection conn = KoneksiDB.dB_koneksi(); PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, namaPengguna);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    Pengerjaan p = new Pengerjaan();
                    p.setIdPengerjaan(rs.getInt("id_pengerjaan"));
                    p.setPengguna(rs.getString("pengguna"));
                    p.setSkor(rs.getInt("skor"));
                    p.setTanggalPengerjaan(rs.getDate("tanggal_pengerjaan"));
                    p.setJamPengerjaan(rs.getTime("jam_pengerjaan"));
                    daftar.add(p);
                }
            }
        } catch (SQLException e) {
            System.out.println("Error ambil hasil per user: " + e.getMessage());
        }
        return daftar;
    }

    // 4. Mengubah data skor (Fungsi "ubah" untuk Level 1)
    public boolean ubahSkor(int idPengerjaan, int skorBaru) {
        String sql = "UPDATE pengerjaan_soal SET skor = ? WHERE id_pengerjaan = ?";
        try (Connection conn = KoneksiDB.dB_koneksi(); PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, skorBaru);
            ps.setInt(2, idPengerjaan);
            return ps.executeUpdate() > 0;

        } catch (SQLException e) {
            System.out.println("Error ubah data: " + e.getMessage());
            return false;
        }
    }

    // 5. Menghapus data pengerjaan (Fungsi "hapus" untuk Level 1)
    public boolean hapusPengerjaan(int idPengerjaan) {
        String sql = "DELETE FROM pengerjaan_soal WHERE id_pengerjaan = ?";
        try (Connection conn = KoneksiDB.dB_koneksi(); PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, idPengerjaan);
            return ps.executeUpdate() > 0;

        } catch (SQLException e) {
            System.out.println("Error hapus data: " + e.getMessage());
            return false;
        }
    }

    // Mengecek dan mengunci operator (Return true jika berhasil dapat akses)
    public boolean kunciOperator(String operator, String namaUser) {
        // Query UPDATE ini otomatis mencegah bentrok (Race Condition)
        String sql = "UPDATE operator_kuis SET sedang_dipakai = 1, pengguna = ? WHERE nama_operator = ? AND sedang_dipakai = 0";
        try (Connection conn = config.KoneksiDB.dB_koneksi(); PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, namaUser);
            ps.setString(2, operator);
            return ps.executeUpdate() > 0; // Jika > 0 berarti berhasil mengunci
        } catch (SQLException e) {
            System.out.println("Error kunci operator: " + e.getMessage());
            return false;
        }
    }

    // Membuka kunci operator setelah selesai kuis
    public void bukaKunciOperator(String operator) {
        String sql = "UPDATE operator_kuis SET sedang_dipakai = 0, pengguna = NULL WHERE nama_operator = ?";
        try (Connection conn = config.KoneksiDB.dB_koneksi(); PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, operator);
            ps.executeUpdate();
        } catch (SQLException e) {
            System.out.println("Error buka kunci: " + e.getMessage());
        }
    }
}
