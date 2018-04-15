import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, } from 'angularfire2/database';
import {  FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { Observable } from 'rxjs';
import { Client } from '../models/Client';
import 'rxjs/add/operator/map';



@Injectable()
export class ClientService {
  // clients : any[];
  //  clients: AngularFireList<any[]>
  clients: FirebaseListObservable<any[]>;
  client : FirebaseObjectObservable<Client>;

  // clients: AngularFirestoreCollection<Client>;
  // client : Observable<Client[]>;

  constructor(
    public af:AngularFireDatabase
  ) {
     this.clients = this.af.list('/clients') as AngularFireList<Client[]>
    // this.af.list('/clients').valueChanges().subscribe(console.log);


    // af.list('/clients').snapshotChanges().map(actions => {
    //   return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    // }).subscribe(items => {
    //  items.map(item => item.key);
    // });

    // this.af.list<Client>('/client').valueChanges().subscribe(console.log);
   }
   getClients(){
    this.af.list('/clients').snapshotChanges().map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
     }).subscribe(items => {
      items.map(item => item.key);          
      })  
     return this.clients;
   }
   newClient(client){
     this.clients.push(client);
   }

   getClient(id:string){
    this.client = this.af.object('/clients/'+id) as FirebaseObjectObservable<Client>;
    return this.client;
   }
   updateClient(id:string,client:Client){  
    return this.clients.update(id,client);
   }
   deleteClient(id:string){
     return this.clients.remove(id);
   }
 
}