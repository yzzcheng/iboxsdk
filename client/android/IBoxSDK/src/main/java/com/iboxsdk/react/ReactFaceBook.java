package com.iboxsdk.react;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.iboxsdk.singleton.IBoxSDKService;
import com.iboxsdk.thirdparty.bean.FBUserInfo;
import com.iboxsdk.thirdparty.bean.FacebookLoginCallBack;

import javax.annotation.Nonnull;

public class ReactFaceBook extends ReactContextBaseJavaModule {
    public ReactFaceBook(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Nonnull
    @Override
    public String getName() {
        return "FaceBookService";
    }

    @ReactMethod
    public void doLogin(final Callback successCallback){
        IBoxSDKService.getInstance().getFaceBookService().doLogin(new FacebookLoginCallBack() {
            @Override
            public void loginSuccess(FBUserInfo userInfo) {
                successCallback.invoke(userInfo.toMap());
            }
        });
    }
}
