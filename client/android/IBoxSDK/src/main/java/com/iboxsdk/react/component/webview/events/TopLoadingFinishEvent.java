package com.iboxsdk.react.component.webview.events;

import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.Event;
import com.facebook.react.uimanager.events.RCTEventEmitter;

public class TopLoadingFinishEvent extends Event<TopLoadingFinishEvent> {

    static public final String EVENT_NAME = "topLoadingFinish";
    WritableMap mEventData;

    public TopLoadingFinishEvent(int viewId, WritableMap mEventData) {
        super(viewId);

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
        rctEventEmitter.receiveEvent(getViewTag(), getEventName(), mEventData);
    }
}
