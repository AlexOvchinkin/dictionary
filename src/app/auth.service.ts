import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {ENTER_PAGE, HOME_PAGE} from "./types";

@Injectable()
export class AuthService {

    constructor(private router: Router) {
    }

    // осуществляет проверку логина/пароля и устанавливает статус пользователя
    public login(login: string, password: string, remember: boolean): void {
        // пока заглушка без бэкенда
        if (login === 'user' && password === '123') {
            if (remember) {
                localStorage.setItem('user', login);
            } else {
                sessionStorage.setItem('user', login);
            }

        }
    }

    // разлогинивает пользователя
    public logout(): void {
        localStorage.removeItem('user');
        sessionStorage.removeItem('user');
    }

    public goHome(): void {
        if (this.isLogged()) {
            this.router.navigate([ENTER_PAGE])
        } else {
            this.router.navigate([HOME_PAGE]);
        }
    }

    // проверяет - залогинен ли пользователь
    public isLogged(): boolean {
        if (localStorage.getItem('user') || sessionStorage.getItem('user')) {
            return true;
        }

        return false;
    }

}
