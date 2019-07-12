package com.iboxsdk.singleton;

import android.app.Activity;
import android.content.Intent;

import com.facebook.react.devsupport.DevSettingsActivity;
import com.iboxsdk.abstracts.IBoxSDK;
import com.iboxsdk.imp.IBoxSDKImp;

public class IBoxSDKAPI {
    private static IBoxSDKAPI ourInstance = new IBoxSDKAPI();

    public static IBoxSDKAPI getInstance() {
        return ourInstance;
    }

    private IBoxSDKAPI(){

    }

    IBoxSDK iBoxSDK = new IBoxSDKImp();

    public IBoxSDK getSDK() {
        return iBoxSDK;
    }

    public static void debugTools(Activity activity){
        IBoxReactView.getInstance().getReactView().showDevDialog();
    }
}
