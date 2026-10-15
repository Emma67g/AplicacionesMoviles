package com.example.verthorizon;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    private EditText etEntrada;
    private TextView tvResultado;

    // 1. Guardar el estado justo antes de la rotación (destrucción)
    @Override
    protected void onSaveInstanceState(@NonNull Bundle outState) {
        super.onSaveInstanceState(outState);

        // Guardamos el texto actual del TextView usando una clave "TEXTO_GUARDADO"
        String textoActual = tvResultado.getText().toString();
        outState.putString("TEXTO_GUARDADO", textoActual);
    }

    // 2. Modificar el onCreate para recuperar los datos
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Toast.makeText(this, "Ejecutando: onCreate()", Toast.LENGTH_SHORT).show();

        etEntrada = findViewById(R.id.etEntrada);
        tvResultado = findViewById(R.id.tvResultado);
        Button btnMostrar = findViewById(R.id.btnMostrar);

        // AQUÍ ESTÁ LA SOLUCIÓN: Si savedInstanceState no es nulo, significa que venimos de una rotación
        if (savedInstanceState != null) {
            String textoRecuperado = savedInstanceState.getString("TEXTO_GUARDADO");
            tvResultado.setText(textoRecuperado);
        }

        btnMostrar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String textoCapturado = etEntrada.getText().toString();
                tvResultado.setText(textoCapturado);
            }
        });
    }
}