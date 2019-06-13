package com.iboxsdk2.utils;

import android.content.Context;
import android.provider.Settings;

public final class DeviceUtils {

    public static String getDevice(Context context){

        String device = "";

        device = Settings.System.getString(context.getContentResolver(), Settings.System.ANDROID_ID);

        return device;

    }


    public static String getDeviceNo(Context context){
        return "";
    }
}
