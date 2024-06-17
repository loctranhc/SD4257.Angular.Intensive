import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {isAuthenticated} from "./auth";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
