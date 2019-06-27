package com.iboxsdk.start;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;

import com.iboxsdk.utils.FileUtils;
import com.iboxsdk.utils.StreamUtils;
import com.orhanobut.logger.AndroidLogAdapter;
import com.orhanobut.logger.Logger;
import com.qihoo360.loader2.PluginNativeLibsHelper;
import com.qihoo360.replugin.RePlugin;
import com.qihoo360.replugin.model.PluginInfo;

import java.io.File;
import java.io.FileOutputStream;

public class MainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Logger.addLogAdapter(new AndroidLogAdapter());
        setContentView(R.layout.activity_main);

        install();
    }

    void install(){
        try {
            File file = new File(getFilesDir(),"app-debug.apk");
            if(!file.exists()) {
                file.createNewFile();
                FileOutputStream outputStream = new FileOutputStream(file);
                outputStream.write(StreamUtils.readInputStreamByte(getAssets().open("app-debug.apk")));
            }
            PluginInfo info = RePlugin.install(file.getPath());
//            FileUtils.copy(info.getNativeLibsDir().getPath(),MainActivity.this.getApplicationInfo().nativeLibraryDir);

            if(RePlugin.isPluginInstalled(info.getName())){
                RePlugin.startActivity(MainActivity.this,RePlugin.createIntent(info.getName(), "com.iboxsdk.MainActivity"));
            }

        }catch (Exception e){
            Logger.e("RePlugin install error" ,e.getMessage());
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        Logger.e("RePlugin onActivityResult" ,requestCode,resultCode,data);
    }
}
