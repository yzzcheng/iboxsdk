package com.iboxsdk.imp;

import android.app.Activity;
import android.content.ContentValues;
import android.content.Context;
import android.content.SharedPreferences;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.os.Environment;

import com.iboxsdk.abstracts.Action;
import com.iboxsdk.consts.ConfigConsts;
import com.iboxsdk.db.SQLiteDataBase;
import com.iboxsdk.singleton.IBoxSDKContext;
import com.iboxsdk.utils.FileUtils;
import com.iboxsdk.utils.HttpUtils;
import com.iboxsdk.utils.ResourceUtils;
import com.orhanobut.logger.Logger;

import java.io.File;
import java.io.InputStream;

public class IBoxBundleService {

    public static class BundleInfo {
        private String jsBundlePath;
        private String assertPath;

        public String getJsBundlePath() {
            return jsBundlePath;
        }

        public void setJsBundlePath(String jsBundlePath) {
            this.jsBundlePath = jsBundlePath;
        }

        public String getAssertPath() {
            return assertPath;
        }

        public void setAssertPath(String assertPath) {
            this.assertPath = assertPath;
        }
    }


    public void checkBundleVersion(final Activity activity, final Action<BundleInfo> action) {
        final Context context = activity;
        final String bundleName =
                ResourceUtils.getString(context, ConfigConsts.bundle_name);

        final String bundle_version =
                ResourceUtils.getString(context, ConfigConsts.bundle_version);
        new Thread(new Runnable() {
            @Override
            public void run() {
                final BundleInfo bundleInfo = new BundleInfo();
                SharedPreferences preferences = activity.getPreferences(Context.MODE_PRIVATE);
                SharedPreferences.Editor edit = preferences.edit();
                try {
                    String defaultVersion = preferences.getString("js_version","1.0.0");
                    String version = HttpUtils.httpGet(bundle_version);
                    if(!defaultVersion.startsWith(version)){
                        String bundleUrl = ResourceUtils.getString(context, ConfigConsts.bundle_url);
                        FileUtils.downLoadFromUrl(bundleUrl, bundleName, context.getFilesDir().getPath());
                        edit.putString("js_version",version);
                    }

                    boolean isUnzipAssert = preferences.getBoolean("isUnzipAssert",false);

                    if(!isUnzipAssert) {
                        InputStream inputStream = context.getAssets().open("assert.zip");
                        try {
                            FileUtils.UnZipFolder(inputStream, context.getFilesDir().getPath());
                            edit.putBoolean("isUnzipAssert",true);
                        }catch (Exception e){
                            Logger.e(e.getMessage(),e);
                            inputStream.close();
                        }
                    }

                    activity.runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            bundleInfo.setJsBundlePath(context.getFilesDir() + File.separator + bundleName);
                            bundleInfo.setAssertPath(context.getFilesDir() + File.separator + "img"+ File.separator);
                            action.Action(bundleInfo);
                        }
                    });

                }catch (Exception e){
                    //异常，原地用老版本
                    Logger.e(e.getMessage(),e);
                    activity.runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            bundleInfo.setJsBundlePath(Environment.getDataDirectory().getPath() + File.separator + bundleName);
                            bundleInfo.setAssertPath(context.getFilesDir() + File.separator + "img"+ File.separator);
                            action.Action(bundleInfo);
                        }
                    });
                }finally {
                    edit.commit();
                }
            }
        }).start();


    }
}
