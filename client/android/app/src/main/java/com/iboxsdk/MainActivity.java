package com.iboxsdk;

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
        View.OnClickListener clickListener = new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                switch (v.getId())
                {
                    case R.id.initBtn:init(); break;
                    case R.id.loginBtn:login();break;
                    case R.id.paymentBtn:createOrder();break;
                }
            }
        };
        InitBtn.setOnClickListener(clickListener);
        LoginBtn.setOnClickListener(clickListener);
        payBtn.setOnClickListener(clickListener);
    }

    protected void init(){
        IBoxSDKAPI.getInstance().getSDK().init(this, new InitCallback() {
            @Override
            public void Error(int code, String message) {

            }

            @Override
            public void InitSuccess() {

            }
        });
    }

    protected void login(){
        IBoxSDKAPI.getInstance().getSDK().login(this, new LoginCallback() {
            @Override
            public void LoginSuccess(SDKUser user) {

            }

            @Override
            public void Error(int code, String message) {

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

            }

            @Override
            public void PaymentFinish() {
                Toast.makeText(MainActivity.this, "PaymentFinish ", Toast.LENGTH_SHORT).show();
            }
        });
    }

}
