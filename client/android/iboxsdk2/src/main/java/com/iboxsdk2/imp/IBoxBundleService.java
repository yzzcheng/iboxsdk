package com.iboxsdk2.imp;

import android.app.Activity;
import android.os.Environment;

import com.iboxsdk2.abstracts.Action;
import com.iboxsdk2.consts.ConfigConsts;
import com.iboxsdk2.utils.FileUtils;
import com.iboxsdk2.utils.ResourceUtils;
import com.orhanobut.logger.Logger;

import java.io.File;

public class IBoxBundleService {
    public void checkBundleVersion(final Activity activity,final Action<String> action) {
        final String bundleName = ResourceUtils.getString(activity, ConfigConsts.bundle_name);
        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    String bundleUrl = ResourceUtils.getString(activity, ConfigConsts.bundle_url);
                    FileUtils.downLoadFromUrl(bundleUrl, bundleName, activity.getFilesDir().getPath());
                    activity.runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            action.Action(activity.getFilesDir() + File.separator + bundleName);
                        }
                    });

                }catch (Exception e){
                    Logger.e(e.getMessage());
                    activity.runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            action.Action(Environment.getDataDirectory().getPath() + File.separator + bundleName);
                        }
                    });
                }
            }
        }).start();


    }
}
