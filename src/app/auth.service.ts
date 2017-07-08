import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {ENTER_PAGE, HOME_PAGE, ILoginData} from "./types";

@Injectable()
export class AuthService {

    constructor(private router: Router) {
    }

    // осуществляет проверку логина/пароля и устанавливает статус пользователя
    public login(loginData: ILoginData): void {
        // пока заглушка без бэкенда
        if (loginData.email === 'user@gmail.com' && loginData.password === '123') {
            if (loginData.remember) {
                localStorage.setItem('user', loginData.email);
            } else {
                sessionStorage.setItem('user', loginData.email);
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
      // нужно дополнить проверкой пароля (или хэша) на бэкенде
        if (localStorage.getItem('user') || sessionStorage.getItem('user')) {
            return true;
        }

        return false;
    }

}
