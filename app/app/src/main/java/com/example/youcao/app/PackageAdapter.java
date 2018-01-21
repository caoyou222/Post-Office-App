package com.example.youcao.app;
import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import java.util.List;


/**
 * Created by youcao on 1/20/18.
 */

public class PackageAdapter extends ArrayAdapter<Package> {

    public PackageAdapter(Context context, int resource, List<Package> objects) {
        super(context, resource, objects);
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {

        final Package pack = getItem(position);

        View onePackageView = LayoutInflater.from(getContext()).inflate(R.layout.package_item, parent, false);


        TextView trackingnoView = (TextView) onePackageView.findViewById(R.id.package_no_textView);
        TextView statusView = (TextView) onePackageView.findViewById(R.id.package_status_textView);
        trackingnoView.setText(pack.getTrackingNo());
        statusView.setText(pack.getSigned());
        onePackageView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Intent intent = new Intent(getContext(), PackageDetailActivity.class);

                intent.putExtra("package_year", pack.getYear());
                intent.putExtra("package_month", pack.getMonth());
                intent.putExtra("package_day", pack.getDay());
                intent.putExtra("package_last", pack.getLast());
                intent.putExtra("package_first", pack.getFirst());

                getContext().startActivity(intent);
            }
        });

        return onePackageView;
    }
}