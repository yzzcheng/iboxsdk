package com.iboxsdk.utils;

import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class StringUtils {
    public static String sign(Map<String,Object> data,String sign){
        Iterator<String> it = data.keySet().iterator();
        List<String> list = new ArrayList<>(data.size());
        while (it.hasNext()){
            list.add(it.next());
        }
        Collections.sort(list);
        StringBuilder sb = new StringBuilder();
        for(String key : list){
            if(data.containsKey(key) && data.get(key) != null){
                sb.append(data.get(key));
            }
        }
        return crypt(sb.toString() + sign);

    }

    public static String crypt(String str) {
        if (str == null || str.length() == 0) {
            throw new IllegalArgumentException("String to encript cannot be null or zero length");
        }
        StringBuffer hexString = new StringBuffer();
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            md.update(str.getBytes());
            byte[] hash = md.digest();
            for (int i = 0; i < hash.length; i++) {
                if ((0xff & hash[i]) < 0x10) {
                    hexString.append("0" + Integer.toHexString((0xFF & hash[i])));
                } else {
                    hexString.append(Integer.toHexString(0xFF & hash[i]));
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return hexString.toString();
    }
}
