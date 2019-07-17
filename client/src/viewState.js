import Login from './view/Login'
import Pay from './view/Payment'
import Registry from './view/Risgistry'
import UserCenter from './view/UserCenter'
import CustomCenter from './view/CustomCenter'
import QuickLoginTip from './view/LoginComponents/QuickLoginTip'
import LoginLoading from './view/LoginComponents/Loading'
import PlatformLogin from './view/LoginComponents/PlatformLogin'
import AccountUpdate from './view/LoginComponents/AccountUpdate'
import PayChannel from './view/PayComponents/Channel'
import ProductList from './view/PayComponents/ProductList'
import ProductDetail from './view/PayComponents/ProductDetail'
import ChargeList from './view/PayComponents/ChargeList'



import LoginV2 from './view/LoginV2'
import RisgistryV2 from './view/RisgistryV2'
import AccountList from './view/LoginComponents/AccountList'
import EditAccount from './view/LoginComponents/EditAccount'
import UserCenterV2 from './view/UserCenterV2'
import BindPhone from './view/UserCenter/BindPhone'
import ModifyPhone from './view/UserCenter/ModifyPhone'
import BindEmail from './view/UserCenter/BindEmail'
import ModifyEmailByPhone from './view/UserCenter/ModifyEmailByPhone'
import ModifyPassword from './view/UserCenter/ModifyPassword'
const componentList = [
    {
        componentName: 'login',
        component: Login,
        size:{
            width:692,
            height:652
        }
    },{
        componentName: 'pay',
        component: Pay
    },{
        componentName: 'registry',
        component: Registry,
        size:{
            width:692,
            height:652
        }
    },{
        componentName:'quickLoginTip',
        component:QuickLoginTip,
        size:{
            width:730,
            height:670
        }
    },{
        componentName:'userCenter',
        component:UserCenter,
        size:{
            width:730,
            height:670
        }
    },{
        componentName:'loginLoading',
        component:LoginLoading,
        size:{
            width:300,
            height:150
        }
    },{
        componentName:'platformLogin',
        component:PlatformLogin,
        size:{
            width:692,
            height:652
        }
    },{
        componentName:'accountUpdate',
        component:AccountUpdate,
        size:{
            width:730,
            height:670
        }
    },{
        componentName:'payChannel',
        component:PayChannel,
        size:{
            full:true,
            width:1186,
            height:670,
        }
    },{
        componentName:'productList',
        component:ProductList,
        size:{
            full:true,
            width:1186,
            height:670,
        }
    },{
        componentName:'productDetail',
        component:ProductDetail,
        size:{
            width:730,
            height:670
        }
    },{
        componentName:'chargeList',
        component:ChargeList,
        size:{
            width:730,
            height:670
        }
    },{
        componentName:'customCenter',
        component:CustomCenter,
        size:{
            width:730,
            height:670
        }
    },{
        componentName:'loginV2',
        component:LoginV2,
        size:{
            width:320,
            height:240
        }
    },{
        componentName:'registryV2',
        component:RisgistryV2,
        size:{
            width:320,
            height:290
        }
    },{
        componentName:'accountList',
        component:AccountList,
        size:{
            width:320,
            height:250
        }
    },{
        componentName:'editAccount',
        component:EditAccount,
        size:{
            width:320,
            height:250
        }
    },{
        componentName:'userCenterV2',
        component:UserCenterV2,
        size:{
            full:true,
        }
    },{
        componentName:'bindPhone',
        component:BindPhone,
        size:{
            full:true,
        }
    },{
        componentName:'modifyPhone',
        component:ModifyPhone,
        size:{
            full:true,
        }
    },{
        componentName:'bindEmail',
        component:BindEmail,
        size:{
            full:true,
        }
    },{
        componentName:'modifyEmailByPhone',
        component:ModifyEmailByPhone,
        size:{
            full:true,
        }
    },{
        componentName:'modifyPassword',
        component:ModifyPassword,
        size:{
            full:true,
        }
    }
];

export default componentList;

export const componentController = {
    addListener:function(callback){
       this.event = callback;
    },
    changeView(view,callback){
        if(this.event){
            for(var i = 0;i<componentList.length;i++){
                if(componentList[i].componentName === view) {
                    this.event(componentList[i],callback);
                }
            }
            
        }
           
    },
    removeListener:function(){
        if(this.event) this.event = null;
    }
}
