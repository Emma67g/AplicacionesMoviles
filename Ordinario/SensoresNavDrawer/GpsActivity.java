package com.example.sensoresnavdrawer;

import android.Manifest;
import android.content.pm.PackageManager;
import android.location.Location;
import android.os.Bundle;
import android.os.Looper;
import android.widget.TextView;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationCallback;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationResult;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.location.Priority;

public class GpsActivity extends AppCompatActivity {

    private FusedLocationProviderClient fusedLocationClient;
    private LocationCallback locationCallback;
    private TextView tvDatos;
    private static final int LOCATION_PERMISSION_REQUEST_CODE = 100;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sensor_demo);

        tvDatos = findViewById(R.id.tvSensorData);
        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this);

        // Crear el "escuchador" de las nuevas ubicaciones
        locationCallback = new LocationCallback() {
            @Override
            public void onLocationResult(@NonNull LocationResult locationResult) {
                for (Location location : locationResult.getLocations()) {
                    String datos = "Ubicación GPS (En tiempo real)\n\n" +
                            "Latitud: " + location.getLatitude() + "\n" +
                            "Longitud: " + location.getLongitude() + "\n" +
                            "Precisión: " + location.getAccuracy() + " mts";
                    tvDatos.setText(datos);
                }
            }
        };

        solicitarPermisosYObtenerUbicacion();
    }

    private void solicitarPermisosYObtenerUbicacion() {
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.ACCESS_FINE_LOCATION}, LOCATION_PERMISSION_REQUEST_CODE);
        } else {
            iniciarActualizacionesDeUbicacion();
        }
    }

    private void iniciarActualizacionesDeUbicacion() {
        tvDatos.setText("Obteniendo ubicación GPS...");

        // Configurar qué tan rápido queremos que se actualice el GPS (cada 2 segundos)
        LocationRequest locationRequest = new LocationRequest.Builder(Priority.PRIORITY_HIGH_ACCURACY, 2000).build();

        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
            // Empezar a escuchar la ubicación en tiempo real
            fusedLocationClient.requestLocationUpdates(locationRequest, locationCallback, Looper.getMainLooper());
        }
    }

    @Override
    protected void onPause() {
        super.onPause();
        // Detener el GPS al salir de la pantalla para ahorrar batería
        if (fusedLocationClient != null && locationCallback != null) {
            fusedLocationClient.removeLocationUpdates(locationCallback);
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
            iniciarActualizacionesDeUbicacion();
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == LOCATION_PERMISSION_REQUEST_CODE) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                iniciarActualizacionesDeUbicacion();
            } else {
                tvDatos.setText("Permiso de ubicación denegado.");
                Toast.makeText(this, "Se requiere permiso para usar el GPS", Toast.LENGTH_SHORT).show();
            }
        }
    }
}