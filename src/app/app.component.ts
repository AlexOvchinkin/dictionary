import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";
import {ENTER_PAGE, HOME_PAGE} from "./types";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    title = 'app';

    constructor(private router: Router, private authService: AuthService) {
    }

    ngOnInit(): void {
        this.authService.goHome();
    }
}
