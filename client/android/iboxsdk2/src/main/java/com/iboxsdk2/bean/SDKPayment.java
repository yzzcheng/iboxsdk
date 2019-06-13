package com.iboxsdk2.bean;

import java.util.Map;

public class SDKPayment {

    private String productName;
    private int diamond;
    private String roleId;
    private String roleName;
    private String gameZoneId;
    private Map<String,String> ext;
    private int vipLevel;
    private int level;

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public int getDiamond() {
        return diamond;
    }

    public void setDiamond(int diamond) {
        this.diamond = diamond;
    }

    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public String getGameZoneId() {
        return gameZoneId;
    }

    public void setGameZoneId(String gameZoneId) {
        this.gameZoneId = gameZoneId;
    }

    public Map<String, String> getExt() {
        return ext;
    }

    public void setExt(Map<String, String> ext) {
        this.ext = ext;
    }

    public int getVipLevel() {
        return vipLevel;
    }

    public void setVipLevel(int vipLevel) {
        this.vipLevel = vipLevel;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }
}
