package com.iboxsdk.react;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.iboxsdk.singleton.IBoxSDKContext;
import com.iboxsdk.singleton.IBoxSDKService;
import com.iboxsdk.utils.DeviceUtils;
import com.iboxsdk.utils.StringUtils;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public class ReactEnvironment extends ReactContextBaseJavaModule {
    public ReactEnvironment(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Nonnull
    @Override
    public String getName() {
        return "IBoxEnvironment";
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("GPS_ID","GPS_ID");
        constants.put("SYSTEM_VERSION","SYSTEM_VERSION");
        constants.put("SDK_VERSION","SDK_VERSION");
        constants.put("NETWORK","NETWORK");
        constants.put("MODEL","MODEL");
        constants.put("PACKAGE_NAME","PACKAGE_NAME");
        constants.put("LANGUAGE","LANGUAGE");
        constants.put("APP_CONFIG","APP_CONFIG");
        return constants;
    }
    @ReactMethod
    public void getEnv(String type, Callback callback) {
        WritableMap map = Arguments.createMap();
        switch (type){
            case "GPS_ID":
                map.putString(type,DeviceUtils.getDeviceNo()); break;
            case "SYSTEM_VERSION":
                map.putString(type,android.os.Build.VERSION.RELEASE); break;
            case "MODEL":
                map.putString(type,android.os.Build.MODEL); break;
            case "LANGUAGE":
                map.putString(type,Locale.getDefault().getLanguage()); break;
            case "PACKAGE_NAME":
                map.putString(type,IBoxSDKContext.getInstance().getActivity().getPackageName()); break;
            case "SDK_VERSION":
                map.putInt(type,android.os.Build.VERSION.SDK_INT); break;
            case "NETWORK":
                map.putInt(type,DeviceUtils.getNetworkState()); break;
            case "APP_CONFIG":
                map.putInt("app_id",IBoxSDKContext.getInstance().getAppId());
                map.putInt("package_id",IBoxSDKContext.getInstance().getPackageId());
                break;
        }
        callback.invoke(map);
    }
    @ReactMethod
    public void sign(ReadableMap map,Callback callback){
        String sign = StringUtils.sign(map.toHashMap(),IBoxSDKContext.getInstance().getAppKey());
        WritableMap writableMap = Arguments.createMap();
        writableMap.merge(map);
        writableMap.putString("sign",sign);
        callback.invoke(writableMap);
    }

}
