package com.iboxsdk.abstracts;

import com.iboxsdk.bean.SDKUser;

public interface LoginCallback extends SDKCallback {
    void LoginSuccess(SDKUser user);
}
