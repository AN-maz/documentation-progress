package com.example.seminarapp

import android.content.Intent
import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.widget.*
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity

class FormActivity : AppCompatActivity() {

    private lateinit var etName: EditText
    private lateinit var etEmail: EditText
    private lateinit var etPhone: EditText
    private lateinit var rgGender: RadioGroup
    private lateinit var spinnerSeminar: Spinner
    private lateinit var cbAgreement: CheckBox
    private lateinit var btnSubmit: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_form)

        etName = findViewById(R.id.etName)
        etEmail = findViewById(R.id.etEmail)
        etPhone = findViewById(R.id.etPhone)
        rgGender = findViewById(R.id.rgGender)
        spinnerSeminar = findViewById(R.id.spinnerSeminar)
        cbAgreement = findViewById(R.id.cbAgreement)
        btnSubmit = findViewById(R.id.btnSubmit)


        setupRealtimeValidation()

        btnSubmit.setOnClickListener {
            validateAndSubmit()
        }
    }

    private fun setupRealtimeValidation() {

        etEmail.addTextChangedListener(object : TextWatcher {
            override fun afterTextChanged(s: Editable?) {
                if (s != null && s.isNotEmpty() && !s.contains("@")) {
                    etEmail.error = "Email harus mengandung karakter '@'"
                }
            }
            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}
            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {}
        })


        etPhone.addTextChangedListener(object : TextWatcher {
            private var isFormatting = false

            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}
            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {}

            override fun afterTextChanged(s: Editable?) {
                if (isFormatting) return
                isFormatting = true

                val originalText = s.toString()
                val rawDigits = originalText.replace(" ", "")

                val formatted = StringBuilder()
                for (i in rawDigits.indices) {
                    if (i > 0 && i % 4 == 0) {
                        formatted.append(" ")
                    }
                    formatted.append(rawDigits[i])
                }


                etPhone.setText(formatted.toString())

                etPhone.setSelection(formatted.length)

                if (rawDigits.isNotEmpty()) {
                    if (!rawDigits.startsWith("08")) {
                        etPhone.error = "Nomor HP harus diawali '08'"
                    } else if (rawDigits.length < 10 || rawDigits.length > 13) {
                        etPhone.error = "Panjang nomor harus 10-13 digit (tanpa spasi)"
                    } else {
                        etPhone.error = null
                    }
                }

                isFormatting = false
            }
        })
    }
    private fun validateAndSubmit() {
        val name = etName.text.toString().trim()
        val email = etEmail.text.toString().trim()
        val phone = etPhone.text.toString().trim()
        val selectedGenderId = rgGender.checkedRadioButtonId
        val selectedSeminar = spinnerSeminar.selectedItem.toString()


        if (name.isEmpty()) { etName.error = "Nama wajib diisi"; etName.requestFocus(); return }
        if (email.isEmpty()) { etEmail.error = "Email wajib diisi"; etEmail.requestFocus(); return }
        if (phone.isEmpty()) { etPhone.error = "Nomor HP wajib diisi"; etPhone.requestFocus(); return }

        if (etEmail.error != null || etPhone.error != null) {
            Toast.makeText(this, "Silakan perbaiki data yang merah terlebih dahulu", Toast.LENGTH_SHORT).show()
            return
        }

        if (selectedGenderId == -1) {
            Toast.makeText(this, "Silakan pilih jenis kelamin", Toast.LENGTH_SHORT).show()
            return
        }
        val gender = findViewById<RadioButton>(selectedGenderId).text.toString()

        if (spinnerSeminar.selectedItemPosition == 0) {
            Toast.makeText(this, "Silakan pilih seminar", Toast.LENGTH_SHORT).show()
            return
        }

        if (!cbAgreement.isChecked) {
            Toast.makeText(this, "Anda harus mencentang persetujuan data", Toast.LENGTH_LONG).show()
            return
        }

        showConfirmationDialog(name, email, phone, gender, selectedSeminar)
    }

    private fun showConfirmationDialog(name: String, email: String, phone: String, gender: String, seminar: String) {
        val builder = AlertDialog.Builder(this)
        builder.setTitle("Konfirmasi Pendaftaran")
        builder.setMessage("Apakah data yang Anda isi sudah benar?")

        builder.setPositiveButton("Ya") { _, _ ->
            val intent = Intent(this, ResultActivity::class.java).apply {
                putExtra("EXTRA_NAME", name)
                putExtra("EXTRA_EMAIL", email)
                putExtra("EXTRA_PHONE", phone)
                putExtra("EXTRA_GENDER", gender)
                putExtra("EXTRA_SEMINAR", seminar)
            }
            startActivity(intent)
            finish()
        }

        builder.setNegativeButton("Tidak") { dialog, _ ->
            dialog.dismiss()
        }

        builder.create().show()
    }
}