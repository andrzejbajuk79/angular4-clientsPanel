import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { FormsModule} from '@angular/forms';
import {FlashMessagesModule, FlashMessagesService} from 'angular2-flash-messages';


//Angular Fire imports
import {AngularFireModule} from 'angularfire2';
import { AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';



// Components Imports
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientsDetailsComponent } from './components/clients-details/clients-details.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
//Sevice Imports
import { ClientService } from './services/client.service';
import { AuthService  } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';


const appRoutes : Routes = [
  // {path:'',component:DashboardComponent},
  {path:'register',component:RegisterComponent},
  {path: 'login', component:LoginComponent},
  {path:'add-client',component:AddClientComponent, canActivate:[AuthGuard]},
  {path:'client/:id',component: ClientsDetailsComponent, canActivate:[AuthGuard]},
  {path:'edit-client/:id',component: EditClientComponent, canActivate:[AuthGuard]},
  {path: 'welcome', component : DashboardComponent, canActivate:[AuthGuard]},
  {path: '', redirectTo: 'welcome',pathMatch: 'full'},
  {path: '**',  redirectTo: 'welcome',pathMatch: 'full'}

]
export const firebaseConfig =  {
  apiKey: "AIzaSyB7fFsNcPGWtAGSNqqAX6-21L3ZwuJTyFU",
  authDomain: "clientspanel-93df8.firebaseapp.com",
  databaseURL: "https://clientspanel-93df8.firebaseio.com",
  storageBucket: "clientspanel-93df8.appspot.com",
  messagingSenderId: "819483932958"
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ClientsComponent,
    ClientsDetailsComponent,
    AddClientComponent,
    EditClientComponent,
    NavbarComponent,
    SidebarComponent,
    LoginComponent,
    RegisterComponent,
    SettingsComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig),
    FormsModule,
    FlashMessagesModule
    
  ],
  providers: [
    AngularFireAuth,
    ClientService,
    AuthService ,
    AngularFireDatabase,
    FlashMessagesService ,
    AuthGuard 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
