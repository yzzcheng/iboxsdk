package com.iboxsdk2.singleton;

import com.iboxsdk2.react.ReactView;

public final class IBoxReactView {
    private static final IBoxReactView ourInstance = new IBoxReactView();

    public static IBoxReactView getInstance() {
        return ourInstance;
    }

    private ReactView reactView;

    public ReactView getReactView() {
        return reactView;
    }

    public void setReactView(ReactView reactView) {
        this.reactView = reactView;
    }

    private IBoxReactView() {
    }
}
