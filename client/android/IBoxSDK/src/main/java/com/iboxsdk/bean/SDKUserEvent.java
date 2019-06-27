package com.iboxsdk.bean;

import com.facebook.react.bridge.ReadableMap;


public class SDKUserEvent extends SDKUser {
    public SDKUser fromMap(ReadableMap map){
        this.setUserId(map.getInt("userId"));
        this.setUserName(map.getString("userName"));
        this.setToken(map.getString("token"));
        return this;
    }
}
