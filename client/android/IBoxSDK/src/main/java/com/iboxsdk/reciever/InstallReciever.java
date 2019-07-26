package com.iboxsdk.reciever;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.iboxsdk.consts.EventConsts;
import com.iboxsdk.singleton.IBoxReactView;
import com.orhanobut.logger.Logger;

public class InstallReciever extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        try {
            WritableMap map = Arguments.createMap();
            map.putString("data", intent.getDataString());
            map.putString("action", intent.getAction());
            map.putString("package", intent.getPackage());
            map.putString("scheme", intent.getScheme());
            IBoxReactView.getInstance().getReactView().emitter().emit(EventConsts.ON_APP_INSTALL, map);
        }catch (Exception e){
            Logger.e("Install Reciver error",e);
        }
    }
}
