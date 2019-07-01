package com.iboxsdk.react;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.iboxsdk.consts.EventConsts;
import com.iboxsdk.consts.EventParam;
import com.iboxsdk.singleton.IBoxEventDispatcher;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public class ReactEventListener extends ReactContextBaseJavaModule {

    public ReactEventListener(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Nonnull
    @Override
    public String getName() {
        return "ReactEventListener";
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(EventConsts.INIT, EventConsts.INIT);
        constants.put(EventConsts.LOGIN, EventConsts.LOGIN);
        constants.put(EventConsts.START_GOOGLE_PAY, EventConsts.START_GOOGLE_PAY);
        constants.put(EventConsts.START_PLUS_PAY, EventConsts.START_PLUS_PAY);
        constants.put(EventConsts.ORDER_CREATE, EventConsts.ORDER_CREATE);
        constants.put(EventConsts.ORDER_FINISH, EventConsts.ORDER_FINISH);
        constants.put(EventConsts.CLOSE_SDK, EventConsts.CLOSE_SDK);
        constants.put(EventConsts.SHOW_SDK, EventConsts.SHOW_SDK);
        constants.put(EventConsts.FACEBOOK_LOGIN, EventConsts.FACEBOOK_LOGIN);
        constants.put(EventConsts.GOOGLE_PAY_FINISH, EventConsts.GOOGLE_PAY_FINISH);
        constants.put(EventConsts.GOOGLE_PLUS_PAY_FINISH, EventConsts.GOOGLE_PLUS_PAY_FINISH);

        constants.put(EventConsts.AUTO_LOGIN, EventConsts.AUTO_LOGIN);

        constants.put(EventConsts.OPEN_ACCOUNT_CENTER, EventConsts.OPEN_ACCOUNT_CENTER);

        constants.put(EventConsts.OPEN_COSTOMER_CENTER, EventConsts.OPEN_COSTOMER_CENTER);

        constants.put(EventConsts.AUTO_LOGIN, EventConsts.AUTO_LOGIN);

        constants.put(EventParam.MESSAGE, EventParam.MESSAGE);
        constants.put(EventParam.STATUS, EventParam.STATUS);
        constants.put(EventParam.DIALOG_STATUS, EventParam.DIALOG_STATUS);
        return constants;
    }

    @ReactMethod
    public void sendMsgToNative(String eventType, ReadableMap data) {
        IBoxEventDispatcher.getInstance().dispatcherEvent(eventType,data);
    }
}
