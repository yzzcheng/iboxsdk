package com.iboxsdk.imp;

import com.android.billingclient.api.BillingClient;
import com.android.billingclient.api.BillingResult;
import com.android.billingclient.api.ConsumeResponseListener;
import com.iboxsdk.abstracts.EventReciever;
import com.iboxsdk.bean.SDKFinishOrderEvent;
import com.iboxsdk.consts.EventConsts;
import com.iboxsdk.singleton.IBoxReactView;
import com.iboxsdk.singleton.IBoxSDKContext;
import com.iboxsdk.singleton.IBoxSDKService;
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
        //对各个服务进行初始化
        IBoxSDKService.getInstance().getGooglePayService().init(skuList);
        IBoxSDKService.getInstance().getFaceBookService().init();
        IBoxSDKService.getInstance().getGoogleAdsService().init();
        IBoxSDKService.getInstance().getAdjustService().init();
        Logger.d("init success");
    }

    @Override
    public void finishOrder(SDKFinishOrderEvent event) {
        final SDKFinishOrderEvent constEvent = event;
        IBoxSDKService.getInstance().getGooglePayService().finish(event.getPurchaseToken(), event.getDeveloperPayload(), new ConsumeResponseListener() {
            @Override
            public void onConsumeResponse(BillingResult billingResult, String purchaseToken) {
                if(billingResult.getResponseCode() != BillingClient.BillingResponseCode.OK) {
                    IBoxReactView.getInstance().getReactView().emitter().emit(EventConsts.ORDER_FINISH, constEvent.toMap());
                }
            }
        });
    }

    @Override
    public void closeSDK() {
        IBoxReactView.getInstance().getReactView().hide();
    }
}
