package com.iboxsdk;

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
//        LayoutInflater inflater = LayoutInflater.from(RePlugin.getPluginContext());
        LayoutInflater inflater = LayoutInflater.from(MainActivity.this);
        View view = inflater.inflate(R.layout.activity_main,null);
        setContentView(view);
        Log.e("MainActivity",MainActivity.this.getLocalClassName());
        Button InitBtn = view.findViewById(R.id.initBtn);
        Button LoginBtn = view.findViewById(R.id.loginBtn);
        Button payBtn = view.findViewById(R.id.paymentBtn);
        Button intentBtn = view.findViewById(R.id.intentBtn);
        Button customBtn = view.findViewById(R.id.costomBtn);
        Button userBtn = view.findViewById(R.id.userBtn);
        Button authLoginBtn = view.findViewById(R.id.autoLoginBtn);
        InitBtn.setOnClickListener(clickListener);
        intentBtn.setOnClickListener(clickListener);
        LoginBtn.setOnClickListener(clickListener);
        payBtn.setOnClickListener(clickListener);
        customBtn.setOnClickListener(clickListener);
        userBtn.setOnClickListener(clickListener);
        authLoginBtn.setOnClickListener(clickListener);
        init();

    }
     View.OnClickListener clickListener = new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            switch (v.getId())
            {
                case R.id.initBtn:init(); break;
                case R.id.loginBtn:login();break;
                case R.id.paymentBtn:createOrder();break;
                case R.id.intentBtn:sendIntent();break;
                case R.id.costomBtn:openCustomCenter();break;
                case R.id.userBtn:openUserCenter();break;
                case R.id.autoLoginBtn:autoLogin();break;
            }
        }
    };
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

    protected void login(){
        IBoxSDKAPI.getInstance().getSDK().login(this, new LoginCallback() {
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
