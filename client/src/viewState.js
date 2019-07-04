import Login from './view/Login'
import Pay from './view/Payment'
import Registry from './view/Risgistry'
import QuickLoginTip from './view/LoginComponents/QuickLoginTip'
import LoginLoading from './view/LoginComponents/Loading'
import PlatformLogin from './view/LoginComponents/PlatformLogin'
import AccountUpdate from './view/LoginComponents/AccountUpdate'

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
