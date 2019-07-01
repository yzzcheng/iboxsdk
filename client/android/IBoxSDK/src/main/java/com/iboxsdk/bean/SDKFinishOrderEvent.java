package com.iboxsdk.bean;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.iboxsdk.abstracts.EventData;

public class SDKFinishOrderEvent implements EventData {

    private Integer appId;
    private Integer packageId;
    private String transactionId;
    private String signature;
    private String developerPayload;
    private String orderId;
    private String purchaseState;
    private String originalJson;
    private String purchaseTime;
    private String purchaseToken;
    private int type;
    private String dataString;


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

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getPurchaseState() {
        return purchaseState;
    }

    public void setPurchaseState(String purchaseState) {
        this.purchaseState = purchaseState;
    }

    public String getOriginalJson() {
        return originalJson;
    }

    public void setOriginalJson(String originalJson) {
        this.originalJson = originalJson;
    }

    public String getPurchaseTime() {
        return purchaseTime;
    }

    public void setPurchaseTime(String purchaseTime) {
        this.purchaseTime = purchaseTime;
    }

    public String getPurchaseToken() {
        return purchaseToken;
    }

    public void setPurchaseToken(String purchaseToken) {
        this.purchaseToken = purchaseToken;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public String getDataString() {
        return dataString;
    }

    public void setDataString(String dataString) {
        this.dataString = dataString;
    }

    @Override
    public WritableMap toMap() {
        WritableMap map = Arguments.createMap();
        map.putInt("appId",appId);
        map.putInt("pacakgeId",packageId);
        map.putString("signature", signature);
        map.putString("developerPayload", developerPayload);
        map.putString("transactionId",transactionId);
        map.putString("orderId",orderId);
        map.putString("purchaseState",purchaseState);
        map.putString("originalJson",originalJson);
        map.putString("purchaseTime",purchaseTime);
        map.putString("purchaseToken",purchaseToken);
        map.putInt("type",type);
        map.putString("dataString",dataString);
        return map;
    }

    public SDKFinishOrderEvent fromMap(ReadableMap map){
        this.setSignature(map.getString("signature"));
        this.setAppId(map.getInt("appId"));
        this.setPackageId(map.getInt("pacakgeId"));
        this.setDeveloperPayload(map.getString("developerPayload"));
        this.setTransactionId(map.getString("transactionId"));
        this.setOrderId(map.getString("orderId"));
        this.setPurchaseState(map.getString("purchaseState"));
        this.setPurchaseToken(map.getString("purchaseToken"));
        this.setPurchaseTime(map.getString("purchaseTime"));
        this.setType(map.getInt("type"));
        this.setDataString(map.getString("dataString"));
        return this;
    }



}
