package com.iboxsdk.react.component.webview.events;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.Event;
import com.facebook.react.uimanager.events.RCTEventEmitter;

public class TopShouldStartLoadWithRequestEvent extends Event<TopShouldStartLoadWithRequestEvent> {

    static public  final String EVENT_NAME = "topShouldStartLoadWithRequest";
    WritableMap mData;

    public TopShouldStartLoadWithRequestEvent(int viewId, WritableMap mEventData) {
        super(viewId);
        this.mData = mEventData;
        this.mData.putString("navigationType", "other");
    }

    @Override
    public String getEventName() {
        return EVENT_NAME;
    }

    @Override
    public boolean canCoalesce() {
        return false;
    }

    @Override
    public short getCoalescingKey() {
        return 0;
    }

    @Override
    public void dispatch(RCTEventEmitter rctEventEmitter) {
        rctEventEmitter.receiveEvent(getViewTag(), getEventName(), mData);
    }
}
