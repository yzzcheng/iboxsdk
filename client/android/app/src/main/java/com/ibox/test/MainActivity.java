package com.ibox.test;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.iboxsdk.abstracts.IBoxSDK;
import com.iboxsdk.abstracts.InitCallback;
import com.iboxsdk.abstracts.LoginCallback;
import com.iboxsdk.abstracts.PaymentCallback;
import com.iboxsdk.bean.SDKPayment;
import com.iboxsdk.bean.SDKUser;
import com.iboxsdk.singleton.IBoxSDKAPI;

public class MainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
//        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
//        LayoutInflater inflater = LayoutInflater.from(RePlugin.getPluginContext());
        LayoutInflater inflater = LayoutInflater.from(MainActivity.this);
        View view = inflater.inflate(R.layout.activity_main,null);
        setContentView(view);
        Log.e("MainActivity",MainActivity.this.getLocalClassName());
        Button InitBtn = view.findViewById(R.id.initBtn);
        Button GuestBtn = view.findViewById(R.id.guestLoginBtn);
        Button AccountBtn = view.findViewById(R.id.accountLoginBtn);
        Button FacebookBtn = view.findViewById(R.id.facebookLoginBtn);
        Button GoogleBtn = view.findViewById(R.id.googleLoginBtn);
        Button GuestBindBtn = view.findViewById(R.id.bindAccountBtn);
        Button payBtn = view.findViewById(R.id.paymentBtn);
        Button intentBtn = view.findViewById(R.id.intentBtn);
        Button customBtn = view.findViewById(R.id.costomBtn);
        Button userBtn = view.findViewById(R.id.userBtn);
        Button authLoginBtn = view.findViewById(R.id.autoLoginBtn);
        Button debugBtn = view.findViewById(R.id.debugBtn);
        InitBtn.setOnClickListener(clickListener);
        intentBtn.setOnClickListener(clickListener);
        GuestBtn.setOnClickListener(clickListener);
        AccountBtn.setOnClickListener(clickListener);
        FacebookBtn.setOnClickListener(clickListener);
        GoogleBtn.setOnClickListener(clickListener);
        GuestBindBtn.setOnClickListener(clickListener);
        payBtn.setOnClickListener(clickListener);
        customBtn.setOnClickListener(clickListener);
        userBtn.setOnClickListener(clickListener);
        authLoginBtn.setOnClickListener(clickListener);
        debugBtn.setOnClickListener(clickListener);
        init();

    }
     View.OnClickListener clickListener = new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            switch (v.getId())
            {
                case R.id.initBtn:init(); break;
                case R.id.guestLoginBtn:login(IBoxSDK.GUEST);break;
                case R.id.accountLoginBtn:login(IBoxSDK.PLATFORM);break;
                case R.id.facebookLoginBtn:login(IBoxSDK.FACEBOOK);break;
                case R.id.googleLoginBtn:login(IBoxSDK.GOOGLE);break;
                case R.id.bindAccountBtn:bindAccount();break;
                case R.id.paymentBtn:createOrder();break;
                case R.id.intentBtn:sendIntent();break;
                case R.id.costomBtn:openCustomCenter();break;
                case R.id.userBtn:openUserCenter();break;
                case R.id.autoLoginBtn:autoLogin();break;
                case R.id.debugBtn:debug();break;
            }
        }
    };


    protected void debug(){
        IBoxSDKAPI.debugTools(this);
    }
    protected void init(){
        IBoxSDKAPI.getInstance().getSDK().init(this, new InitCallback() {
            @Override
            public void Error(int code, String message) {
                Toast.makeText(MainActivity.this, message, Toast.LENGTH_SHORT).show();
            }

            @Override
            public void InitSuccess() {
                Toast.makeText(MainActivity.this, "initSuccess ", Toast.LENGTH_SHORT).show();
            }
        });
    }

    protected void login(int type){
        IBoxSDKAPI.getInstance().getSDK().login(this,type, new LoginCallback() {
            @Override
            public void LoginSuccess(SDKUser user) {
                Toast.makeText(MainActivity.this, "Hellow" + user.getUserName(), Toast.LENGTH_SHORT).show();
            }

            @Override
            public void Error(int code, String message) {
                Toast.makeText(MainActivity.this, message, Toast.LENGTH_SHORT).show();
            }
        });
    }

    protected void bindAccount(){
        IBoxSDKAPI.getInstance().getSDK().bindAccount(this, new LoginCallback() {
            @Override
            public void LoginSuccess(SDKUser user) {
                Toast.makeText(MainActivity.this, "Hellow" + user.getUserName(), Toast.LENGTH_SHORT).show();
            }

            @Override
            public void Error(int code, String message) {
                Toast.makeText(MainActivity.this, message, Toast.LENGTH_SHORT).show();
            }
        });
    }

    protected void createOrder(){
        TextView productName = this.findViewById(R.id.productTxt);
        SDKPayment payment = new SDKPayment();
        payment.setRoleName("linlin.zhang");
        payment.setRoleId("12242354");
        payment.setProductName(productName.getText().toString());
        payment.setDiamond(100);
        payment.setGameZoneId("1");
        payment.setLevel(10);
        payment.setVipLevel(10);
        IBoxSDKAPI.getInstance().getSDK().startPay(this,payment,new PaymentCallback(){
            @Override
            public void Error(int code, String message) {
                Toast.makeText(MainActivity.this, message, Toast.LENGTH_SHORT).show();
            }

            @Override
            public void PaymentFinish() {
                Toast.makeText(MainActivity.this, "PaymentFinish ", Toast.LENGTH_SHORT).show();
            }
        });
    }


    void sendIntent(){
        TextView productName = this.findViewById(R.id.productTxt);
        Intent intent = new Intent();
        Uri url = Uri.parse("com.bdgames.xmyxwno1://pluspay");
        intent.setData(url);
        intent.putExtra("action","startPay");
        intent.putExtra("productName",productName.getText().toString());
        this.startActivityForResult(intent,0);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode,Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        IBoxSDKAPI.getInstance().getSDK().onActivityResult(requestCode,resultCode,data);
    }

    void openCustomCenter(){
        IBoxSDKAPI.getInstance().getSDK().openCustomerCenter(this);
    }

    void openUserCenter(){
        IBoxSDKAPI.getInstance().getSDK().openAccountCenter(this);
    }

    void autoLogin(){
        IBoxSDKAPI.getInstance().getSDK().autoLogin(this, new LoginCallback() {
            @Override
            public void LoginSuccess(SDKUser user) {
                Toast.makeText(MainActivity.this, "Hellow" + user.getUserName(), Toast.LENGTH_SHORT).show();
            }

            @Override
            public void Error(int code, String message) {
                Toast.makeText(MainActivity.this, message, Toast.LENGTH_SHORT).show();
            }
        });
    };


}
