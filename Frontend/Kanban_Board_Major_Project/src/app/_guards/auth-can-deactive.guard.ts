import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { BoardComponent } from '../board/board.component';

@Injectable({
  providedIn: 'root'
})
export class AuthCanDeactiveGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: BoardComponent, //add component that we want to confirm 
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  } 

}
