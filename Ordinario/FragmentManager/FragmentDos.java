package com.example.fragment_manager;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

public class FragmentDos extends Fragment {

    public FragmentDos() {
        // Todo fragmento debe tener un constructor público vacío
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        // Inflamos el diseño XML para este fragmento
        return inflater.inflate(R.layout.fragment_dos, container, false);
    }
}