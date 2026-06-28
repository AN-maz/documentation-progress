/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package config;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 *
 * @author : Purwa | Andrian M.D
 *
 * Created : 28 Jun 2026
 */
public class KoneksiDB {

    public static Connection dB_koneksi() throws SQLException {
        String dB = "jdbc:mysql://localhost:3306/db_detektif_cilik";
        String user = "root";
        String pass = "";

        DriverManager.registerDriver(new com.mysql.jdbc.Driver());
        return DriverManager.getConnection(dB, user, pass);
    }

}
