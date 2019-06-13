package com.iboxsdk2.imp;

import com.android.billingclient.api.BillingClient;
import com.android.billingclient.api.BillingResult;
import com.android.billingclient.api.ConsumeResponseListener;
import com.iboxsdk2.abstracts.EventReciever;
import com.iboxsdk2.bean.SDKFinishOrderEvent;
import com.iboxsdk2.singleton.IBoxSDKContext;
import com.iboxsdk2.singleton.IBoxSDKService;
import com.orhanobut.logger.Logger;

import java.util.ArrayList;
import java.util.List;

public class IBoxSDKEventReciever implements EventReciever {
    @Override
    public void init() {
        IBoxSDKContext.getInstance().setInit(true);
        List<String> skuList = new ArrayList<>();
        skuList.add("product_0.99_xmyxwno1");
        skuList.add("product_4.99_xmyxwno1");
        IBoxSDKService.getInstance().getGoogleService().init(skuList);
        Logger.d("init success");
    }

    @Override
    public void finishOrder(SDKFinishOrderEvent event) {
        IBoxSDKService.getInstance().getGoogleService().finish(event.getPurseToken(), event.getDeveloperPayload(), new ConsumeResponseListener() {
            @Override
            public void onConsumeResponse(BillingResult billingResult, String purchaseToken) {
                if(billingResult.getResponseCode() != BillingClient.BillingResponseCode.OK) {
                    Logger.e(billingResult.getDebugMessage());
                }
            }
        });
    }
}
