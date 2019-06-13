package com.iboxsdk2.singleton;

public final class IBoxSDKContext {
    private static final IBoxSDKContext ourInstance = new IBoxSDKContext();

    public static IBoxSDKContext getInstance() {
        return ourInstance;
    }


    private boolean isInit = false;
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

    private IBoxSDKContext() {

    }
}
