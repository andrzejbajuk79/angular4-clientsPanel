import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';
import { Client } from '../../models/Client';
import { SettingService } from '../../services/setting.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
 id:string;
 disableBalanceOnEdit:boolean=true;
 client:Client = {
   firstName:'',
    lastName:'',
    balance :0,
    phone:''
 }
  constructor(
   public clientService : ClientService,
   public settingservice: SettingService,
    public router : Router,
    public route: ActivatedRoute,
    public flashMessagesService :FlashMessagesService) { }

  ngOnInit() {

     //Get ID
     this.id = this.route.snapshot.params['id'];
     //Get Client
     this.clientService.getClient(this.id).valueChanges().subscribe(client =>{
      this.client = client;
    });
    this.disableBalanceOnEdit = this.settingservice.getSettings().disableBalanceOnEdit;
  }
  onSubmit({value, valid}:{value:Client,valid:boolean}){
    if(this.disableBalanceOnEdit){
      value.balance = 0;
    }
  
    if(!valid){
      this.flashMessagesService.show("Please fill all fields",
      {cssClass:'alert-danger',timeout:4000});
      this.router.navigate(['add-client/'+this.id]);

    }else{
      //Update client 
      this.clientService.updateClient(this.id,value);
      this.flashMessagesService.show("Clients detail has been updated. Thank You",
      {cssClass:'alert-success',timeout:4000});
      this.router.navigate(['/client/'+this.id]);
    }
  }

}
