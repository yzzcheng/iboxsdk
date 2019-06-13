package com.iboxsdk2.abstracts;

import com.iboxsdk2.bean.SDKFinishOrderEvent;

public interface EventReciever {
    void init();

    void finishOrder(SDKFinishOrderEvent event);

}
