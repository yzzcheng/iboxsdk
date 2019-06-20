package com.iboxsdk2.abstracts;

import android.content.Intent;

public interface ActivityResult {
    void onActivityResult(int requestCode, int resultCode, Intent data);
}
