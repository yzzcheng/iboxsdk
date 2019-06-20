package com.iboxsdk2.singleton;

import android.app.Activity;
import android.content.Context;

public final class IBoxSDKContext {
    private static final IBoxSDKContext ourInstance = new IBoxSDKContext();

    public static IBoxSDKContext getInstance() {
        return ourInstance;
    }

    private Activity activity;
    private boolean isInit = false;
    private boolean isPayInit = false;
    private Integer appId;
    private Integer packageId;
    private String appKey;

    public boolean isInit() {
        return isInit;
    }

    public void setInit(boolean init) {
        isInit = init;
    }

    public Integer getAppId() {
        return appId;
    }

    public void setAppId(Integer appId) {
        this.appId = appId;
    }

    public Integer getPackageId() {
        return packageId;
    }

    public void setPackageId(Integer packageId) {
        this.packageId = packageId;
    }

    public String getAppKey() {
        return appKey;
    }

    public void setAppKey(String appKey) {
        this.appKey = appKey;
    }

    public Activity getActivity() {
        return activity;
    }

    public void setActivity(Activity activity) {
        this.activity = activity;
    }

    public boolean isPayInit() {
        return isPayInit;
    }

    public void setPayInit(boolean payInit) {
        isPayInit = payInit;
    }

    private IBoxSDKContext() {

    }
}
