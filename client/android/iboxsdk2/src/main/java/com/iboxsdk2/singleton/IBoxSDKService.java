package com.iboxsdk2.singleton;

import com.iboxsdk2.imp.IBoxBundleService;
import com.iboxsdk2.payment.GoogleService;

public class IBoxSDKService {
    private static final IBoxSDKService ourInstance = new IBoxSDKService();


    public static IBoxSDKService getInstance() {
        return ourInstance;
    }

    GoogleService googleService = new GoogleService();
    IBoxBundleService bundleService = new IBoxBundleService();
    public GoogleService getGoogleService() {
        return googleService;
    }


    public IBoxBundleService getBundleService() {
        return bundleService;
    }

    private IBoxSDKService() {
    }
}
