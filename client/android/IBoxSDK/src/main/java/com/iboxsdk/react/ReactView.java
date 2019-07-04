package com.iboxsdk.react;

import android.app.ActionBar;
import android.app.Activity;
import android.graphics.Color;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.common.LifecycleState;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.shell.MainReactPackage;
import com.iboxsdk.abstracts.Action;
import com.iboxsdk.singleton.IBoxSDKContext;
import com.iboxsdk.singleton.IBoxSDKService;

import java.net.PortUnreachableException;

public class ReactView {
    private ReactRootView mReactRootView;
    private ReactInstanceManager mReactInstanceManager;
    private ReactActive mythsActivity;

    public  interface ReactInitCallback{
        void callback(boolean isSuccess,Activity activity,ReactView reactView);
    }

    /**
     *
     * @param activity
     * @param callback
     */
    public ReactView(Activity activity, ReactInitCallback callback){
        this.init(activity,callback);
    }

    public void init(final Activity activity, final ReactInitCallback callback){
        final ReactView reactView = this;
        try {

            IBoxSDKService.getInstance().getBundleService().checkBundleVersion(activity, new Action<String>() {
                @Override
                public void Action(String path) {
                    mReactRootView = new ReactRootView(activity);
                    mReactInstanceManager = ReactInstanceManager.builder()
                            .setApplication(activity.getApplication())
                            .setCurrentActivity(activity)
                            .setJSBundleFile(path)
                            .setJSMainModulePath("index")
                            .addPackage(new MainReactPackage())
                            .addPackage(new ReactModulePackage())
                            .setUseDeveloperSupport(true)
                            .setInitialLifecycleState(LifecycleState.RESUMED)
                            .build();
                    mReactInstanceManager.addReactInstanceEventListener(new ReactInstanceManager.ReactInstanceEventListener() {
                        @Override
                        public void onReactContextInitialized(ReactContext context) {
                            callback.callback(true,activity, reactView);
                        }
                    });
                    mReactRootView.startReactApplication(mReactInstanceManager, "iboxsdk", null);
                    mReactRootView.setBackgroundColor(Color.TRANSPARENT);
                    mReactRootView.setEventListener(new ReactRootView.ReactRootViewEventListener() {
                        @Override
                        public void onAttachedToReactInstance(ReactRootView reactRootView) {
                            if(mythsActivity == null) {
                                mythsActivity = new ReactActive(activity);
                            } else {
                               hide();
                            }
                            mythsActivity.setContentView(reactRootView);
                        }
                    });
                }
            });
        }catch (Exception e){
            callback.callback(false,activity,reactView);
        }


    }

    public DeviceEventManagerModule.RCTDeviceEventEmitter emitter() {
        return this.mReactInstanceManager.getCurrentReactContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class);
    }


    public void show(){
        if(!this.mythsActivity.isShowing()){
            IBoxSDKContext.getInstance().getActivity().runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    mythsActivity.show();
                }
            });
        }
    }

    public void hide(){
        if(this.mythsActivity.isShowing()){
            IBoxSDKContext.getInstance().getActivity().runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    mythsActivity.cancel();
                }
            });

        }
    }

    public void reSize(final int width,final int height){

        IBoxSDKContext.getInstance().getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                android.view.WindowManager.LayoutParams p = mythsActivity.getWindow().getAttributes();
                p.height = (int)(mythsActivity.getContext().getResources().getDisplayMetrics().density * height);
                p.width = (int)(mythsActivity.getContext().getResources().getDisplayMetrics().density * width);
                mythsActivity.getWindow().setAttributes(p);
            }
        });

    }

    @Override
    public boolean equals(Object obj) {
        return mReactRootView.getContext().equals(obj);
    }

}
