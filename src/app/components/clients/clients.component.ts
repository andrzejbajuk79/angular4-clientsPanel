import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/Client';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2/database';
import { Action } from 'rxjs/scheduler/Action';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients:any[];
  client:Client;
  totalOwed:number;

  constructor(
    public af:AngularFireDatabase,
    public clientService :ClientService
  ) {
   
   }

  ngOnInit() {
    // this.af.list('/clients').snapshotChanges().map(actions => {
    //   return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    //  }).subscribe(items => {
    //   items.map(item => item.key);    
    //   this.clients = items;
    //   console.log(this.clients)
    // })  

  
    this.clientService.getClients().snapshotChanges().map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    }).subscribe(items => {
      items.map(item =>item.key)
      this.clients =  items;
      console.log(this.clients);
      this.getTotalOwed();
    })

    
  }




  getTotalOwed(){
    let total = 0;
    for(let i = 0;i<this.clients.length;i++){
      total += parseFloat(this.clients[i].balance);    
    }
    this.totalOwed = total;
    console.log(total);
    
  }

}
