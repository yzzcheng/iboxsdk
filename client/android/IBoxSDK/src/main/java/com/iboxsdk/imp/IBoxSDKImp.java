package com.iboxsdk.imp;

import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Intent;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.iboxsdk.abstracts.IBoxSDK;
import com.iboxsdk.abstracts.InitCallback;
import com.iboxsdk.abstracts.LoginCallback;
import com.iboxsdk.abstracts.PaymentCallback;
import com.iboxsdk.bean.InitEvent;
import com.iboxsdk.bean.SDKPayment;
import com.iboxsdk.bean.SDKPaymentEvent;
import com.iboxsdk.bean.SDKRoleInfo;
import com.iboxsdk.bean.SDKRoleInfoEvent;
import com.iboxsdk.consts.ConfigConsts;
import com.iboxsdk.consts.ErrorCode;
import com.iboxsdk.consts.EventConsts;
import com.iboxsdk.react.ReactView;
import com.iboxsdk.singleton.IBoxEventDispatcher;
import com.iboxsdk.singleton.IBoxReactView;
import com.iboxsdk.singleton.IBoxSDKContext;
import com.iboxsdk.singleton.IBoxSDKService;
import com.iboxsdk.utils.ResourceUtils;
import com.orhanobut.logger.AndroidLogAdapter;
import com.orhanobut.logger.Logger;

public class IBoxSDKImp implements IBoxSDK {


    @Override
    public void init(Activity activity,final InitCallback callback) {
        IBoxSDKContext.getInstance().setActivity(activity);
        if(!IBoxSDKContext.getInstance().isInit()) {
            Integer appId = Integer.parseInt(ResourceUtils.getString(activity.getApplicationContext(), ConfigConsts.app_id));
            Integer packageId = Integer.parseInt(ResourceUtils.getString(activity.getApplicationContext(),  ConfigConsts.package_id));
            String appKey = ResourceUtils.getString(activity.getApplicationContext(),  ConfigConsts.app_key);
            IBoxSDKContext.getInstance().setAppId(appId);
            IBoxSDKContext.getInstance().setPackageId(packageId);
            IBoxSDKContext.getInstance().setAppKey(appKey);
            synchronized (this) {
                ReactView reactView = new ReactView(activity, new ReactView.ReactInitCallback() {
                    @Override
                    public void callback(boolean isSuccess, Activity activity, ReactView reactView) {
                        if (isSuccess) {
                            IBoxEventDispatcher.getInstance().addListener(EventConsts.INIT, callback);
                            InitEvent event = new InitEvent();
                            event.setPackageName(activity.getPackageName());
                            event.setAppId(IBoxSDKContext.getInstance().getAppId());
                            reactView.emitter().emit(EventConsts.INIT, event.toMap());
                        } else {
                            callback.Error(400, "SDK Component init error");
                        }
                    }
                });
                IBoxReactView.getInstance().setReactView(reactView);
            }
        } else {
            IBoxEventDispatcher.getInstance().addListener(EventConsts.INIT, callback);
            InitEvent event = new InitEvent();
            event.setPackageName(activity.getPackageName());
            event.setAppId(IBoxSDKContext.getInstance().getAppId());
            IBoxReactView.getInstance().getReactView().emitter().emit(EventConsts.INIT, event.toMap());

        }
    }

    @Override
    public void login(Activity activity, LoginCallback callback) {
        if(IBoxSDKContext.getInstance().isInit()){
            IBoxEventDispatcher.getInstance().addListener(EventConsts.LOGIN, callback);
            InitEvent event = new InitEvent();
            Integer appId = IBoxSDKContext.getInstance().getAppId();
            event.setPackageName(activity.getPackageName());
            event.setAppId(appId);
            IBoxReactView.getInstance().getReactView().emitter().emit(EventConsts.LOGIN, event.toMap());

            Logger.d("login success");
        }else {
            callback.Error(ErrorCode.NOT_INIT,"NOT INIT");
        }
    }

    @Override
    public void startPay(Activity activity, SDKPayment payment, PaymentCallback callback) {
        if(IBoxSDKContext.getInstance().isInit()){
            IBoxEventDispatcher.getInstance().addListener(EventConsts.ORDER_FINISH, callback);
            Integer appId = Integer.parseInt(ResourceUtils.getString(activity.getApplicationContext(), ConfigConsts.app_id));
            Integer packageId = Integer.parseInt(ResourceUtils.getString(activity.getApplicationContext(), ConfigConsts.package_id));
            SDKPaymentEvent event = new SDKPaymentEvent();
            event.setAppId(appId);
            event.setPackageId(packageId);
            event.setPackageName(activity.getPackageName());
            event.setProductName(payment.getProductName());
            IBoxReactView.getInstance().getReactView().emitter().emit(EventConsts.ORDER_CREATE,event.fromSDKPayment(payment).toMap());

        }
    }

    @Override
    public void submitRoleInfo(int type, SDKRoleInfo roleInfo) {
        if(IBoxSDKContext.getInstance().isInit()) {
            SDKRoleInfoEvent event = new SDKRoleInfoEvent(roleInfo);
            IBoxReactView.getInstance().getReactView().emitter().emit(EventConsts.SUBMIT_ROLE_INFO,event.toMap());
        }
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
//        Logger.d("onActivityResult",requestCode,requestCode,data.toString());
        IBoxSDKService.getInstance().getFaceBookService().onActivityResult(requestCode,resultCode,data);
        IBoxSDKService.getInstance().getPlusGoogleService().onActivityResult(requestCode,resultCode,data);
        IBoxSDKService.getInstance().getGoogleLoginService().onActivityResult(requestCode,resultCode,data);
    }

    @Override
    public void openAccountCenter(Activity activity) {
        if(IBoxSDKContext.getInstance().isInit()){
            WritableMap map = Arguments.createMap();
            IBoxReactView.getInstance().getReactView().emitter().emit(EventConsts.OPEN_ACCOUNT_CENTER,map);
        }
    }

    @Override
    public void openCustomerCenter(Activity activity) {
        if(IBoxSDKContext.getInstance().isInit()){
            WritableMap map = Arguments.createMap();
            IBoxReactView.getInstance().getReactView().emitter().emit(EventConsts.OPEN_COSTOMER_CENTER,map);
        }
    }

    @Override
    public void autoLogin(Activity activity, LoginCallback callback) {
        if(IBoxSDKContext.getInstance().isInit()){
            WritableMap map = Arguments.createMap();
            IBoxReactView.getInstance().getReactView().emitter().emit(EventConsts.AUTO_LOGIN,map);
        }
    }


    public IBoxSDKImp(){
        Logger.addLogAdapter(new AndroidLogAdapter());
    }

}
