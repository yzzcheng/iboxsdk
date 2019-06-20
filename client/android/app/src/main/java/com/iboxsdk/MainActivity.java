package com.iboxsdk;

import android.content.Intent;
import android.net.Uri;
import android.support.annotation.Nullable;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.iboxsdk2.abstracts.InitCallback;
import com.iboxsdk2.abstracts.LoginCallback;
import com.iboxsdk2.abstracts.PaymentCallback;
import com.iboxsdk2.bean.SDKPayment;
import com.iboxsdk2.bean.SDKUser;
import com.iboxsdk2.singleton.IBoxSDKAPI;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Button InitBtn = this.findViewById(R.id.initBtn);
        Button LoginBtn = this.findViewById(R.id.loginBtn);
        Button payBtn = this.findViewById(R.id.paymentBtn);
        Button intentBtn = this.findViewById(R.id.intentBtn);
        View.OnClickListener clickListener = new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                switch (v.getId())
                {
                    case R.id.initBtn:init(); break;
                    case R.id.loginBtn:login();break;
                    case R.id.paymentBtn:createOrder();break;
                    case R.id.intentBtn:sendIntent();break;
                }
            }
        };
        InitBtn.setOnClickListener(clickListener);
        intentBtn.setOnClickListener(clickListener);
        LoginBtn.setOnClickListener(clickListener);
        payBtn.setOnClickListener(clickListener);
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
        intent.putExtra("action","create");
        intent.putExtra("productName",productName.getText().toString());
        this.startActivityForResult(intent,0);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        IBoxSDKAPI.getInstance().getSDK().onActivityResult(requestCode,resultCode,data);
    }
}
