package com.iboxsdk.thirdparty;

import android.content.Intent;

import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.tasks.Task;
import com.iboxsdk.abstracts.ActivityResult;
import com.iboxsdk.singleton.IBoxSDKContext;
import com.iboxsdk.thirdparty.bean.GoogleAccountInfo;
import com.iboxsdk.thirdparty.bean.GoogleSignInCallBack;

public class GoogleLoginService implements ActivityResult {

    GoogleSignInClient mGoogleSignInClient;

    public static int RC_SIGN_IN = 100001;

    GoogleSignInCallBack signInCallBack;

    public void init(){
        GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestEmail()
                .requestId()
                .build();
        mGoogleSignInClient = GoogleSignIn.getClient(IBoxSDKContext.getInstance().getActivity(), gso);
    }


    public void doLogin(GoogleSignInCallBack callBack){
        Intent signInIntent = mGoogleSignInClient.getSignInIntent();
        IBoxSDKContext.getInstance().getActivity().startActivityForResult(signInIntent, RC_SIGN_IN);
        this.signInCallBack = callBack;
    }

    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == RC_SIGN_IN) {
            Task<GoogleSignInAccount> task = GoogleSignIn.getSignedInAccountFromIntent(data);
            try {
                GoogleSignInAccount account = task.getResult(ApiException.class);
                GoogleAccountInfo accountInfo = new GoogleAccountInfo();
                accountInfo.setEmail(account.getEmail());
                accountInfo.setId(account.getId());
                accountInfo.setName(account.getDisplayName());
                if(account.getPhotoUrl() != null) {
                    accountInfo.setImageUrl(account.getPhotoUrl().toString());
                }
                signInCallBack.success(accountInfo);
            }catch (ApiException e){
                signInCallBack.error(e.getMessage());
            }
        }
        }



}
