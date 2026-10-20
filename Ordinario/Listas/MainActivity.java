package com.example.listas;

import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // 1. Enlazamos el RecyclerView de la interfaz
        RecyclerView recyclerView = findViewById(R.id.miRecyclerView);

        // 2. Definimos el Posicionamiento (LayoutManager)
        // LinearLayoutManager organiza los elementos en una lista vertical estándar
        recyclerView.setLayoutManager(new LinearLayoutManager(this));

        // 3. Creamos nuestros datos de prueba
        List<String> misDatos = new ArrayList<>();
        misDatos.add("Elemento 1: Java");
        misDatos.add("Elemento 2: Kotlin");
        misDatos.add("Elemento 3: Android Studio");
        misDatos.add("Elemento 4: RecyclerView");
        misDatos.add("Elemento 5: ConstraintLayout");
        misDatos.add("Elemento 6: ListView");
        misDatos.add("Elemento 7: Adaptador");
        misDatos.add("Elemento 8: ViewHolder");
        misDatos.add("Elemento 9: LayoutManager");
        misDatos.add("Elemento 10: ¡Funciona!");

        // 4. Inicializamos nuestro Adaptador con los datos
        MiAdaptador adaptador = new MiAdaptador(misDatos);

        // 5. Asignamos el adaptador al RecyclerView
        recyclerView.setAdapter(adaptador);
    }
}