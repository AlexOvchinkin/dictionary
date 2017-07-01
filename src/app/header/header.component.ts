import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HOME_PAGE, REGISTRATION_PAGE} from "../types";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public selectMainPage(): void {
    this.router.navigate([HOME_PAGE])
  }

  public selectRegistration(): void {
    this.router.navigate([REGISTRATION_PAGE])
  }

}
