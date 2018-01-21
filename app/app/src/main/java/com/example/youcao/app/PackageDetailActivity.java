package com.example.youcao.app;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.*;

public class PackageDetailActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_package_detail);

        int year = getIntent().getIntExtra("package_year", 0);
        int month = getIntent().getIntExtra("package_month",0);
        int day = getIntent().getIntExtra("package_day",0);
        String date = Integer.toString(month) + "/" + Integer.toString(day) + "/" + Integer.toString(year);
        String name = getIntent().getStringExtra("package_first") + getIntent().getStringExtra(("package_last"));


        TextView nameView = (TextView) findViewById(R.id.receiver_name_textView);
        TextView dateView = (TextView) findViewById(R.id.date_textView);



        dateView.setText(date);
        nameView.setText(name);

    }
}
