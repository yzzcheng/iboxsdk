package com.iboxsdk.bean;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.iboxsdk.abstracts.EventData;

public class InitEvent implements EventData {

    private Integer appId;
    private String packageName;

    public Integer getAppId() {
        return appId;
    }

    public void setAppId(Integer appId) {
        this.appId = appId;
    }

    public String getPackageName() {
        return packageName;
    }

    public void setPackageName(String packageName) {
        this.packageName = packageName;
    }

    @Override
    public WritableMap toMap() {

        WritableMap map = Arguments.createMap();
        map.putInt("appId",appId);
        map.putString("packageName",packageName);
        return map;
    }
}
