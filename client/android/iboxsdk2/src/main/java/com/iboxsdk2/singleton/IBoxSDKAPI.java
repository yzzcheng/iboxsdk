package com.iboxsdk2.singleton;

import com.iboxsdk2.abstracts.IBoxSDK;
import com.iboxsdk2.imp.IBoxSDKImp;

public final class IBoxSDKAPI {
    private static final IBoxSDKAPI ourInstance = new IBoxSDKAPI();

    public static IBoxSDKAPI getInstance() {
        return ourInstance;
    }

    IBoxSDK iBoxSDK = new IBoxSDKImp();

    public IBoxSDK getSDK() {
        return iBoxSDK;
    }
}
