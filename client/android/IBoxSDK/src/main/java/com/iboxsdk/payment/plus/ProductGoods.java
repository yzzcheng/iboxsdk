package com.iboxsdk.payment.plus;

import android.os.Parcel;
import android.os.Parcelable;

public class ProductGoods implements Parcelable {
    private String transactionId;
    private String channel;
    private String currency;
    private String amount;

    public ProductGoods(){}

    protected ProductGoods(Parcel in) {
        transactionId = in.readString();
        channel = in.readString();
        currency = in.readString();
        amount = in.readString();
    }

    public static final Creator<ProductGoods> CREATOR = new Creator<ProductGoods>() {
        @Override
        public ProductGoods createFromParcel(Parcel in) {
            return new ProductGoods(in);
        }

        @Override
        public ProductGoods[] newArray(int size) {
            return new ProductGoods[size];
        }
    };

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public String getChannel() {
        return channel;
    }

    public void setChannel(String channel) {
        this.channel = channel;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeString(transactionId);
        dest.writeString(channel);
        dest.writeString(currency);
        dest.writeString(amount);
    }
}
