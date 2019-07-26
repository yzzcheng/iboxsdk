package com.iboxsdk.thirdparty;

import android.content.Intent;
import android.os.Bundle;

import com.facebook.AccessToken;
import com.facebook.CallbackManager;
import com.facebook.FacebookAuthorizationException;
import com.facebook.FacebookCallback;
import com.facebook.FacebookException;
import com.facebook.GraphRequest;
import com.facebook.GraphResponse;
import com.facebook.Profile;
import com.facebook.login.LoginManager;
import com.facebook.login.LoginResult;
import com.iboxsdk.abstracts.ActivityResult;
import com.iboxsdk.abstracts.LoginCallback;
import com.iboxsdk.singleton.IBoxSDKContext;
import com.iboxsdk.thirdparty.bean.FBUserInfo;
import com.iboxsdk.thirdparty.bean.FacebookLoginCallBack;
import com.orhanobut.logger.Logger;

import org.json.JSONObject;

import java.util.Arrays;

public class FaceBookService implements ActivityResult {

    CallbackManager callbackManager;

    public void init() {

        callbackManager = CallbackManager.Factory.create();
    }

    public void doLogin(final FacebookLoginCallBack callBack) {

        AccessToken accessToken = AccessToken.getCurrentAccessToken();
        if(accessToken == null) {
            LoginManager.getInstance().registerCallback(callbackManager, new FacebookCallback<LoginResult>() {
                @Override
                public void onSuccess(LoginResult loginResult) {
                    GraphRequest request = GraphRequest.newMeRequest(loginResult.getAccessToken(), new GraphRequest.GraphJSONObjectCallback() {
                        @Override
                        public void onCompleted(JSONObject object, GraphResponse response) {
                            try {
                                FBUserInfo userInfo = new FBUserInfo();
                                userInfo.setUserId(object.getString("id"));
                                userInfo.setUserName(object.getString("name"));
                                if (object.has("email"))
                                    userInfo.setEmail(object.getString("email"));
                                callBack.loginSuccess(userInfo);
                            } catch (Exception e) {
                                Logger.e(e.getMessage());
                            }
                        }
                    });
                    Bundle parameters = new Bundle();
                    parameters.putString("fields", "id,name,link");
                    request.setParameters(parameters);
                    request.executeAsync();
                }

                @Override
                public void onCancel() {

                }

                @Override
                public void onError(FacebookException error) {
                    if (error instanceof FacebookAuthorizationException) {
                        if (AccessToken.getCurrentAccessToken() != null) {
                            LoginManager.getInstance().logOut();
                        }
                    }
                    Logger.e(error.getMessage());
                }
            });
            LoginManager.getInstance().logIn(IBoxSDKContext.getInstance().getActivity(), Arrays.asList("public_profile", "email"));
        } else {
            GraphRequest request = GraphRequest.newMeRequest(accessToken, new GraphRequest.GraphJSONObjectCallback() {
                @Override
                public void onCompleted(JSONObject object, GraphResponse response) {
                    try {
                        FBUserInfo userInfo = new FBUserInfo();
                        userInfo.setUserId(object.getString("id"));
                        userInfo.setUserName(object.getString("name"));
                        if (object.has("email"))
                            userInfo.setEmail(object.getString("email"));
                        callBack.loginSuccess(userInfo);
                    } catch (Exception e) {
                        Logger.e(e.getMessage());
                    }
                }
            });
            Bundle parameters = new Bundle();
            parameters.putString("fields", "id,name,link");
            request.setParameters(parameters);
            request.executeAsync();
        }


    }

    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        callbackManager.onActivityResult(requestCode, resultCode, data);

    }
}
