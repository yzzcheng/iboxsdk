package com.iboxsdk2.abstracts;

import com.iboxsdk2.bean.SDKUser;

public interface LoginCallback extends SDKCallback {
    void LoginSuccess(SDKUser user);
}
