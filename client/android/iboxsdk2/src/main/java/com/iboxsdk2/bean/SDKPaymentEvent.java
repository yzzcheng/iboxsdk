package com.iboxsdk2.bean;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.iboxsdk2.abstracts.EventData;

public class SDKPaymentEvent extends SDKPayment implements EventData {

    private Integer appId;
    private Integer packageId;
    private String packageName;
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

    public String getPackageName() {
        return packageName;
    }

    public void setPackageName(String packageName) {
        this.packageName = packageName;
    }


    public SDKPaymentEvent fromSDKPayment(SDKPayment sdkPayment){
        this.setProductName(sdkPayment.getProductName());
        this.setDiamond(sdkPayment.getDiamond());
        this.setGameZoneId(sdkPayment.getGameZoneId());
        this.setRoleId(sdkPayment.getRoleId());
        this.setLevel(sdkPayment.getLevel());
        this.setVipLevel(sdkPayment.getVipLevel());
        this.setRoleName(sdkPayment.getRoleName());
        this.setExt(sdkPayment.getExt());
        return this;
    }

    @Override
    public WritableMap toMap() {
        WritableMap map = Arguments.createMap();
        map.putInt("appId",this.appId);
        map.putInt("packageId",packageId);
        map.putString("packageName",packageName);
        map.putString("productName",getProductName());
        return map;
    }
}
