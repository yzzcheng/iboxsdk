package com.iboxsdk.thirdparty.bean;

public interface GoogleSignInCallBack {
    void success(GoogleAccountInfo accountInfo);
    void error();
}
