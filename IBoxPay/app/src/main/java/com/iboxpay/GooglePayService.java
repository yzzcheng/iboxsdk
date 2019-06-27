package com.iboxpay;

import android.app.Activity;
import android.content.Intent;

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
import com.orhanobut.logger.Logger;

import java.util.ArrayList;
import java.util.List;

public class GooglePayService {
    private final String[] stateList = new String[]{"create","finish"};
    private String state;
    // 商品消耗完成
    private final int PUSECHASE_FINISH = 200001;

    //交易成功
    private final int PUSECHASE_SUCCESS = 200002;

    //交易失败
    private final int PUSECHASE_FAILURE = 200003;

    private Activity activity;
    private BillingClient billingClient;


    public GooglePayService(final Activity activity){
        this.activity = activity;
        this.state = activity.getIntent().getStringExtra("action");
        this.billingClient = BillingClient.newBuilder(activity).setListener(new PurchasesUpdatedListener() {
            @Override
            public void onPurchasesUpdated(BillingResult billingResult, List<Purchase> purchases) {

                if (billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK) {
                    for(Purchase purchase : purchases) {
                        Intent intent = new Intent();
                        intent.putExtra("developerPayload",purchase.getDeveloperPayload());
                        intent.putExtra("purchaseToken",purchase.getPurchaseToken());
                        intent.putExtra("orderId",purchase.getOrderId());
                        intent.putExtra("signature",purchase.getSignature());
                        intent.putExtra("purchaseState",purchase.getPurchaseState());
                        intent.putExtra("originalJson",purchase.getOriginalJson());
                        intent.putExtra("purchaseTime",purchase.getPurchaseTime());
                        activity.setResult(PUSECHASE_SUCCESS,intent);
                        activity.finish();
                    }
                }else {
                    activity.setResult(PUSECHASE_FAILURE);
                    activity.finish();
                }
            }
        }).enablePendingPurchases().build();
    }


    public void doHandle(){
        if(!"create".equals(this.state) && !"finish".equals(this.state)) {
            activity.finish();
            return ;
        }
        billingClient.startConnection(new BillingClientStateListener() {

            @Override
            public void onBillingSetupFinished(BillingResult billingResult) {
                if("create".equals(state)){
                    Intent intent = activity.getIntent();
                    String productName = intent.getStringExtra("productName");
                    //拉起支付
                    SkuDetailsParams.Builder params = SkuDetailsParams.newBuilder();
                    final List<String> sku = new ArrayList<>(1);
                    sku.add(productName);
                    params.setSkusList(sku).setType(BillingClient.SkuType.INAPP);
                    Purchase.PurchasesResult purchasesResult = billingClient.queryPurchases(BillingClient.SkuType.INAPP);

                    if(purchasesResult.getResponseCode() == BillingClient.BillingResponseCode.OK) {

                        for(Purchase purchase : purchasesResult.getPurchasesList()) {
                            Intent sendIntent = new Intent();
                            sendIntent.putExtra("developerPayload",purchase.getDeveloperPayload());
                            sendIntent.putExtra("purchaseToken",purchase.getPurchaseToken());
                            sendIntent.putExtra("orderId",purchase.getOrderId());
                            sendIntent.putExtra("signature",purchase.getSignature());
                            sendIntent.putExtra("purchaseState",purchase.getPurchaseState());
                            sendIntent.putExtra("originalJson",purchase.getOriginalJson());
                            sendIntent.putExtra("purchaseTime",purchase.getPurchaseTime());
                            activity.setResult(PUSECHASE_SUCCESS,sendIntent);
                            activity.finish();
                        }
                    }


                    billingClient.querySkuDetailsAsync(params.build(),
                            new SkuDetailsResponseListener() {
                                @Override
                                public void onSkuDetailsResponse(BillingResult billingResult,
                                                                 List<SkuDetails> skuDetailsList) {
                                    if (billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK) {
                                        if (skuDetailsList != null && skuDetailsList.size() > 0) {
                                            for(SkuDetails skuDetails : skuDetailsList) {
                                                create(skuDetails);
                                            }
                                        }
                                    }else   activity.finish();

                                }
                            });
                } else if("finish".equals(state)) {
                    //消耗商品
                    Intent intent = activity.getIntent();
                    final String purseToken = intent.getStringExtra("purchaseToken");
                    final String developerPayload = intent.getStringExtra("developerPayload");
                    finish(purseToken,developerPayload,new ConsumeResponseListener(){
                        @Override
                        public void onConsumeResponse(BillingResult billingResult, String purchaseToken) {
                            Logger.d("finish action",purseToken,developerPayload);
                            Intent intent = activity.getIntent();
                            if(billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK){
                                Intent sendIntent = new Intent();
                                sendIntent.putExtra("developerPayload",intent.getStringExtra("developerPayload"));
                                sendIntent.putExtra("purchaseToken",intent.getStringExtra("purchaseToken"));
                                sendIntent.putExtra("orderId",intent.getStringExtra("orderId"));
                                sendIntent.putExtra("signature",intent.getStringExtra("signature"));
                                sendIntent.putExtra("purchaseState",intent.getStringExtra("purchaseState"));
                                sendIntent.putExtra("originalJson",intent.getStringExtra("originalJson"));
                                sendIntent.putExtra("purchaseTime",intent.getStringExtra("purchaseTime"));
                                activity.setResult(PUSECHASE_FINISH,sendIntent);
                            }
                            activity.finish();

                        }
                    });
                }
            }

            @Override
            public void onBillingServiceDisconnected() {
//                billingClient.startConnection(this);
                activity.finish();
            }
        });
    }

    public void finish(String purseToken, String payLoad, ConsumeResponseListener listener) {
        ConsumeParams consumeParams =
                ConsumeParams.newBuilder()
                        .setPurchaseToken(purseToken)
                        .setDeveloperPayload(payLoad)
                        .build();

        billingClient.consumeAsync(consumeParams, listener);
    }
    public void create(SkuDetails skuDetails) {
        BillingFlowParams flowParams = BillingFlowParams.newBuilder()
                .setSkuDetails(skuDetails)
                .build();
        billingClient.launchBillingFlow(activity, flowParams);
    }

}
