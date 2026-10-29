package com.example.sensoresnavdrawer;

import android.content.Context;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.os.Bundle;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;

public class MagnetometroActivity extends AppCompatActivity implements SensorEventListener {

    private SensorManager sensorManager;
    private Sensor magnetometro;
    private TextView tvDatos;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sensor_demo);

        tvDatos = findViewById(R.id.tvSensorData);
        sensorManager = (SensorManager) getSystemService(Context.SENSOR_SERVICE);

        if (sensorManager != null) {
            magnetometro = sensorManager.getDefaultSensor(Sensor.TYPE_MAGNETIC_FIELD);
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (magnetometro != null) {
            sensorManager.registerListener(this, magnetometro, SensorManager.SENSOR_DELAY_NORMAL);
        } else {
            tvDatos.setText("Magnetómetro no disponible");
        }
    }

    @Override
    protected void onPause() {
        super.onPause();
        sensorManager.unregisterListener(this);
    }

    @Override
    public void onSensorChanged(SensorEvent event) {
        String datos = "Magnetómetro\n\n" +
                "X: " + event.values[0] + " μT\n" +
                "Y: " + event.values[1] + " μT\n" +
                "Z: " + event.values[2] + " μT";
        tvDatos.setText(datos);
    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int accuracy) {}
}