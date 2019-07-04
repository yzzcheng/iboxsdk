
const formatString = function(num){
    if(num < 10){
        return '0'+num;
    } else return num;
}

export default {


    format(){
        let date = new Date();
        return date.getFullYear() 
        + "-" + formatString(date.getMonth() + 1)
        + "-" + formatString(date.getDay())
        + " " + formatString(date.getHours())
        + ":" + formatString(date.getMinutes())
        + ":" + formatString(date.getSeconds());
    }
}