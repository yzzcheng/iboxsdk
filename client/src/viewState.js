import Login from './view/Login'
import Pay from './view/Payment'
import Registry from './view/Risgistry'
import UserCenter from './view/UserCenter'
import QuickLoginTip from './view/LoginComponents/QuickLoginTip'
import LoginLoading from './view/LoginComponents/Loading'
import PlatformLogin from './view/LoginComponents/PlatformLogin'
import AccountUpdate from './view/LoginComponents/AccountUpdate'
import PayChannel from './view/PayComponents/Channel'
import ProductList from './view/PayComponents/ProductList'
import ProductDetail from './view/PayComponents/ProductDetail'
import ChargeList from './view/PayComponents/ChargeList'


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
            width:730,
            height:670
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
        component:LoginLoading
    },{
        componentName:'platformLogin',
        component:PlatformLogin,
        size:{
            width:692,
            height:652
        }
    },{
        componentName:'accountUpdate',
        component:AccountUpdate
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
    }
];

export default componentList;

export const componentController = {
    addListener:function(callback){
       this.event = callback;
    },
    changeView(view){
        if(this.event){
            for(var i = 0;i<componentList.length;i++){
                if(componentList[i].componentName === view) {
                    this.event(componentList[i]);
                }
            }
            
        }
           
    },
    removeListener:function(){
        if(this.event) this.event = null;
    }
}
