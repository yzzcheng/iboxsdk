package com.iboxsdk.react;

import android.app.Dialog;
import android.content.Context;

public class ReactActive extends Dialog {
    public ReactActive(Context context) {
        super(context);
        this.setCancelable(false);
    }
}
