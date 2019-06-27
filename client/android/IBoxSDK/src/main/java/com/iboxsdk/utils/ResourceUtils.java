package com.iboxsdk.utils;

import android.content.Context;

public class ResourceUtils {
    public static String getString(Context context,String name){
        int id = context.getResources().getIdentifier(name,"string",context.getApplicationInfo().processName);
        if(id == 0) {
            return "";
        }else return context.getString(id);
    }
}
