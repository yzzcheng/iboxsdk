package com.iboxsdk.react;

import android.app.Dialog;
import android.content.Context;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.view.WindowManager;

import com.example.iboxsdk2.R;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;

public class ReactActive extends Dialog {

    View contentView;

    public ReactActive(Context context) {
        super(context);
        this.requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setBackgroundDrawableResource(android.R.color.transparent);
        WindowManager.LayoutParams attr = getWindow().getAttributes();
        attr.height = ViewGroup.LayoutParams.WRAP_CONTENT;
        attr.width = ViewGroup.LayoutParams.WRAP_CONTENT;
        attr.gravity = Gravity.CENTER;
        this.setCancelable(false);
    }

    @Override
    public void show() {
        super.show();
        this.contentView.requestFocus();
    }

    @Override
    public void setContentView( View view) {
        super.setContentView(view);
        this.contentView = view;
    }

    @Override
    public void dismiss() {
        super.dismiss();
    }
}
