package com.example.sensoresnavdrawer;

import android.content.Intent;
import android.os.Bundle;
import android.view.MenuItem;
import androidx.activity.OnBackPressedCallback;
import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.core.view.GravityCompat;
import androidx.drawerlayout.widget.DrawerLayout;
import com.google.android.material.navigation.NavigationView;

public class MainActivity extends AppCompatActivity implements NavigationView.OnNavigationItemSelectedListener {

    private DrawerLayout drawerLayout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // 1. Configurar la barra superior (Toolbar)
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        // 2. Vincular el Drawer y el NavigationView
        drawerLayout = findViewById(R.id.drawer_layout);
        NavigationView navigationView = findViewById(R.id.nav_view);
        navigationView.setNavigationItemSelectedListener(this);

        // 3. Configurar el ícono de "hamburguesa"
        // Solución a los errores: Usamos R.string.app_name que siempre existe por defecto
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(this, drawerLayout, toolbar,
                R.string.app_name, R.string.app_name);
        drawerLayout.addDrawerListener(toggle);
        toggle.syncState();

        // 4. Configurar el nuevo sistema para el botón "Atrás" de Android
        getOnBackPressedDispatcher().addCallback(this, new OnBackPressedCallback(true) {
            @Override
            public void handleOnBackPressed() {
                if (drawerLayout.isDrawerOpen(GravityCompat.START)) {
                    // Si el menú está abierto, ciérralo
                    drawerLayout.closeDrawer(GravityCompat.START);
                } else {
                    // Si está cerrado, sal de la app con normalidad
                    setEnabled(false);
                    getOnBackPressedDispatcher().onBackPressed();
                }
            }
        });
    }

    // 5. Capturar los clics del menú
    @Override
    public boolean onNavigationItemSelected(@NonNull MenuItem item) {
        int id = item.getItemId();

        if (id == R.id.nav_acelerometro) {
            startActivity(new Intent(this, AcelerometroActivity.class));
        } else if (id == R.id.nav_giroscopio) {
            startActivity(new Intent(this, GiroscopioActivity.class));
        } else if (id == R.id.nav_magnetometro) {
            startActivity(new Intent(this, MagnetometroActivity.class));
        } else if (id == R.id.nav_gps) {
            startActivity(new Intent(this, GpsActivity.class));
        }

        // Cerrar el panel después de tocar una opción
        drawerLayout.closeDrawer(GravityCompat.START);
        return true;
    }
}