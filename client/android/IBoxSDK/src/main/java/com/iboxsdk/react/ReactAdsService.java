package com.iboxsdk.react;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.iboxsdk.singleton.IBoxSDKService;

import javax.annotation.Nonnull;

public class ReactAdsService extends ReactContextBaseJavaModule {
    public ReactAdsService(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Nonnull
    @Override
    public String getName() {
        return "AdsService";
    }


    @ReactMethod
    public void adjustEvent(String eventName, ReadableMap map){
        IBoxSDKService.getInstance().getAdjustService().trackEvent(eventName,map.toHashMap());
    }

    @ReactMethod
    public void adjustOrderEvent(String eventName,String currency,double money ,ReadableMap map){
        IBoxSDKService.getInstance().getAdjustService().trackOrderEvent(eventName,currency,money,map.toHashMap());
    }
}
