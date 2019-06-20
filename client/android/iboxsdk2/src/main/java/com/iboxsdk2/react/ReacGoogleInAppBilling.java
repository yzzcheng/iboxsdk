package com.iboxsdk2.react;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.iboxsdk2.singleton.IBoxSDKService;

import javax.annotation.Nonnull;

public class ReacGoogleInAppBilling extends ReactContextBaseJavaModule {

    public ReacGoogleInAppBilling(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Nonnull
    @Override
    public String getName() {
        return "GoogleInAppBilling";
    }

    @ReactMethod
    public void startPayment(String sku,int type){
        if(type == 0){
            IBoxSDKService.getInstance().getGoogleService().create(sku);
        } else {
            IBoxSDKService.getInstance().getPlusGoogleService().startPay(sku);
        }

    }
}
