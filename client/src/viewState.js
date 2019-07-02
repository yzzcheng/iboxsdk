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
        component: Login
    },{
        componentName: 'pay',
        component: Pay
    },{
        componentName: 'registry',
        component: Registry
    },{
        componentName:'quickLoginTip',
        component:QuickLoginTip
    },{
        componentName:'loginLoading',
        component:LoginLoading
    },{
        componentName:'platformLogin',
        component:PlatformLogin
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
        if(this.event)
            this.event(view);
    },
    removeListener:function(){
        if(this.event) this.event = null;
    }
}
