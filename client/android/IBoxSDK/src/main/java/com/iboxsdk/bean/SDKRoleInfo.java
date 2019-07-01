package com.iboxsdk.bean;

public class SDKRoleInfo {
    private String roleId;
    private String roleName;
    private String gameZoneId;
    private int level;
    private int vipLevel;
    private Long diamond;
    private Long roleCreateTime;
    private String gameVersion;

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

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public int getVipLevel() {
        return vipLevel;
    }

    public void setVipLevel(int vipLevel) {
        this.vipLevel = vipLevel;
    }

    public Long getDiamond() {
        return diamond;
    }

    public void setDiamond(Long diamond) {
        this.diamond = diamond;
    }

    public Long getRoleCreateTime() {
        return roleCreateTime;
    }

    public void setRoleCreateTime(Long roleCreateTime) {
        this.roleCreateTime = roleCreateTime;
    }

    public String getGameVersion() {
        return gameVersion;
    }

    public void setGameVersion(String gameVersion) {
        this.gameVersion = gameVersion;
    }
}
