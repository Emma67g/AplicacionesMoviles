package com.example.listas;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import java.util.List;

// 1. Define el Adapter heredando de RecyclerView.Adapter
public class MiAdaptador extends RecyclerView.Adapter<MiAdaptador.MiViewHolder> {

    // Lista de datos que vamos a mostrar
    private List<String> datosLista;

    // Constructor del Adaptador
    public MiAdaptador(List<String> datosLista) {
        this.datosLista = datosLista;
    }

    // 2. Crea las nuevas vistas (Invocado por el Layout Manager)
    @NonNull
    @Override
    public MiViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        // "Inflamos" (convertimos de XML a Vista Java) el layout item_lista.xml
        View vista = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_lista, parent, false);
        return new MiViewHolder(vista);
    }

    // 3. Reemplaza el contenido de una vista (Invocado por el Layout Manager)
    @Override
    public void onBindViewHolder(@NonNull MiViewHolder holder, int position) {
        // Obtenemos el dato en la posición correspondiente
        String datoActual = datosLista.get(position);
        // Colocamos el dato en el TextView del Holder
        holder.tvNombreItem.setText(datoActual);
    }

    // 4. Devuelve el tamaño de tus datos
    @Override
    public int getItemCount() {
        return datosLista.size();
    }

    // =========================================================================
    // 5. DEFINE EL HOLDER (ViewHolder)
    // Es una clase estática interna que guarda las referencias a las vistas de UI
    // =========================================================================
    public static class MiViewHolder extends RecyclerView.ViewHolder {

        TextView tvNombreItem;

        public MiViewHolder(@NonNull View itemView) {
            super(itemView);
            // Enlazamos la variable con el ID del XML del item_lista
            tvNombreItem = itemView.findViewById(R.id.tvNombreItem);
        }
    }
}