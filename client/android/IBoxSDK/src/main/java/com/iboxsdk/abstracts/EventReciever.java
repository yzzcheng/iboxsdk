package com.iboxsdk.abstracts;

import com.iboxsdk.bean.SDKFinishOrderEvent;

public interface EventReciever {
    void init();

    void finishOrder(SDKFinishOrderEvent event, Action action);

    void closeSDK();

    void showSDK();

    void resize(int width,int height);
}
