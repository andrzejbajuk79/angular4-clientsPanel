import { Router, CanActivate } from "@angular/router";
import { Injectable } from "@angular/core";
import { SettingService } from "../services/setting.service";

// @Incjectable()
// export class AuthGuard implements CanActivate {
//     constructor(
//         private router: Router,
//         private afAuth: AngularFireAuth
        
//     ){}
//     CanActivate() :Observable<boolean>
    
// }

@Injectable()
export class RegisterGuard implements CanActivate {
    constructor(
        public settingService: SettingService,
        private router:Router,
       
    ){}

    canActivate(): boolean{
      if(this.settingService.getSettings().allowRegistration){
        return true;
      }else{
        this.router.navigate(['/login']);
        return false;
      }
    }
}