import base from './Base'


const accountListKey = "user:accountList";

export default class User extends base {
    setAccountList(value, callback) {
        super.setData(accountListKey, JSON.stringify(value), callback);
    }
    getAccountList(callback) {
        super.getData(accountListKey, callback)
    }

    addAccountOnNotExit(item, callback) {
        this.getAccountList((error, result) => {
            if(result) {
                let accountList = JSON.parse(result);
                let index = accountList.findIndex(ele => ele.userId === item.userId);
                if (index < 0) {
                    item.loginCount = 1;
                    accountList.splice(0,0,item);
                }else {
                    accountList.splice(index,1);
                    accountList.splice(0,0,item);
                } 
                this.setAccountList(accountList, callback)
            }else {
                let accountList = [];
                item.loginCount = 1;
                accountList.push(item);
                this.setAccountList(accountList, callback)
            }
            
        })
    }
}