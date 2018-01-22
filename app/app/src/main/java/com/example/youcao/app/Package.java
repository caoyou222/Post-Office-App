package com.example.youcao.app;
import java.util.ArrayList;
import java.util.List;
import java.util.*;
import java.util.Calendar;
import android.widget.*;
import android.widget.TextView;


/**
 * Created by youcao on 1/20/18.
 */


    public class Package {

        private int year;
        private int month;
        private int day;
        private String trackingNo;
        private String last;
        private String first;
        private String carrier;
        private int signed = 0;

        private TextView textview;
        private Button button_filter;

        public Package(String trackingNo, String last, String first, String carrier) {
            this.trackingNo = trackingNo;
            this.last = last;
            this.first = first;
            this.carrier = carrier;
            Date date = new Date(); // your date
            Calendar cal = Calendar.getInstance();
            cal.setTime(date);
            this.year = cal.get(Calendar.YEAR);
            this.month = cal.get(Calendar.MONTH)+1;
            this.day = cal.get(Calendar.DAY_OF_MONTH);

        }

        public String getTrackingNo() {
            return trackingNo;
        }

        public String getCarrier(){
            return carrier;
        }

        public void setSigned(){
            this.signed = 1;
        }

        public String getSigned(){
            if(this.signed == 1) return "Signed";
            else return "Unsigned";
        }

        public void setTrackingNo(String trackingNo) {
            this.trackingNo = trackingNo;
        }

        public String getLast() {
            return last;
        }

        public void setLast(String last) {
            this.last = last;
        }

        public String getFirst() {
            return first;
        }

        public void setFirst(String first) {
            this.first = first;
        }

        public int getYear(){
            return year;
        }

        public int getMonth(){
            return month;
        }

        public int getDay(){
            return day;
        }


        public static List<Package> getAllPackages() {
            List<Package> packages = new ArrayList<Package>();

            packages.add(new Package("00000000", "Cao", "You","DHL"));
            packages.add(new Package("11111111", "Ge", "Muchen","UPS"));


            return packages;
        }
    }
