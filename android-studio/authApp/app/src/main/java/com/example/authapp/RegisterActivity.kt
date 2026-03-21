package com.example.authapp

import android.content.Intent
import android.graphics.Color
import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.view.View
import android.widget.*
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity

class RegisterActivity : AppCompatActivity(){

    override fun onCreate(savedInstanceState: Bundle?){
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_register)

        val btnDaftar = findViewById<Button>(R.id.btnDaftar)
        val toLogin = findViewById<TextView>(R.id.toLogin)

        val etEmail = findViewById<EditText>(R.id.etEmail)
        val etPass = findViewById<EditText>(R.id.etPassword)
        val tvPassConf = findViewById<TextView>(R.id.passwardStatus)
        val rbGender = findViewById<RadioGroup>(R.id.rgGender)
        val rbCoding = findViewById<CheckBox>(R.id.cbCoding)
        val rbGitar = findViewById<CheckBox>(R.id.cbGitar)
        val rbMembaca = findViewById<CheckBox>(R.id.cbMembaca)

        btnDaftar.setOnClickListener{

            val email = etEmail.text.toString()
            val selectedGenderId = rbGender.checkedRadioButtonId
            val gender = if (selectedGenderId != -1) {
                findViewById<RadioButton>(selectedGenderId).text.toString()
            }else "Belum dipilih!"

            val hobi = mutableListOf<String>()
            if(rbCoding.isChecked) hobi.add("Coding")
            if(rbGitar.isChecked) hobi.add("Gitar")
            if(rbMembaca.isChecked) hobi.add("Membaca")

            val builder = AlertDialog.Builder(this)


            val info = """
                Email: $email
                Jenis kelamin: $gender
                Hobi: ${hobi.joinToString(", ")}
            """.trimIndent()
            builder.setMessage("Apakah data ini sudah benar?")

            builder.setMessage("Apakah data ini sudah benar?\n\n$info")

            builder.setPositiveButton("Ya"){ _,_ ->
                Toast.makeText(this, "Data berhasil disimpan", Toast.LENGTH_SHORT).show()
                finish()

            }

            builder.setNegativeButton("Tidak"){dialog, _ ->
                dialog.dismiss()
            }

            val dialog: AlertDialog = builder.create()
            dialog.show()
        }

        toLogin.setOnClickListener {
            val intest = Intent(this, LoginActivity::class.java)
            startActivity(intest)
        }

        etPass.addTextChangedListener(object : TextWatcher {
            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}

            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {
                val pass = s.toString()
                tvPassConf.visibility = View.VISIBLE

                if (pass.length < 6) {
                    tvPassConf.text = "Weak: Min. 6 karakter"
                    tvPassConf.setTextColor(Color.RED)
                } else {
                    val hasLetter = pass.any { it.isLetter() }
                    val hasDigit = pass.any { it.isDigit() }
                    val hasSymbol = pass.any { !it.isLetterOrDigit() }

                    if (hasLetter && hasDigit && hasSymbol) {
                        tvPassConf.text = "Strong Password"
                        tvPassConf.setTextColor(Color.GREEN)
                    } else {
                        tvPassConf.text = "Medium Password"
                        tvPassConf.setTextColor(Color.BLUE)
                    }
                }
            }

            override fun afterTextChanged(s: Editable?) {}
        })
    }
}