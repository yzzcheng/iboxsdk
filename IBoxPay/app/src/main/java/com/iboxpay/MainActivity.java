package com.iboxpay;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.widget.Toast;

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
import com.orhanobut.logger.AndroidLogAdapter;
import com.orhanobut.logger.Logger;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends Activity {
    private BillingClient billingClient;



    // 商品消耗完成
    private final int PUSECHASE_FINISH = 200001;

    //交易成功
    private final int PUSECHASE_SUCCESS = 200002;

    //交易失败
    private final int PUSECHASE_FAILURE = 200003;

    private String action = "create";

//    private String productName = "";
    @Override
    protected void onCreate(final Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Logger.addLogAdapter(new AndroidLogAdapter());
        final Intent intent = this.getIntent();
        if(!intent.hasExtra("action")) return ;
        this.action = intent.getStringExtra("action");

        billingClient = BillingClient.newBuilder(this).setListener(new PurchasesUpdatedListener() {
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
                        setResult(PUSECHASE_SUCCESS,intent);
                        finish();
                    }
                }else {
                    setResult(PUSECHASE_FAILURE);
                    finish();
                }
            }
        }).enablePendingPurchases().build();
        billingClient.startConnection(new BillingClientStateListener() {

            @Override
            public void onBillingSetupFinished(BillingResult billingResult) {
                if("create".equals(action)){
                    String productName = intent.getStringExtra("productName");
                    //拉起支付
                    SkuDetailsParams.Builder params = SkuDetailsParams.newBuilder();
                    final List<String> sku = new ArrayList<>(1);
                    sku.add(productName);
                    params.setSkusList(sku).setType(BillingClient.SkuType.INAPP);
                    Purchase.PurchasesResult purchasesResult = billingClient.queryPurchases(BillingClient.SkuType.INAPP);

                    if(purchasesResult.getResponseCode() == BillingClient.BillingResponseCode.OK) {

                        for(Purchase purchase : purchasesResult.getPurchasesList()) {
                            Intent intent = new Intent();
                            intent.putExtra("developerPayload",purchase.getDeveloperPayload());
                            intent.putExtra("purchaseToken",purchase.getPurchaseToken());
                            intent.putExtra("orderId",purchase.getOrderId());
                            intent.putExtra("signature",purchase.getSignature());
                            intent.putExtra("purchaseState",purchase.getPurchaseState());
                            intent.putExtra("originalJson",purchase.getOriginalJson());
                            intent.putExtra("purchaseTime",purchase.getPurchaseTime());
                            setResult(PUSECHASE_SUCCESS,intent);
                            finish();
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
                                    }else   finish();

                                }
                            });
                } else if("finish".equals(action)) {
                    //消耗商品
                    final String purseToken = intent.getStringExtra("purchaseToken");
                    final String developerPayload = intent.getStringExtra("developerPayload");
                    finish(purseToken,developerPayload,new ConsumeResponseListener(){
                        @Override
                        public void onConsumeResponse(BillingResult billingResult, String purchaseToken) {
                            Logger.d("finish action",purseToken,developerPayload);
                            if(billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK){
                                setResult(PUSECHASE_FINISH);
                            }
                            finish();

                        }
                    });
                }
            }

            @Override
            public void onBillingServiceDisconnected() {
//                billingClient.startConnection(this);
                finish();
            }
        });






    }

    public void create(SkuDetails skuDetails) {
                BillingFlowParams flowParams = BillingFlowParams.newBuilder()
                        .setSkuDetails(skuDetails)
                        .build();
                billingClient.launchBillingFlow(this, flowParams);
    }

    public void finish(String purseToken, String payLoad, ConsumeResponseListener listener) {
        ConsumeParams consumeParams =
                ConsumeParams.newBuilder()
                        .setPurchaseToken(purseToken)
                        .setDeveloperPayload(payLoad)
                        .build();

        billingClient.consumeAsync(consumeParams, listener);
    }
}
