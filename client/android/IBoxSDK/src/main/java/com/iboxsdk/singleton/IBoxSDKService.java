package com.iboxsdk.singleton;

import com.iboxsdk.imp.IBoxBundleService;
import com.iboxsdk.payment.GooglePayService;
import com.iboxsdk.payment.PlusGoogleService;
import com.iboxsdk.thirdparty.AdjustService;
import com.iboxsdk.thirdparty.FaceBookService;
import com.iboxsdk.thirdparty.GoogleAdsService;
import com.iboxsdk.thirdparty.GoogleLoginService;

public class IBoxSDKService {
    private static IBoxSDKService ourInstance = new IBoxSDKService();


    public static IBoxSDKService getInstance() {
        return ourInstance;
    }

    GooglePayService googlePayService = new GooglePayService();
    IBoxBundleService bundleService = new IBoxBundleService();
    PlusGoogleService plusGoogleService = new PlusGoogleService();
    FaceBookService faceBookService = new FaceBookService();
    GoogleAdsService googleAdsService = new GoogleAdsService();
    AdjustService adjustService = new AdjustService();
    GoogleLoginService googleLoginService = new GoogleLoginService();

    public GooglePayService getGooglePayService() {
        return googlePayService;
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

    public GoogleAdsService getGoogleAdsService() {
        return googleAdsService;
    }

    public AdjustService getAdjustService() {
        return adjustService;
    }

    public GoogleLoginService getGoogleLoginService() {
        return googleLoginService;
    }

    private IBoxSDKService() {
    }
}
