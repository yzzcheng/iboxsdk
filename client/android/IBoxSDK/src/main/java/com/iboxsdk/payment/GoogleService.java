package com.iboxsdk.payment;

import android.app.Activity;

import com.android.billingclient.api.BillingClient;
import com.android.billingclient.api.BillingClientStateListener;
import com.android.billingclient.api.BillingFlowParams;
import com.android.billingclient.api.BillingResult;
import com.android.billingclient.api.ConsumeParams;
import com.android.billingclient.api.ConsumeResponseListener;
import com.android.billingclient.api.Purchase;
import com.android.billingclient.api.PurchasesUpdatedListener;
import com.android.billingclient.api.SkuDetails;
import com.android.billingclient.api.SkuDetailsParams;
import com.android.billingclient.api.SkuDetailsResponseListener;
import com.iboxsdk.bean.SDKFinishOrderEvent;
import com.iboxsdk.consts.ConfigConsts;
import com.iboxsdk.consts.EventConsts;
import com.iboxsdk.singleton.IBoxReactView;
import com.iboxsdk.singleton.IBoxSDKContext;
import com.iboxsdk.utils.ResourceUtils;
import com.orhanobut.logger.Logger;

import java.util.ArrayList;
import java.util.List;

public class GoogleService {
    private BillingClient billingClient;
    private List<SkuDetails> skuDetails = new ArrayList<>();


    public void init(final List<String> skuList) {
        final Activity activity = IBoxSDKContext.getInstance().getActivity();
        //订阅交易状态
        billingClient = BillingClient.newBuilder(activity).setListener(new PurchasesUpdatedListener() {
            @Override
            public void onPurchasesUpdated(BillingResult billingResult, List<Purchase> purchases) {
                if (billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK
                        && purchases != null) {
                    Integer appId = Integer.parseInt(ResourceUtils.getString(activity.getApplicationContext(), ConfigConsts.app_id));
                    Integer packageId = Integer.parseInt(ResourceUtils.getString(activity.getApplicationContext(), ConfigConsts.package_id));
                    for (Purchase purchase : purchases) {
                        SDKFinishOrderEvent event = new SDKFinishOrderEvent();
                        event.setAppId(appId);
                        event.setPackageId(packageId);
                        event.setDeveloperPayload(purchase.getDeveloperPayload());
                        event.setSignature(purchase.getSignature());
                        event.setPurseToken(purchase.getPurchaseToken());
                        IBoxReactView.getInstance().getReactView().emitter().emit(EventConsts.ORDER_FINISH, event.toMap());
                    }
                } else {
                    Logger.d("Google PurchasesUpdated response error");
                }
            }
        }).enablePendingPurchases().build();
        // 查询商品


        billingClient.startConnection(new BillingClientStateListener() {
            @Override
            public void onBillingSetupFinished(BillingResult billingResult) {
                if (billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK) {
                    Logger.d("connection google billing success!");
                    SkuDetailsParams.Builder params = SkuDetailsParams.newBuilder();
                    params.setSkusList(skuList).setType(BillingClient.SkuType.INAPP);
                    billingClient.querySkuDetailsAsync(params.build(),
                            new SkuDetailsResponseListener() {
                                @Override
                                public void onSkuDetailsResponse(BillingResult billingResult,
                                                                 List<SkuDetails> skuDetailsList) {
                                    if (billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK) {
                                        if (skuDetailsList != null && skuDetailsList.size() > 0) {
                                            skuDetails.clear();
                                            skuDetails.addAll(skuDetailsList);
                                            IBoxSDKContext.getInstance().setPayInit(true);
                                        }
                                    }

                                }
                            });
                }
            }

            @Override
            public void onBillingServiceDisconnected() {
                Logger.d("disconnection google billing!");
                billingClient.startConnection(this);
            }
        });

    }

    public void startPay(String productName) {
        if(IBoxSDKContext.getInstance().isPayInit()) {
            final Activity activity = IBoxSDKContext.getInstance().getActivity();
            for (SkuDetails sku : this.skuDetails) {
                if (sku.getSku().equals(productName)) {
                    BillingFlowParams flowParams = BillingFlowParams.newBuilder()
                            .setSkuDetails(sku)
                            .build();
                    BillingResult result = billingClient.launchBillingFlow(activity, flowParams);

                    if (result.getResponseCode() != BillingClient.BillingResponseCode.OK) {
                        Logger.e(result.getDebugMessage());

                    }

                }
            }
        }

    }

    public void finish(String purseToken, String payLoad,ConsumeResponseListener listener) {
        ConsumeParams consumeParams =
                ConsumeParams.newBuilder()
                        .setPurchaseToken(purseToken)
                        .setDeveloperPayload(payLoad)
                        .build();

        billingClient.consumeAsync(consumeParams, listener);
    }
}
