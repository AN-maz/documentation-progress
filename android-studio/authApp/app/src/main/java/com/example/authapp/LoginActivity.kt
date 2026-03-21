package com.example.authapp

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import android.widget.Toast

class LoginActivity : AppCompatActivity(){

    override fun onCreate(savedInstanceState: Bundle?){
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)


        val btnLogin = findViewById<Button>(R.id.login)
        val tvRegister = findViewById<TextView>(R.id.toRegister)

        btnLogin.setOnClickListener {
            Toast.makeText(this,"Login Berhasil", Toast.LENGTH_LONG).show()
        }

        tvRegister.setOnClickListener {
            val intest = Intent(this, RegisterActivity::class.java)
            startActivity(intest)
        }
    }
}