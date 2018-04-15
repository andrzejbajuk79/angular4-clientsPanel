import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../services/setting.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import {  Settings } from '../../models/settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
settings: Settings;
  constructor(
    public settingServices: SettingService,
    public router: Router,
    public flashMessageService:FlashMessagesService,
   

    
  ) { }

  ngOnInit() {
    this.settings = this.settingServices.getSettings();
  }
  onSubmit(){
    this.settingServices.changeSettings(this.settings);
    this.flashMessageService.show("Settings saved",
    {cssClass:'alert-success',timeout:4000});
    this.router.navigate(['/settings'])
  }

}
