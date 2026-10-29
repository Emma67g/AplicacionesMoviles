package com.example.sensoresnavdrawer;

import android.content.Context;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.os.Bundle;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;

public class GiroscopioActivity extends AppCompatActivity implements SensorEventListener {

    private SensorManager sensorManager;
    private Sensor giroscopio;
    private TextView tvDatos;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sensor_demo);

        tvDatos = findViewById(R.id.tvSensorData);
        sensorManager = (SensorManager) getSystemService(Context.SENSOR_SERVICE);

        if (sensorManager != null) {
            giroscopio = sensorManager.getDefaultSensor(Sensor.TYPE_GYROSCOPE);
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (giroscopio != null) {
            sensorManager.registerListener(this, giroscopio, SensorManager.SENSOR_DELAY_NORMAL);
        } else {
            tvDatos.setText("Giroscopio no disponible");
        }
    }

    @Override
    protected void onPause() {
        super.onPause();
        sensorManager.unregisterListener(this);
    }

    @Override
    public void onSensorChanged(SensorEvent event) {
        String datos = "Giroscopio\n\n" +
                "X: " + event.values[0] + " rad/s\n" +
                "Y: " + event.values[1] + " rad/s\n" +
                "Z: " + event.values[2] + " rad/s";
        tvDatos.setText(datos);
    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int accuracy) {}
}