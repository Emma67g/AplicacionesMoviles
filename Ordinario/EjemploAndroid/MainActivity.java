package com.example.ejemploandroid;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    TextView textoHello;
    EditText inputTexto;
    Button boton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);

        // Vinculamos los elementos con sus ID del XML
        textoHello = findViewById(R.id.hello);
        inputTexto = findViewById(R.id.input_txt);
        boton = findViewById(R.id.button);

        boton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Obtenemos el texto introducido por el usuario en el EditText
                String mensaje = inputTexto.getText().toString();

                // Asignamos ese mensaje al TextView
                textoHello.setText(mensaje);
            }
        });
    }
}