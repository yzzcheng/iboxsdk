package com.iboxsdk2.payment;

import android.app.Activity;
import android.app.Service;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.IBinder;

import com.iboxsdk2.abstracts.ActivityResult;
import com.iboxsdk2.payment.plus.ProductGoods;
import com.iboxsdk2.singleton.IBoxSDKContext;
import com.orhanobut.logger.Logger;

public class PlusGoogleService implements ActivityResult {

    public static final int INT_TRANSFER_AIDL = 5000;
    public static final int INVOKE_REQUEST_CODE = 100;


    // 商品消耗完成
    private final int PUSECHASE_FINISH = 200001;

    //交易成功
    private final int PUSECHASE_SUCCESS = 200002;

    //交易失败
    private final int PUSECHASE_FAILURE = 200003;

    public void startPay(String sku){
        String clientAction = "com.gamepay.kdcm://aidl_pay";
        Intent checkIntent = new Intent();
        checkIntent.setData(Uri.parse(String.format(clientAction)));
        Bundle checkBundle = new Bundle();
        checkBundle.putString("packageName", IBoxSDKContext.getInstance().getActivity().getPackageName());
        checkIntent.putExtras(checkBundle);
        if(checkIntent.resolveActivity(IBoxSDKContext.getInstance().getActivity().getPackageManager()) == null) {

            Logger.e("not find plus app");
            return ;
        }
        Intent doPayIntent = new Intent();
        doPayIntent.setData(Uri.parse(String.format(clientAction)));

        ProductGoods goods = new ProductGoods();
        Bundle doPayBundle = new Bundle();
        doPayBundle.putString("packageName",IBoxSDKContext.getInstance().getActivity().getPackageName());
        doPayBundle.putString("key","MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmbSQE7bgcVsO1CN1wZc5bMsnR+MUn0R8U5BINI1QQO7inb96P2p08v9QaHy/3mhUFo0o4oTmjnh/TMeMedmvhwyA8ONEOlZKmy4OT0mGdN7bPcSlJ2g9j2QmF/+mRRBUXkCfDw+EF5ZmRo7ljTd8NIr2NrPKZk2jGFBAaMF0twx1BanT9RA0idiVABSdMIv8SVouIAMjOu/KKDGYdca++V5xBfhGojKBbYSxsCQOQobvLZteozjcEIu014bnAV1mCuK8rXLITu2RYMxB/WLM19H5ggUmKixdneDBSRZAJzGR/lq9ZHGZZprfzabzDnL95aOtRq44ZGeWtUlFeJDlsQIDAQAB");
        doPayBundle.putString("productId",sku);
        doPayBundle.putParcelable("gpGoods",goods);
        doPayBundle.putInt("consumeCode",-1);
        doPayBundle.putInt("transferType",INT_TRANSFER_AIDL);
        doPayIntent.putExtras(doPayBundle);
        IBoxSDKContext.getInstance().getActivity().startActivityForResult(doPayIntent,INVOKE_REQUEST_CODE);
    }

    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        Logger.d("plus app callbak",requestCode,requestCode,data);

        if(resultCode == PUSECHASE_SUCCESS) {
            Intent intent = new Intent();
            intent.setData(Uri.parse("com.bdgames.xmyxwno1://pluspay"));
            intent.putExtra("action","finish");
            intent.putExtra("purchaseToken",data.getStringExtra("purchaseToken"));
            intent.putExtra("developerPayload",data.getStringExtra("developerPayload"));
            IBoxSDKContext.getInstance().getActivity().startActivityForResult(intent,0);
        }

    }
}
