import { Pipe } from '@angular/core';

@Pipe({name: 'ISOLocal'})
export class ISOLocalPipe {
  transform(value:any) {
    if (!value) {
      return null;
    }
    if (!isNaN(value)) {
      value = value;
    }else {
      value = Date.parse(value);
    }
    let localTime: string = '';
    let offset: number = (new Date()).getTimezoneOffset();
    localTime = (new Date(value - offset * 60000)).toISOString();
    localTime = localTime.substr(0, localTime.lastIndexOf('Z'));
    localTime = localTime.replace('T', ' ');
    return this.getDateDiff(localTime);
  }
  getDateDiff(dateTimeStamp:string):any{
    let ndateTimeStamp:number = Date.parse(dateTimeStamp);
    let minute:number = 1000 * 60;
    let hour:number = minute * 60;
    let day:number = hour * 24;
    let halfamonth:number = day * 15;
    let month:number = day * 30;
    let now:number = new Date().getTime();
    let diffValue:number = now - ndateTimeStamp;
    let yearC:any = diffValue/month/12;
    let monthC:any =diffValue/month;
    let weekC:any =diffValue/(7*day);
    let dayC:any =diffValue/day;
    let hourC:any =diffValue/hour;
    let minC:any =diffValue/minute;
    let result:string = "";
    if(yearC>=1){
      result="" + parseInt(yearC) + "年前";
    }
    else if(monthC>=1){
      result="" + parseInt(monthC) + "月前";
    }
    else if(weekC>=1){
      result="" + parseInt(weekC) + "周前";
    }
    else if(dayC>=1){
      result=""+ parseInt(dayC) +"天前";
    }
    else if(hourC>=1){
      result=""+ parseInt(hourC) +"小时前";
    }
    else if(minC>=1){
      result=""+ parseInt(minC) +"分钟前";
    }else {
      result="刚刚";
    }
    return result;
  }
}

