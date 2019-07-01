package com.iboxsdk.react;

import android.app.Dialog;
import android.content.Context;
import android.view.Window;

import com.example.iboxsdk2.R;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;

public class ReactActive extends Dialog {


    public ReactActive(Context context) {
        super(context);
        context.setTheme(R.style.transDialogStyle);
        this.requestWindowFeature(Window.FEATURE_NO_TITLE);
        this.setCancelable(false);
    }


}
