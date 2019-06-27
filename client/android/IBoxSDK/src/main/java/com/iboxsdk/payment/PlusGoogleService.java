package com.iboxsdk.payment;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;

import com.iboxsdk.abstracts.ActivityResult;
import com.iboxsdk.payment.plus.ProductGoods;
import com.iboxsdk.singleton.IBoxSDKContext;
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

    public void startPay(String sku,String clientAction){
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

        Intent intent = new Intent();
        Uri url = Uri.parse(clientAction);
        intent.setData(url);
        intent.putExtra("action","create");
        intent.putExtra("productName",sku);
        IBoxSDKContext.getInstance().getActivity().startActivityForResult(intent,0);
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
