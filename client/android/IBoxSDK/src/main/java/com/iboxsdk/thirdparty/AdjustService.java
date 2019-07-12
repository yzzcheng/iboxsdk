package com.iboxsdk.thirdparty;

import android.app.Activity;
import android.app.Application;
import android.os.Bundle;

import com.adjust.sdk.Adjust;
import com.adjust.sdk.AdjustConfig;
import com.adjust.sdk.AdjustEvent;
import com.iboxsdk.singleton.IBoxSDKContext;
import com.iboxsdk.utils.ResourceUtils;

import java.util.Map;

public class AdjustService {



    public void init(){
        final Activity activity = IBoxSDKContext.getInstance().getActivity();
        String appToken = ResourceUtils.getString(activity,"adjust_app_token");
        String environment = AdjustConfig.ENVIRONMENT_SANDBOX;
        AdjustConfig config = new AdjustConfig(activity, appToken, environment);
        Adjust.onCreate(config);
        activity.getApplication().registerActivityLifecycleCallbacks(new Application.ActivityLifecycleCallbacks() {
            @Override
            public void onActivityCreated(Activity activity, Bundle savedInstanceState) {

            }

            @Override
            public void onActivityStarted(Activity activity) {

            }

            @Override
            public void onActivityResumed(Activity activity) {
                Adjust.onResume();
            }

            @Override
            public void onActivityPaused(Activity activity) {
                Adjust.onPause();
            }

            @Override
            public void onActivityStopped(Activity activity) {
            }

            @Override
            public void onActivitySaveInstanceState(Activity activity, Bundle outState) {

            }

            @Override
            public void onActivityDestroyed(Activity activity) {

            }
        });

    }

    public void trackEvent(String eventName,Map<String,Object> params){
        final Activity activity = IBoxSDKContext.getInstance().getActivity();
        String eventToken = ResourceUtils.getString(activity,eventName);
        AdjustEvent event = new AdjustEvent(eventToken);
        for(Map.Entry<String,Object> item : params.entrySet()){
            event.addCallbackParameter(item.getKey(),item.getValue().toString());
        }
        Adjust.trackEvent(event);
    }

    public void trackOrderEvent(String eventName,String currency,double money,Map<String,Object> params){
        final Activity activity = IBoxSDKContext.getInstance().getActivity();
        String eventToken = ResourceUtils.getString(activity,eventName);
        AdjustEvent event = new AdjustEvent(eventToken);
        for(Map.Entry<String,Object> item : params.entrySet()){
            event.addCallbackParameter(item.getKey(),item.getValue().toString());
        }
        event.setRevenue(money,currency);
        Adjust.trackEvent(event);
    }
}
