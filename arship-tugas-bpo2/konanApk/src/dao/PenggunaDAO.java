/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package dao;

import config.KoneksiDB;
import model.Pengguna;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 *
 * @author : Purwa | Andrian M.D
 *
 * Created : 28 Jun 2026
 */
public class PenggunaDAO {

    public Pengguna cekLogin(String nama) {
        Pengguna pengguna = null;
        // Native SQL Query untuk mencari pengguna berdasarkan nama
        String sql = "SELECT * FROM hak_akses WHERE nama = ?";

        try (Connection conn = KoneksiDB.dB_koneksi(); PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, nama);
            ResultSet rs = ps.executeQuery();

            if (rs.next()) {
                pengguna = new Pengguna();
                pengguna.setIdPengguna(rs.getString("id_pengguna"));
                pengguna.setNama(rs.getString("nama"));
                pengguna.setLevel(rs.getInt("level"));
            }
        } catch (SQLException e) {
            System.out.println("Error Login: " + e.getMessage());
        }

        return pengguna;
    }

}
