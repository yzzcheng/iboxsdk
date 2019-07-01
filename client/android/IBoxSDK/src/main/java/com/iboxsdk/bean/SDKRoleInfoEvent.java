package com.iboxsdk.bean;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.iboxsdk.abstracts.EventData;

public class SDKRoleInfoEvent extends SDKRoleInfo implements EventData {

    public SDKRoleInfoEvent(SDKRoleInfo roleInfo){
        setRoleId(roleInfo.getRoleId());
        setRoleName(roleInfo.getRoleName());
        setLevel(roleInfo.getLevel());
        setVipLevel(roleInfo.getVipLevel());
        setGameZoneId(roleInfo.getGameZoneId());
        setGameVersion(roleInfo.getGameVersion());
        setDiamond(roleInfo.getDiamond());
        setRoleCreateTime(roleInfo.getRoleCreateTime());
    }

    @Override
    public WritableMap toMap() {
        WritableMap map = Arguments.createMap();
        map.putString("roleId",getRoleId());
        map.putString("roleName",getRoleName());
        map.putString("gameZoneId",getGameZoneId());
        map.putString("gameVersion",getGameVersion());
        map.putInt("level",getLevel());
        map.putInt("vipLevel",getVipLevel());
        map.putInt("diamond",getDiamond().intValue());
        map.putInt("roleCreateTime",getRoleCreateTime().intValue());
        return map;
    }
}
