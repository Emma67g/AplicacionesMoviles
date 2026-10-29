package com.example.sensoresnavdrawer;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import androidx.appcompat.app.AppCompatActivity;

public class SplashActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);

        // Ocultar la barra superior (ActionBar) en esta pantalla para que se vea a pantalla completa
        if (getSupportActionBar() != null) {
            getSupportActionBar().hide();
        }

        // Temporizador de 3 segundos
        new Handler(Looper.getMainLooper()).postDelayed(new Runnable() {
            @Override
            public void run() {
                // Iniciar la actividad principal
                Intent intent = new Intent(SplashActivity.this, MainActivity.class);
                startActivity(intent);

                // Destruir esta actividad para que el usuario no pueda volver a ella presionando "Atrás"
                finish();
            }
        }, 3000); // 3000 representa 3 segundos
    }
}