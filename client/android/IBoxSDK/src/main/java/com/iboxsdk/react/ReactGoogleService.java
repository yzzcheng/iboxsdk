package com.iboxsdk.react;

import android.content.Intent;
import android.net.Uri;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.iboxsdk.singleton.IBoxSDKContext;
import com.iboxsdk.singleton.IBoxSDKService;

import javax.annotation.Nonnull;

public class ReactGoogleService extends ReactContextBaseJavaModule {

    public ReactGoogleService(ReactApplicationContext reactContext) {
        super(reactContext);
    }
    final String GOOGLE_PLAY = "com.android.vending";
    @Nonnull
    @Override
    public String getName() {
        return "GoogleService";
    }

    @ReactMethod
    public void startPlusPayment(String sku,String clientAction){
            IBoxSDKService.getInstance().getPlusGoogleService().startPay(sku,clientAction);
    }

    @ReactMethod
    public void startPayment(String sku){
        IBoxSDKService.getInstance().getGooglePayService().startPay(sku);
    }

    @ReactMethod
    public void launchToApp(String packageName){
        if(IBoxSDKContext.getInstance().isInit()) {
            Uri uri = Uri.parse("market://details?id=" + packageName);
            Intent intent = new Intent(Intent.ACTION_VIEW, uri);
            intent.setPackage(GOOGLE_PLAY);
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            IBoxSDKContext.getInstance().getActivity().startActivity(intent);
        }
    }
}
