package com.iboxsdk2.imp;

import android.app.Activity;
import android.content.Intent;

import com.iboxsdk2.abstracts.IBoxSDK;
import com.iboxsdk2.abstracts.InitCallback;
import com.iboxsdk2.abstracts.LoginCallback;
import com.iboxsdk2.abstracts.PaymentCallback;
import com.iboxsdk2.bean.InitEvent;
import com.iboxsdk2.bean.SDKPayment;
import com.iboxsdk2.bean.SDKPaymentEvent;
import com.iboxsdk2.bean.SDKRoleInfo;
import com.iboxsdk2.consts.ConfigConsts;
import com.iboxsdk2.consts.ErrorCode;
import com.iboxsdk2.consts.EventConsts;
import com.iboxsdk2.react.ReactView;
import com.iboxsdk2.singleton.IBoxEventDispatcher;
import com.iboxsdk2.singleton.IBoxReactView;
import com.iboxsdk2.singleton.IBoxSDKContext;
import com.iboxsdk2.singleton.IBoxSDKService;
import com.iboxsdk2.utils.ResourceUtils;
import com.orhanobut.logger.AndroidLogAdapter;
import com.orhanobut.logger.Logger;

public class IBoxSDKImp implements IBoxSDK {


    @Override
    public void init(Activity activity,final InitCallback callback) {
        if(!IBoxSDKContext.getInstance().isInit()) {
            IBoxSDKService.getInstance().getGoogleService().setActivity(activity);
            IBoxSDKContext.getInstance().setActivity(activity);
            ReactView reactView = new ReactView(activity, new ReactView.ReactInitCallback() {
                @Override
                public void callback(Activity activity, ReactView reactView) {
                    IBoxEventDispatcher.getInstance().addListener(EventConsts.INIT, callback);
                    InitEvent event = new InitEvent();
                    Integer appId = Integer.parseInt(ResourceUtils.getString(activity.getApplicationContext(), "ibox_app_id"));
                    event.setPackageName(activity.getPackageName());
                    event.setAppId(appId);
                    reactView.emitter().emit(EventConsts.INIT, event.toMap());
                }
            });
            IBoxReactView.getInstance().setReactView(reactView);
        } else {
            IBoxEventDispatcher.getInstance().addListener(EventConsts.INIT, callback);
            InitEvent event = new InitEvent();
            Integer appId = Integer.parseInt(ResourceUtils.getString(activity.getApplicationContext(), "ibox_app_id"));
            event.setPackageName(activity.getPackageName());
            event.setAppId(appId);
            IBoxReactView.getInstance().getReactView().emitter().emit(EventConsts.INIT, event.toMap());

        }
    }

    @Override
    public void login(Activity activity, LoginCallback callback) {
        if(IBoxSDKContext.getInstance().isInit()){
            IBoxEventDispatcher.getInstance().addListener(EventConsts.LOGIN, callback);
            InitEvent event = new InitEvent();
            Integer appId = Integer.parseInt(ResourceUtils.getString(activity.getApplicationContext(), ConfigConsts.app_id));
            event.setPackageName(activity.getPackageName());
            event.setAppId(appId);
            IBoxReactView.getInstance().getReactView().emitter().emit(EventConsts.LOGIN, event.toMap());
            IBoxReactView.getInstance().getReactView().show();
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
//            IBoxReactView.getInstance().getReactView().show();
        }
    }

    @Override
    public void submitRoleInfo(int type, SDKRoleInfo roleInfo) {

    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
//        Logger.d("onActivityResult",requestCode,requestCode,data.toString());
        IBoxSDKService.getInstance().getPlusGoogleService().onActivityResult(requestCode,resultCode,data);
    }

    public IBoxSDKImp(){
        Logger.addLogAdapter(new AndroidLogAdapter());
    }

}
