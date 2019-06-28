package com.iboxsdk.react;

import android.app.Dialog;
import android.content.Context;
import android.view.Window;

public class ReactActive extends Dialog {
    public ReactActive(Context context) {
        super(context);
        this.requestWindowFeature(Window.FEATURE_NO_TITLE);
        this.setCancelable(false);
    }
}
