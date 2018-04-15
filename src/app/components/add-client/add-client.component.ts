import { Component, OnInit }    from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages'
import { Client }               from '../../models/Client';
import { Router }               from '@angular/router'
import { ClientService } from '../../services/client.service';


@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
 client:Client ={
   id: '33',
  firstName:'', 
  lastName: '',
  email: '',
  phone: '',
  balance: 0
 };
disableBalanceOnAdd :boolean =false;
  constructor(
    public clientService: ClientService,
    public flashMessagesService: FlashMessagesService,
    public router :Router
  ) { }

  ngOnInit() {
  }

  onSubmit({value, valid}:{value:Client,valid:boolean}){
    if(this.disableBalanceOnAdd){
      value.balance = 0;
    }
   
    if(!valid){
      this.flashMessagesService.show("Please fill all fields",
      {cssClass:'alert-danger',timeout:4000});
      this.router.navigate(['add-client']);

    }else{
      //Add new client 
      this.clientService.newClient(value);
      this.flashMessagesService.show("Clien has been added to database. Thank You",
      {cssClass:'alert-success',timeout:4000});
      this.router.navigate(['/t']);
    }
  }

}
