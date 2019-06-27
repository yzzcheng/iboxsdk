package com.iboxsdk.imp;

import com.android.billingclient.api.BillingClient;
import com.android.billingclient.api.BillingResult;
import com.android.billingclient.api.ConsumeResponseListener;
import com.facebook.react.bridge.Arguments;
import com.iboxsdk.abstracts.EventReciever;
import com.iboxsdk.bean.SDKFinishOrderEvent;
import com.iboxsdk.consts.EventConsts;
import com.iboxsdk.singleton.IBoxReactView;
import com.iboxsdk.singleton.IBoxSDKContext;
import com.iboxsdk.singleton.IBoxSDKService;
import com.iboxsdk.thirdparty.FacebookLoginCallBack;
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
        IBoxSDKService.getInstance().getFaceBookService().init();
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
