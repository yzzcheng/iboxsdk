package com.iboxsdk.utils;

import android.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

public class AESCommonUtil {

    /*
    * 加密用的Key 可以用26个字母和数字组成 此处使用AES-128-CBC加密模式，key需要为16位。
    */
    private String sKey = "flowerwordchangi";
    private String ivParameter = "0392039203920300";
    private static AESCommonUtil instance = null;

    private AESCommonUtil() {

    }

    public static AESCommonUtil getInstance() {
        if (instance == null)
            instance = new AESCommonUtil();
        return instance;
    }

    // 加密
    public String encrypt(String sSrc)  {
        try {
            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
            byte[] raw = sKey.getBytes();
            SecretKeySpec skeySpec = new SecretKeySpec(raw, "AES");
            IvParameterSpec iv = new IvParameterSpec(ivParameter.getBytes());// 使用CBC模式，需要一个向量iv，可增加加密算法的强度
            cipher.init(Cipher.ENCRYPT_MODE, skeySpec,iv);
            byte[] encrypted = cipher.doFinal(sSrc.getBytes("utf-8"));
            return new String(Base64.encode(encrypted,Base64.DEFAULT),"utf-8");// 此处使用BASE64做转码。
        } catch(Exception ex) {
            ex.printStackTrace();
            return null;
        }
    }

    // 解密
    public String decrypt(String sSrc)  {
        try {
            byte[] raw = sKey.getBytes("ASCII");
            SecretKeySpec skeySpec = new SecretKeySpec(raw, "AES");
            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
           IvParameterSpec iv = new IvParameterSpec(ivParameter.getBytes());
            cipher.init(Cipher.DECRYPT_MODE, skeySpec,iv);
            byte[] encrypted1 = Base64.decode(sSrc,Base64.DEFAULT);// 先用base64解密
            byte[] original = cipher.doFinal(encrypted1);
            String originalString = new String(original, "utf-8");
            return originalString;
        } catch (Exception ex) {
            return null;
        }
    }
    public String decrypt(String sSrc,String key)  {
        try {
            byte[] raw = key.getBytes("ASCII");
            SecretKeySpec skeySpec = new SecretKeySpec(raw, "AES");
            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
            IvParameterSpec iv = new IvParameterSpec(ivParameter.getBytes());
            cipher.init(Cipher.DECRYPT_MODE, skeySpec,iv);
            byte[] encrypted1 = Base64.decode(sSrc,Base64.DEFAULT);// 先用base64解密
            byte[] original = cipher.doFinal(encrypted1);
            String originalString = new String(original, "utf-8");
            return originalString;
        } catch (Exception ex) {
            return null;
        }
    }
    // 加密
      public String encrypt(String sSrc,String key)  {
        try {
            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
            byte[] raw = key.getBytes();
            SecretKeySpec skeySpec = new SecretKeySpec(raw, "AES");
            IvParameterSpec iv = new IvParameterSpec(ivParameter.getBytes());// 使用CBC模式，需要一个向量iv，可增加加密算法的强度
            cipher.init(Cipher.ENCRYPT_MODE, skeySpec,iv);
            byte[] encrypted = cipher.doFinal(sSrc.getBytes("utf-8"));
            return new String(Base64.encode(encrypted,Base64.DEFAULT),"utf-8");// 此处使用BASE64做转码。
        } catch(Exception ex) {
            ex.printStackTrace();
            return null;
        }
    }
//    public String decrypt(String sSrc,String key,String ivs) throws Exception {
//        try {
//            byte[] raw = key.getBytes("ASCII");
//            SecretKeySpec skeySpec = new SecretKeySpec(raw, "AES");
//            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
//            IvParameterSpec iv = new IvParameterSpec(ivs.getBytes());
//            cipher.init(Cipher.DECRYPT_MODE, skeySpec, iv);
//            byte[] encrypted1 = Base64.decode(sSrc);// 先用base64解密
//            byte[] original = cipher.doFinal(encrypted1);
//            String originalString = new String(original, "utf-8");
//            return originalString;
//        } catch (Exception ex) {
//            return null;
//        }
//    }

    public static String encodeBytes(byte[] bytes) {
        StringBuffer strBuf = new StringBuffer();

        for (int i = 0; i < bytes.length; i++) {
            strBuf.append((char) (((bytes[i] >> 4) & 0xF) + ((int) 'a')));
            strBuf.append((char) (((bytes[i]) & 0xF) + ((int) 'a')));
        }

        return strBuf.toString();
    }

}
