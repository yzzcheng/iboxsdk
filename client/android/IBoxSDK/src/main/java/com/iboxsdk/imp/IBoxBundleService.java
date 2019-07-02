package com.iboxsdk.imp;

import android.app.Activity;
import android.content.ContentValues;
import android.content.Context;
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

public class IBoxBundleService {
    public void checkBundleVersion(final Activity activity, final Action<String> action) {
        final Context context = activity;
        final String bundleName =
                ResourceUtils.getString(context, ConfigConsts.bundle_name);

        final String bundle_version =
                ResourceUtils.getString(context, ConfigConsts.bundle_version);
        new Thread(new Runnable() {
            @Override
            public void run() {
                //从服务器下载
                SQLiteDataBase sqLiteDataBase = new SQLiteDataBase(activity);
                SQLiteDatabase readerDB = sqLiteDataBase.getReadableDatabase();
                SQLiteDatabase writeDb = sqLiteDataBase.getWritableDatabase();
                try {

                    Cursor cursor = readerDB.query("T_JS_Version",new String[]{"js_version"},null,null,null,null,null,"1");
                    String defaultVersion = "1.0.0";
                    if(cursor.getCount() > 0){
                        while (cursor.moveToNext()){
                            defaultVersion = cursor.getString(0);
                        }
                    }
                    String version = HttpUtils.httpGet(bundle_version);
                    if(!defaultVersion.startsWith(version)){
                        String bundleUrl = ResourceUtils.getString(context, ConfigConsts.bundle_url);
                        FileUtils.downLoadFromUrl(bundleUrl, bundleName, context.getFilesDir().getPath());

                        ContentValues contentValues = new ContentValues();
                        contentValues.put("js_version",version);
                        writeDb.insert("T_JS_Version",null,contentValues);
                    }
                    activity.runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            action.Action(context.getFilesDir() + File.separator + bundleName);
                        }
                    });

                }catch (Exception e){
                    //异常，原地用老版本
                    Logger.e(e.getMessage(),e);
                    activity.runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            action.Action(Environment.getDataDirectory().getPath() + File.separator + bundleName);
                        }
                    });
                }finally {
                    readerDB.close();
                    writeDb.close();
                }
            }
        }).start();


    }
}
