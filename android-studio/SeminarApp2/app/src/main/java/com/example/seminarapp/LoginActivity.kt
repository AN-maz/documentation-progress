package com.example.seminarapp

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity

class LoginActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        val etUsername = findViewById<EditText>(R.id.etUsername)
        val etPassword = findViewById<EditText>(R.id.etPassword)
        val btnLogin = findViewById<Button>(R.id.btnLogin)
        val tvErrorMessage = findViewById<TextView>(R.id.tvErrorMessage)

        btnLogin.setOnClickListener {
            val username = etUsername.text.toString().trim()
            val password = etPassword.text.toString().trim()

            tvErrorMessage.visibility = View.GONE

            if (username.isEmpty() || password.isEmpty()) {
                tvErrorMessage.text = "Username dan password tidak boleh kosong!"
                tvErrorMessage.visibility = View.VISIBLE
                return@setOnClickListener
            }


            if (username == "admin" && password == "admin123") {
                Toast.makeText(this, "Login Berhasil", Toast.LENGTH_SHORT).show()
                val intent = Intent(this, MainActivity::class.java)
                startActivity(intent)
                finish()
            } else {
                tvErrorMessage.text = "Username atau password salah!"
                tvErrorMessage.visibility = View.VISIBLE
                etPassword.text.clear()
            }
        }
    }
}