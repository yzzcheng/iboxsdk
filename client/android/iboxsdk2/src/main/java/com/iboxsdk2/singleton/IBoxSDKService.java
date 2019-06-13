package com.iboxsdk2.singleton;

import com.iboxsdk2.payment.GoogleService;

public class IBoxSDKService {
    private static final IBoxSDKService ourInstance = new IBoxSDKService();

    public static IBoxSDKService getInstance() {
        return ourInstance;
    }

    GoogleService googleService = new GoogleService();

    public GoogleService getGoogleService() {
        return googleService;
    }

    public void setGoogleService(GoogleService googleService) {
        this.googleService = googleService;
    }

    private IBoxSDKService() {
    }
}
