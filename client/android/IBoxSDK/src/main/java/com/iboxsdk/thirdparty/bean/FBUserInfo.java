package com.iboxsdk.thirdparty.bean;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.iboxsdk.abstracts.EventData;

public class FBUserInfo implements EventData {
    private String userId;
    private String userName;
    private String email;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public WritableMap toMap() {
        WritableMap map = Arguments.createMap();
        map.putString("id",getUserId());
        map.putString("name",getUserName());
        map.putString("email",getEmail());
        return map;
    }
}
