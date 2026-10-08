package com.example.calculadoradesumas;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    private EditText editText1;
    private EditText editText2;
    private Button btnSumar;
    private TextView tvResultado;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);

        editText1 = findViewById(R.id.editTextText);
        editText2 = findViewById(R.id.editTextText2);
        btnSumar = findViewById(R.id.button);
        tvResultado = findViewById(R.id.textView4);

        btnSumar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String strNum1 = editText1.getText().toString();
                String strNum2 = editText2.getText().toString();

                if (!strNum1.isEmpty() && !strNum2.isEmpty()) {
                    try {
                        double num1 = Double.parseDouble(strNum1);
                        double num2 = Double.parseDouble(strNum2);
                        double suma = num1 + num2;

                        if (suma == (long) suma) {
                            tvResultado.setText("Resultado: " + (long) suma);
                        } else {
                            tvResultado.setText("Resultado: " + suma);
                        }
                    } catch (NumberFormatException e) {
                        Toast.makeText(MainActivity.this, "Ingresa valores numéricos válidos", Toast.LENGTH_SHORT).show();
                    }
                } else {
                    Toast.makeText(MainActivity.this, "Por favor llena ambos números", Toast.LENGTH_SHORT).show();
                }
            }
        });
    }
}