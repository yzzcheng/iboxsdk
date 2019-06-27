package com.iboxsdk.utils;

import com.orhanobut.logger.Logger;

import java.net.HttpURLConnection;
import java.net.URL;

public class HttpUtils {
    public static String httpGet(String getUrl){
        HttpURLConnection urlConnection = null;
        try {
            URL url = new URL(getUrl);
            urlConnection = (HttpURLConnection) url.openConnection();
            urlConnection.setRequestMethod("GET");
            String response = StreamUtils.readInputStreamString(urlConnection.getInputStream());
            return response;
        } catch (Exception e){
            Logger.e(e.getMessage());
        }finally {
            urlConnection.disconnect();
        }
        return null;
    }
}
