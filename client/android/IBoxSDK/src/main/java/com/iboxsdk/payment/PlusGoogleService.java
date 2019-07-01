package com.iboxsdk.payment;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.iboxsdk.abstracts.ActivityResult;
import com.iboxsdk.abstracts.IBoxSDK;
import com.iboxsdk.bean.SDKFinishOrderEvent;
import com.iboxsdk.consts.ConfigConsts;
import com.iboxsdk.consts.EventConsts;
import com.iboxsdk.consts.EventParam;
import com.iboxsdk.singleton.IBoxEventDispatcher;
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
            Integer appId = IBoxSDKContext.getInstance().getAppId();
            Integer packageId = IBoxSDKContext.getInstance().getPackageId();
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
            event.setDataString(data.getStringExtra("dataString"));
            event.setType(1);
            IBoxReactView.getInstance().getReactView().emitter().emit(EventConsts.GOOGLE_PLUS_PAY_FINISH, event.toMap());
        }else if(resultCode == PUSECHASE_FINISH){
            WritableMap map = Arguments.createMap();
            map.putInt(EventParam.STATUS,200);
            IBoxEventDispatcher.getInstance().dispatcherEvent(EventConsts.ORDER_FINISH,map);
        }

    }
    public void finishPay(SDKFinishOrderEvent event){
        Intent intent = new Intent();
        Uri url = Uri.parse(event.getDataString());
        intent.setData(url);
        intent.putExtra("action","finish");
        intent.putExtra("orderId",event.getOrderId());
        intent.putExtra("signature",event.getSignature());
        intent.putExtra("purchaseState",event.getPurchaseState());
        intent.putExtra("originalJson",event.getOriginalJson());
        intent.putExtra("purchaseTime",event.getPurchaseTime());
        intent.putExtra("purchaseToken",event.getPurchaseToken());
        intent.putExtra("developerPayload",event.getDeveloperPayload());
        IBoxSDKContext.getInstance().getActivity().startActivityForResult(intent,0);
    }
}
