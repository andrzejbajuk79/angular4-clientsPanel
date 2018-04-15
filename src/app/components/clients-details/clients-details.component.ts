import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';
import { Client } from '../../models/Client';


@Component({
  selector: 'app-clients-details',
  templateUrl: './clients-details.component.html',
  styleUrls: ['./clients-details.component.css']
})
export class ClientsDetailsComponent implements OnInit {
id:string;
client:Client;
hasBalance:boolean = false;
showBalanceUpdateInput:boolean=false;

  constructor(
    public clientService : ClientService,
    public router : Router,
    public route: ActivatedRoute,
    public flashMessegesService :FlashMessagesService) { }

  ngOnInit() {
    //Get ID 
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    //Get Client
    this.clientService.getClient(this.id).valueChanges().subscribe(client =>{
      if(client.balance > 0){
        this.hasBalance =true;
      }
      this.client = client;
      console.log(this.client);
      
    });
    
  }
  updateBalance(id:string){
    //Update clinets
    this.clientService.updateClient(this.id,this.client);
    this.flashMessegesService.show('Balance Updated ',
    {cssClass: 'alert-success',timeout: 4000})
    this.router.navigate(['/client/'+this.id]);

  }

}
