package com.iboxsdk.thirdparty;

import android.os.Bundle;

import com.google.android.gms.ads.identifier.AdvertisingIdClient;
import com.google.firebase.analytics.FirebaseAnalytics;
import com.iboxsdk.singleton.IBoxSDKContext;
import com.orhanobut.logger.Logger;

public class GoogleAdsService {
    AdvertisingIdClient advertisingIdClient;
    FirebaseAnalytics mFirebaseAnalytics;
    public void init(){
        try {
            mFirebaseAnalytics = FirebaseAnalytics.getInstance(IBoxSDKContext.getInstance().getActivity());
            advertisingIdClient = new AdvertisingIdClient(IBoxSDKContext.getInstance().getActivity());
            advertisingIdClient.start();
        }catch (Exception e){
            Logger.e("GoogleAdsService","init error",e);
        }
    }

    public String getAdsId(){
        try {
            return advertisingIdClient.getInfo().getId();
        }catch (Exception e){
            return "";
        }
    }

    public void logEvent(){
        Bundle bundle = new Bundle();
        bundle.putString(FirebaseAnalytics.Param.CONTENT_TYPE, "image");
        mFirebaseAnalytics.logEvent(FirebaseAnalytics.Event.SELECT_CONTENT, bundle);
    }
}
