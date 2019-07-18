package com.iboxsdk.react.component.webview.events;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.Event;
import com.facebook.react.uimanager.events.RCTEventEmitter;

public class TopMessageEvent extends Event<TopMessageEvent> {

    static public final String EVENT_NAME = "topMessage";
    String mData;

    public TopMessageEvent(int viewId, String mEventData) {
        super(viewId);
        this.mData = mEventData;

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
        WritableMap map = Arguments.createMap();
        map.putString("data", mData);
        rctEventEmitter.receiveEvent(getViewTag(), getEventName(), map);
    }
}
