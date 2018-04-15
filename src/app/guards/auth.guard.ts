import { Router, CanActivate } from "@angular/router";
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/RX";
import 'rxjs/add/operator/map';
import { Injectable } from "@angular/core";

// @Incjectable()
// export class AuthGuard implements CanActivate {
//     constructor(
//         private router: Router,
//         private afAuth: AngularFireAuth
        
//     ){}
//     CanActivate() :Observable<boolean>
    
// }

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router:Router,
        public afAuth:AngularFireAuth
    ){}

    canActivate(): Observable<boolean>{
        return this.afAuth.authState.map(auth => {
            if(!auth){
                this.router.navigate(['/login']);
                return false;
            } else {
                return true;
            }
        });
    }
}