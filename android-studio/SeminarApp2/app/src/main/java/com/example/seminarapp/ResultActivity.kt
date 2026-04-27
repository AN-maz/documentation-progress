package com.example.seminarapp

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity

class ResultActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_result)

        val tvResName = findViewById<TextView>(R.id.tvResName)
        val tvResEmail = findViewById<TextView>(R.id.tvResEmail)
        val tvResPhone = findViewById<TextView>(R.id.tvResPhone)
        val tvResGender = findViewById<TextView>(R.id.tvResGender)
        val tvResSeminar = findViewById<TextView>(R.id.tvResSeminar)
        val btnBackToHome = findViewById<Button>(R.id.btnBackToHome)

        // Menangkap data lemparan dari FormActivity
        tvResName.text = "${intent.getStringExtra("EXTRA_NAME")}"
        tvResEmail.text = "${intent.getStringExtra("EXTRA_EMAIL")}"
        tvResPhone.text = "${intent.getStringExtra("EXTRA_PHONE")}"
        tvResGender.text = "${intent.getStringExtra("EXTRA_GENDER")}"
        tvResSeminar.text = "${intent.getStringExtra("EXTRA_SEMINAR")}"

        // Tombol Kembali
        btnBackToHome.setOnClickListener {
            val intent = Intent(this, MainActivity::class.java)
            intent.flags = Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_SINGLE_TOP
            startActivity(intent)
            finish()
        }
    }
}