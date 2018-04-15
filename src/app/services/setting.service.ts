import { Injectable } from '@angular/core';
import { Settings } from '../models/settings';
import { all } from 'q';


@Injectable()
export class  SettingService {
  settings: Settings ={
      disableBalanceOnAdd:false,
      disableBalanceOnEdit:true,
      allowRegistration:true
  }
  constructor() { 
    if(localStorage.getItem('settings') != null){
      this.settings = JSON.parse(localStorage.getItem('settings'));
    }
  }
  getSettings(){
    return this.settings;
  }
  changeSettings(settings:Settings){
    localStorage.setItem('settings',JSON.stringify(settings))
  }

}
