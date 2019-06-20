package com.iboxsdk2.abstracts;

import android.app.Activity;
import android.content.Intent;

import com.iboxsdk2.bean.SDKPayment;
import com.iboxsdk2.bean.SDKRoleInfo;

public interface IBoxSDK {
    void init(Activity activity, InitCallback callback);
    void login(Activity activity,LoginCallback callback);
    void startPay(Activity activity, SDKPayment payment, PaymentCallback callback);
    void submitRoleInfo(int type, SDKRoleInfo roleInfo);
    void onActivityResult(int requestCode, int resultCode, Intent data);
}
