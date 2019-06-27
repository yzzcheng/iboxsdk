package com.iboxsdk.reciever;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

import com.orhanobut.logger.Logger;

public class InstallReciever extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        Logger.d("data",intent.getDataString());
        Logger.d("action",intent.getAction());
        Logger.d("scheme",intent.getScheme());
    }
}
