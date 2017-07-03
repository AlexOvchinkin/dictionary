import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AUTHORISATION_PAGE, HOME_PAGE, REGISTRATION_PAGE} from "../types";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  public isLogged(): boolean {
    return this.authService.isLogged();
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigate([HOME_PAGE]);
  }

  public selectMainPage(): void {
    this.authService.goHome();
  }

  public selectRegistration(): void {
    this.router.navigate([REGISTRATION_PAGE])
  }

  public selectAuthorisation(): void {
    this.router.navigate([AUTHORISATION_PAGE])
  }

}
