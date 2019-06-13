package com.iboxsdk2.bean;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.iboxsdk2.abstracts.EventData;

public class SDKFinishOrderEvent implements EventData {

    private Integer appId;
    private Integer packageId;
    private String transactionId;
    private String signature;
    private String developerPayload;
    private String purseToken;

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

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public String getSignature() {
        return signature;
    }

    public void setSignature(String signature) {
        this.signature = signature;
    }

    public String getDeveloperPayload() {
        return developerPayload;
    }

    public void setDeveloperPayload(String developerPayload) {
        this.developerPayload = developerPayload;
    }

    public String getPurseToken() {
        return purseToken;
    }

    public void setPurseToken(String purseToken) {
        this.purseToken = purseToken;
    }

    @Override
    public WritableMap toMap() {
        WritableMap map = Arguments.createMap();
        map.putInt("appId",appId);
        map.putInt("pacakgeId",packageId);
        map.putString("signature", signature);
        map.putString("developerPayload", developerPayload);
        map.putString("transactionId",transactionId);
        map.putString("purseToken",purseToken);
        return map;
    }

    public SDKFinishOrderEvent fromMap(ReadableMap map){
        this.setSignature(map.getString("signature"));
        this.setAppId(map.getInt("appId"));
        this.setPackageId(map.getInt("pacakgeId"));
        this.setDeveloperPayload(map.getString("developerPayload"));
        this.setTransactionId(map.getString("transactionId"));
        this.setPurseToken(map.getString("purseToken"));
        return this;
    }

}
