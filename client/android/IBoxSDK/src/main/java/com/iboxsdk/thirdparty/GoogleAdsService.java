package com.iboxsdk.thirdparty;

import com.google.android.gms.ads.identifier.AdvertisingIdClient;
import com.iboxsdk.singleton.IBoxSDKContext;
import com.orhanobut.logger.Logger;

public class GoogleAdsService {
    AdvertisingIdClient advertisingIdClient;
    public void init(){
        try {
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
}
