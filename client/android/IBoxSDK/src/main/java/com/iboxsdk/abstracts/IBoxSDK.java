package com.iboxsdk.abstracts;

import android.app.Activity;
import android.content.Intent;

import com.iboxsdk.bean.SDKPayment;
import com.iboxsdk.bean.SDKRoleInfo;

public interface IBoxSDK {

    final static int GUEST = 0;
    final static int PLATFORM = 1;
    final static int FACEBOOK = 2;
    final static int GOOGLE = 3;

    void init(Activity activity, InitCallback callback);
    void login(Activity activity,int type,LoginCallback callback);
    void startPay(Activity activity, SDKPayment payment, PaymentCallback callback);
    void submitRoleInfo(int type, SDKRoleInfo roleInfo);
    void onActivityResult(int requestCode, int resultCode, Intent data);
    void openAccountCenter(Activity activity);
    void openCustomerCenter(Activity activity);
    void autoLogin(Activity activity,LoginCallback callback);
}
