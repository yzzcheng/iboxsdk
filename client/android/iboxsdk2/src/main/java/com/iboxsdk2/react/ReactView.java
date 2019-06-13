package com.iboxsdk2.react;

import android.app.Activity;
import android.app.Dialog;
import android.arch.core.util.Function;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.common.LifecycleState;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.shell.MainReactPackage;
import com.iboxsdk2.abstracts.InitCallback;
import com.iboxsdk2.bean.InitEvent;
import com.iboxsdk2.consts.EventConsts;
import com.iboxsdk2.utils.ResourceUtils;
import com.orhanobut.logger.Logger;

import java.util.Map;

public class ReactView {
    private ReactRootView mReactRootView;
    private ReactInstanceManager mReactInstanceManager;
    private ReactActive mythsActivity;

    public  interface ReactInitCallback{
        void callback(Activity activity,ReactView reactView);
    }

    /**
     *
     * @param activity
     * @param callback
     */
    public ReactView(Activity activity,ReactInitCallback callback){
        this.init(activity,callback);
    }

    public void init(final Activity activity, final ReactInitCallback callback){
        this.mReactRootView = new ReactRootView(activity);
        this.mReactInstanceManager = ReactInstanceManager.builder()
                .setApplication(activity.getApplication())
                .setCurrentActivity(activity)
                .setBundleAssetName("index.android.bundle")
                .setJSMainModulePath("index")
                .addPackage(new MainReactPackage())
                .addPackage(new ReactModulePackage())
                .setUseDeveloperSupport(true)
                .setInitialLifecycleState(LifecycleState.RESUMED)
                .build();
        final ReactView reactView = this;
        this.mReactInstanceManager.addReactInstanceEventListener(new ReactInstanceManager.ReactInstanceEventListener() {
            @Override
            public void onReactContextInitialized(ReactContext context) {
                callback.callback(activity,reactView);
            }
        });
        mReactRootView.startReactApplication(mReactInstanceManager, "iboxsdk", null);
        this.mythsActivity = new ReactActive(activity);
        this.mythsActivity.setContentView(mReactRootView);

    }

    public DeviceEventManagerModule.RCTDeviceEventEmitter emitter() {
        return this.mReactInstanceManager.getCurrentReactContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class);
    }


    public void show(){
        if(!this.mythsActivity.isShowing()){
            this.mythsActivity.show();
        }
    }

    @Override
    public boolean equals(Object obj) {
        return mReactRootView.getContext().equals(obj);
    }
}
