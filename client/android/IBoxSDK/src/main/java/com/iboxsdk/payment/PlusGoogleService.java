package com.iboxsdk.payment;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;

import com.iboxsdk.abstracts.ActivityResult;
import com.iboxsdk.bean.SDKFinishOrderEvent;
import com.iboxsdk.consts.ConfigConsts;
import com.iboxsdk.consts.EventConsts;
import com.iboxsdk.singleton.IBoxReactView;
import com.iboxsdk.singleton.IBoxSDKContext;
import com.iboxsdk.utils.ResourceUtils;
import com.orhanobut.logger.Logger;

public class PlusGoogleService implements ActivityResult {

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
            intent.putExtra("orderId",data.getStringExtra("orderId"));
            intent.putExtra("signature",data.getStringExtra("signature"));
            intent.putExtra("purchaseState",data.getStringExtra("purchaseState"));
            intent.putExtra("originalJson",data.getStringExtra("originalJson"));
            intent.putExtra("purchaseTime",data.getStringExtra("purchaseTime"));
            intent.putExtra("purchaseToken",data.getStringExtra("purchaseToken"));
            intent.putExtra("developerPayload",data.getStringExtra("developerPayload"));
            IBoxSDKContext.getInstance().getActivity().startActivityForResult(intent,0);
        }else if(resultCode == PUSECHASE_FINISH){
            Activity activity = IBoxSDKContext.getInstance().getActivity();
            Integer appId = Integer.parseInt(ResourceUtils.getString(activity.getApplicationContext(), ConfigConsts.app_id));
            Integer packageId = Integer.parseInt(ResourceUtils.getString(activity.getApplicationContext(), ConfigConsts.package_id));
            SDKFinishOrderEvent event = new SDKFinishOrderEvent();
            event.setAppId(appId);
            event.setPackageId(packageId);
            event.setDeveloperPayload(data.getStringExtra("developerPayload"));
            event.setSignature(data.getStringExtra("signature"));
            event.setPurchaseTime(data.getStringExtra("purchaseToken"));
            event.setOrderId(data.getStringExtra("orderId"));
            event.setPurchaseTime(data.getStringExtra("purchaseTime"));
            event.setPurchaseToken(data.getStringExtra("purchaseToken"));
            event.setOriginalJson(data.getStringExtra("originalJson"));
            event.setPurchaseState(data.getStringExtra("purchaseState"));
            IBoxReactView.getInstance().getReactView().emitter().emit(EventConsts.ORDER_FINISH, event.toMap());
        }

    }
}
