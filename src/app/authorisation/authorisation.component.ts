import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
    selector: 'app-authorisation',
    templateUrl: './authorisation.component.html',
    styleUrls: ['./authorisation.component.css']
})
export class AuthorisationComponent implements OnInit {

    private email: string = '';
    private password: string = '';
    private remember: boolean = false;

    public formGroup: FormGroup;

    constructor(private authService: AuthService, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        // подключимся к форме
        this.formGroup = this.formBuilder.group({
            email: [null, Validators.required],
            password: [null, Validators.required],
            remember: [null]
        });

        // подписка на email
        this.formGroup.get('email').valueChanges.subscribe( (value: string) => {
            this.email = value;
        } );

        // подписка на пароль
        this.formGroup.get('password').valueChanges.subscribe( (value: string) => {
            this.password = value;
        } );

        // подписка на чекбокс
        this.formGroup.get('remember').valueChanges.subscribe( (value: boolean) => {
            this.remember = value;
        } );
    }

    // осуществляет аутентификацию пользователя
    public login(): void {
        this.authService.login(this.email, this.password, this.remember);

        if (this.authService.isLogged()) {
            this.authService.goHome();
        } else {
            // пока - сообщение, сделать всплывающее в html
            alert('Неверный логин / пароль !');
        }

    }

}
