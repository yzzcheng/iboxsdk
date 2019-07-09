package com.iboxsdk.thirdparty.bean;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.iboxsdk.abstracts.EventData;

public class GoogleAccountInfo implements EventData {
    private String id;
    private String name;
    private String email;
    private String imageUrl;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }


    @Override
    public WritableMap toMap() {

        WritableMap map = Arguments.createMap();
        map.putString("id",id);
        map.putString("name",name);
        map.putString("email",email);
        map.putString("imageUrl",imageUrl);
        return map;
    }
}
