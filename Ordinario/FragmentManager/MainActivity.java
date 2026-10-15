package com.example.fragment_manager;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Referencias a los botones
        Button btnFrag1 = findViewById(R.id.btnFrag1);
        Button btnFrag2 = findViewById(R.id.btnFrag2);
        Button btnFrag3 = findViewById(R.id.btnFrag3);

        // Mostrar el Fragmento 1 por defecto al abrir la app (solo si es la primera vez)
        if (savedInstanceState == null) {
            cargarFragmento(new FragmentUno());
        }

        // Configurar los eventos de click para cada botón
        btnFrag1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                cargarFragmento(new FragmentUno());
            }
        });

        btnFrag2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                cargarFragmento(new FragmentDos());
            }
        });

        btnFrag3.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                cargarFragmento(new FragmentTres());
            }
        });
    }

    // Función que utiliza el FragmentManager para cambiar los fragmentos
    private void cargarFragmento(Fragment fragment) {
        // 1. Obtenemos el FragmentManager
        FragmentManager fragmentManager = getSupportFragmentManager();

        // 2. Iniciamos una transacción
        FragmentTransaction transaccion = fragmentManager.beginTransaction();

        // 3. Reemplazamos el contenido actual del contenedor con el nuevo fragmento
        transaccion.replace(R.id.contenedorFragmentos, fragment);

        // 4. Confirmamos la transacción para que los cambios se apliquen
        transaccion.commit();
    }
}