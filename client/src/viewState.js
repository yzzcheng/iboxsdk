// import Login from './view/Login'
// import Pay from './view/Payment'
// import Registry from './view/Risgistry'
// import UserCenter from './view/UserCenter'
// import CustomCenter from './view/CustomCenter'
// import QuickLoginTip from './view/LoginComponents/QuickLoginTip'
// import LoginLoading from './view/LoginComponents/Loading'
// import PlatformLogin from './view/LoginComponents/PlatformLogin'
// import AccountUpdate from './view/LoginComponents/AccountUpdate'
// import PayChannel from './view/PayComponents/Channel'
// import ProductList from './view/PayComponents/ProductList'
// import ProductDetail from './view/PayComponents/ProductDetail'
// import ChargeList from './view/PayComponents/ChargeList'



import LoginV2 from './view/LoginV2'
import RisgistryV2 from './view/RisgistryV2'
import AccountList from './view/LoginComponents/AccountList'
import EditAccount from './view/LoginComponents/EditAccount'
import GuestAccountTip from './view/LoginComponents/GuestAccountTip'
import AccountLogin from './view/LoginComponents/AccountLogin'
import UserCenterGuest from './view/UserCenter/UserCenterGuest'
import UserCenterThirdParty from './view/UserCenter/UserCenterThirdParty'
import UserCenterV2 from './view/UserCenterV2'
import BindPhone from './view/UserCenter/BindPhone'
import ModifyPhone from './view/UserCenter/ModifyPhone'
import BindEmail from './view/UserCenter/BindEmail'
import ModifyEmailByPhone from './view/UserCenter/ModifyEmailByPhone'
import ModifyPassword from './view/UserCenter/ModifyPassword'
import GuestUpdate from './view/LoginComponents/GuestUpdate'
import PlatformUpdate from './view/LoginComponents/PlatformUpdate'
import RegistrySuccess from './view/LoginComponents/RegistrySuccess'
import ChannelListV2 from './view/PayComponents/ChannelListV2'
import CardList from './view/PayComponents/CardList'
import WebPayView from './view/PayComponents/WebPayView'


const componentList = [
    // {
    //     componentName: 'login',
    //     component: Login,
    //     size:{
    //         width:692,
    //         height:652
    //     }
    // },{
    //     componentName: 'pay',
    //     component: Pay
    // },{
    //     componentName: 'registry',
    //     component: Registry,
    //     size:{
    //         width:692,
    //         height:652
    //     }
    // },{
    //     componentName:'quickLoginTip',
    //     component:QuickLoginTip,
    //     size:{
    //         width:730,
    //         height:670
    //     }
    // },{
    //     componentName:'userCenter',
    //     component:UserCenter,
    //     size:{
    //         width:730,
    //         height:670
    //     }
    // },{
    //     componentName:'loginLoading',
    //     component:LoginLoading,
    //     size:{
    //         width:300,
    //         height:150
    //     }
    // },{
    //     componentName:'platformLogin',
    //     component:PlatformLogin,
    //     size:{
    //         width:692,
    //         height:652
    //     }
    // },{
    //     componentName:'accountUpdate',
    //     component:AccountUpdate,
    //     size:{
    //         width:730,
    //         height:670
    //     }
    // },{
    //     componentName:'payChannel',
    //     component:PayChannel,
    //     size:{
    //         full:true,
    //         width:1186,
    //         height:670,
    //     }
    // },{
    //     componentName:'productList',
    //     component:ProductList,
    //     size:{
    //         full:true,
    //         width:1186,
    //         height:670,
    //     }
    // },{
    //     componentName:'productDetail',
    //     component:ProductDetail,
    //     size:{
    //         width:730,
    //         height:670
    //     }
    // },{
    //     componentName:'chargeList',
    //     component:ChargeList,
    //     size:{
    //         width:730,
    //         height:670
    //     }
    // },{
    //     componentName:'customCenter',
    //     component:CustomCenter,
    //     size:{
    //         width:730,
    //         height:670
    //     }
    // },
    {
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
        componentName:'accountLogin',
        component:AccountLogin,
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
        componentName:'userCenterGuest',
        component:UserCenterGuest,
        size:{
            full:true,
        }
    },{
        componentName:'userCenterThirdParty',
        component:UserCenterThirdParty,
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
    },{
        componentName:'guestAccountTip',
        component:GuestAccountTip,
        size:{
            width:320,
            height:250
        }
    },{
        componentName:'guestUpdate',
        component:GuestUpdate,
        size:{
            width:320,
            height:175
        }
    },{
        componentName:'platformUpdate',
        component:PlatformUpdate,
        size:{
            width:320,
            height:270
        }
    },{
        componentName:'registrySuccess',
        component:RegistrySuccess,
        size:{
            width:320,
            height:150
        }
    },{
        componentName:'webPayView',
        component:WebPayView,
        size:{
            full:true,
        }
    },{
        componentName:'channelListV2',
        component:ChannelListV2,
        size:{
            width:460,
            height:310
        }
    },{
        componentName:'cardList',
        component:CardList,
        size:{
            width:460,
            height:310
        }
    }
];

export default componentList;

export const componentController = {
    addListener:function(callback){
       this.event = callback;
    },
    changeView(view,callback,props){
        if(this.event){
            for(var i = 0;i<componentList.length;i++){
                if(componentList[i].componentName === view) {
                    this.event(componentList[i],callback,props);
                }
            }
            
        }
           
    },
    removeListener:function(){
        if(this.event) this.event = null;
    }
}
