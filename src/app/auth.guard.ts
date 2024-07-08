import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';


export const authGuard: CanActivateFn = (route:  ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  if(localStorage.getItem('Token')  === null || localStorage.getItem('Token') == undefined){

    return false;
    }else{
    return true;
  } 
};