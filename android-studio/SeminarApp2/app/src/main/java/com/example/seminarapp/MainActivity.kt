package com.example.seminarapp

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val btnDaftar = findViewById<Button>(R.id.btnDaftarSeminar)

        btnDaftar.setOnClickListener {

            val intent = Intent(this, FormActivity::class.java)
            startActivity(intent)
        }
    }
}