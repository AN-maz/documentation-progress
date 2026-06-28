/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package model;

import java.sql.Date;
import java.sql.Time;

/**
 *
 * @author : Purwa | Andrian M.D
 *
 * Created : 28 Jun 2026
 */
public class Pengerjaan {

    private int idPengerjaan;
    private String pengguna;
    private int skor;
    private Date tanggalPengerjaan;
    private Time jamPengerjaan;

    public Pengerjaan() {
    }

    // Getter dan Setter
    public int getIdPengerjaan() {
        return idPengerjaan;
    }

    public void setIdPengerjaan(int idPengerjaan) {
        this.idPengerjaan = idPengerjaan;
    }

    public String getPengguna() {
        return pengguna;
    }

    public void setPengguna(String pengguna) {
        this.pengguna = pengguna;
    }

    public int getSkor() {
        return skor;
    }

    public void setSkor(int skor) {
        this.skor = skor;
    }

    public Date getTanggalPengerjaan() {
        return tanggalPengerjaan;
    }

    public void setTanggalPengerjaan(Date tanggalPengerjaan) {
        this.tanggalPengerjaan = tanggalPengerjaan;
    }

    public Time getJamPengerjaan() {
        return jamPengerjaan;
    }

    public void setJamPengerjaan(Time jamPengerjaan) {
        this.jamPengerjaan = jamPengerjaan;
    }

}
