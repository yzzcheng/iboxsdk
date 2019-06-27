package com.iboxsdk.abstracts;

import android.content.Intent;

public interface ActivityResult {
    void onActivityResult(int requestCode, int resultCode, Intent data);
}
