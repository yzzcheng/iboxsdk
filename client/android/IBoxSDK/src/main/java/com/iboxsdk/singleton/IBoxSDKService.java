package com.iboxsdk.singleton;

import com.iboxsdk.imp.IBoxBundleService;
import com.iboxsdk.payment.GoogleService;
import com.iboxsdk.payment.PlusGoogleService;
import com.iboxsdk.thirdparty.FaceBookService;

public class IBoxSDKService {
    private static IBoxSDKService ourInstance = new IBoxSDKService();


    public static IBoxSDKService getInstance() {
        return ourInstance;
    }

    GoogleService googleService = new GoogleService();
    IBoxBundleService bundleService = new IBoxBundleService();
    PlusGoogleService plusGoogleService = new PlusGoogleService();
    FaceBookService faceBookService = new FaceBookService();


    public GoogleService getGoogleService() {
        return googleService;
    }


    public IBoxBundleService getBundleService() {
        return bundleService;
    }

    public PlusGoogleService getPlusGoogleService() {
        return plusGoogleService;
    }

    public FaceBookService getFaceBookService() {
        return faceBookService;
    }

    private IBoxSDKService() {
    }
}
