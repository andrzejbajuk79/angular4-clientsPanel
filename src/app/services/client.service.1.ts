import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, } from 'angularfire2/database';
import {  FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Client } from '../models/Client';
import 'rxjs/add/operator/map';

@Injectable()
export class ClientService {
    // clients : any[];
  //  clients: AngularFireList<any[]>
   clients: FirebaseListObservable<any[]>;
  client : FirebaseObjectObservable<any>;

  constructor(
    public af:AngularFireDatabase
  ) {
    this.clients = this.af.list('/clients') as AngularFireList<Client[]>

    this.client = this.clients.snapshotChanges().map(changes => {
       changes.map(c => ({ key: c.payload.key, ...c.payload.val() ,
   
  }));
  // console.log(c.payload.key);
   

 });
  

 
  
   }
   getClients(){
   
    return this.clients;
   }
   newClient(client:Client){
    this.clients.push(client);
   }
 
}