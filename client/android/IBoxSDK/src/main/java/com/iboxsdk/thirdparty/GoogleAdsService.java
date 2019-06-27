package com.iboxsdk.thirdparty;

import com.google.android.gms.ads.identifier.AdvertisingIdClient;
import com.iboxsdk.singleton.IBoxSDKContext;

public class GoogleAdsService {
    AdvertisingIdClient advertisingIdClient;
    public void init(){
        advertisingIdClient = new AdvertisingIdClient(IBoxSDKContext.getInstance().getActivity());
    }

    public String getAdsId(){
        try {
            return advertisingIdClient.getInfo().getId();
        }catch (Exception e){
            return "";
        }
    }
}
