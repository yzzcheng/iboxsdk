package com.iboxsdk.bean;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.iboxsdk.abstracts.EventData;

public class LoginEvent implements EventData {

    private int accountType;

    public int getAccountType() {
        return accountType;
    }

    public void setAccountType(int accountType) {
        this.accountType = accountType;
    }

    @Override
    public WritableMap toMap() {
        WritableMap map = Arguments.createMap();
        map.putInt("accountType",accountType);
        return map;
    }
}
