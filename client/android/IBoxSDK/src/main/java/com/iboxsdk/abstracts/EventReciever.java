package com.iboxsdk.abstracts;

import com.iboxsdk.bean.SDKFinishOrderEvent;

public interface EventReciever {
    void init();

    void finishOrder(SDKFinishOrderEvent event);

    void closeSDK();
}
