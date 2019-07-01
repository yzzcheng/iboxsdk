package com.iboxsdk.singleton;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.iboxsdk.abstracts.Action;
import com.iboxsdk.abstracts.EventReciever;
import com.iboxsdk.abstracts.InitCallback;
import com.iboxsdk.abstracts.LoginCallback;
import com.iboxsdk.abstracts.PaymentCallback;
import com.iboxsdk.abstracts.SDKCallback;
import com.iboxsdk.bean.SDKFinishOrderEvent;
import com.iboxsdk.bean.SDKUserEvent;
import com.iboxsdk.consts.EventConsts;
import com.iboxsdk.consts.EventParam;
import com.iboxsdk.imp.IBoxSDKEventReciever;

import java.util.HashMap;
import java.util.Map;

public final class IBoxEventDispatcher {
    private static IBoxEventDispatcher ourInstance = new IBoxEventDispatcher();

    public static IBoxEventDispatcher getInstance() {
        return ourInstance;
    }

    Map<String, SDKCallback> map = new HashMap<>();

    EventReciever reciever = new IBoxSDKEventReciever();


    public void addListener(String eventType, SDKCallback callback) {
        map.put(eventType, callback);
    }

    public void dispatcherEvent(String eventType, ReadableMap data) {
        int status = data.getInt(EventParam.STATUS);
        final SDKCallback sdkCallback = map.get(eventType);
        if (status != 200) {
            sdkCallback.Error(status, data.getString(EventParam.MESSAGE));
            return;
        }
        //控制原生窗体是否显示
        if (data.hasKey(EventParam.DIALOG_STATUS)) {
            if (data.getInt(EventParam.DIALOG_STATUS) == 0) {
                IBoxReactView.getInstance().getReactView().hide();
            } else IBoxReactView.getInstance().getReactView().show();
        }

        switch (eventType) {
            case EventConsts.INIT:
                reciever.init();
                if (sdkCallback != null){
                    ((InitCallback) sdkCallback).InitSuccess();
                }

                break;
            case EventConsts.LOGIN:
                if (sdkCallback != null){
                    ((LoginCallback) sdkCallback).LoginSuccess(new SDKUserEvent().fromMap(data));
                }
                break;
            case EventConsts.ORDER_FINISH:
                if (sdkCallback != null){
                    ((PaymentCallback) sdkCallback).PaymentFinish();
                }

                break;
            case EventConsts.GOOGLE_PAY_FINISH:
            case EventConsts.GOOGLE_PLUS_PAY_FINISH:
                reciever.finishOrder(new SDKFinishOrderEvent().fromMap(data), new Action() {
                    @Override
                    public void Action(Object data) {
                        if (sdkCallback != null){
                            ((PaymentCallback) sdkCallback).PaymentFinish();
                        }

                    }
                });
            case EventConsts.CLOSE_SDK:
                reciever.closeSDK();
                break;

            case EventConsts.SHOW_SDK:
                reciever.showSDK();
                break;
            case EventConsts.AUTO_LOGIN:
                if (sdkCallback != null){
                    ((LoginCallback) sdkCallback).LoginSuccess(new SDKUserEvent().fromMap(data));
                }
                break;
            default:
                break;
        }
    }

    public void dispatcherEvent(String eventType, WritableMap data) {
        int status = data.getInt(EventParam.STATUS);
        final SDKCallback sdkCallback = map.get(eventType);
        if (status != 200) {
            sdkCallback.Error(status, data.getString(EventParam.MESSAGE));
            return;
        }
        switch (eventType) {
            case EventConsts.INIT:
                reciever.init();
                ((InitCallback) sdkCallback).InitSuccess();
                break;
            case EventConsts.LOGIN:
                ((LoginCallback) sdkCallback).LoginSuccess(new SDKUserEvent().fromMap(data));
                break;
            case EventConsts.ORDER_FINISH:
                ((PaymentCallback) sdkCallback).PaymentFinish();
                break;
        }
    }

    private IBoxEventDispatcher() {

    }
}
