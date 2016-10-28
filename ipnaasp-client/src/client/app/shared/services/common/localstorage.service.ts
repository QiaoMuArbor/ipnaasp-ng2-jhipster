import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
    constructor(){};
    private storage:any = window.localStorage;

    set(key:string,value:any,isObj=false) {
        if(isObj) {
            this.storage.setItem(key,JSON.stringify(value));
        }else{
            this.storage.setItem(key,(value));
        }

        /*this.storage.setItem('id',userinfo.id);
         this.storage.setItem('accesstoken',userinfo.accesstoken);
         this.storage.setItem('name',userinfo.name);*/
    }

    get(key:string,isObj=false) {
        let value = this.storage.getItem(key)||undefined;
        if(isObj) {
            try{
                value = JSON.parse(value);
            }catch(e){
                value = {};
            }
        }
        /*let userInfo:{id:string,accesstoken:string,name:string};
         userInfo.id=this.storage.getItem("id")||undefined;
         userInfo.accesstoken=this.storage.getItem("accesstoken")||undefined;
         userInfo.name=this.storage.getItem("name")||undefined;*/
        return value;
    }
    retrieve(key:string){
        if(this.get(key)){
            return true;
        }
        return false;
    }
    clear(key:string) {
        this.storage.removeItem(key);
    }
    clearAllData() {
        this.storage.clear();
    }
}
