package com.iboxsdk2.singleton;

import com.facebook.react.bridge.ReadableMap;
import com.iboxsdk2.abstracts.EventReciever;
import com.iboxsdk2.abstracts.InitCallback;
import com.iboxsdk2.abstracts.LoginCallback;
import com.iboxsdk2.abstracts.PaymentCallback;
import com.iboxsdk2.abstracts.SDKCallback;
import com.iboxsdk2.bean.SDKFinishOrderEvent;
import com.iboxsdk2.bean.SDKUserEvent;
import com.iboxsdk2.consts.EventConsts;
import com.iboxsdk2.consts.EventParam;
import com.iboxsdk2.imp.IBoxSDKEventReciever;

import java.util.HashMap;
import java.util.Map;

public final class IBoxEventDispatcher {
    private static final IBoxEventDispatcher ourInstance = new IBoxEventDispatcher();

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
        SDKCallback sdkCallback = map.get(eventType);
        if(status != 200) {
            sdkCallback.Error(status,data.getString(EventParam.MESSAGE));
            return ;
        }
        if(sdkCallback == null) return ;
        switch (eventType) {
            case EventConsts.INIT:reciever.init(); ((InitCallback)sdkCallback).InitSuccess();break;
            case EventConsts.LOGIN:((LoginCallback)sdkCallback).LoginSuccess(new SDKUserEvent().fromMap(data));break;
            case EventConsts.ORDER_FINISH:reciever.finishOrder(new SDKFinishOrderEvent().fromMap(data));((PaymentCallback)sdkCallback).PaymentFinish();break;
            default:break;
        }
    }

    private IBoxEventDispatcher() {
    }
}
