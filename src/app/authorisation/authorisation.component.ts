import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {HOME_PAGE, PASSWORD_MIN_LENGTH, REGISTRATION_PAGE} from "../types";

@Component({
  selector: 'app-authorisation',
  templateUrl: './authorisation.component.html',
  styleUrls: ['./authorisation.component.css']
})
export class AuthorisationComponent implements OnInit {

  public formGroup: FormGroup;
  public emailInvalid: boolean;
  public passwordInvalid: boolean;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.emailInvalid = false;
    this.passwordInvalid = false;
    let rxEmailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // подключимся к форме
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(rxEmailPattern)]],
      password: ['', [Validators.required, Validators.minLength(PASSWORD_MIN_LENGTH)]],
      remember: ['']
    });
  }

  public emailEnter(): void {
    this.emailInvalid = !this.checkControlValid(this.formGroup.controls.email as FormControl);
  }

  public emailBlur(): void {
    this.emailInvalid = !this.checkControlValid(this.formGroup.controls.email as FormControl);
  }

  public passwordEnter(): void {
    this.passwordInvalid = !this.checkControlValid(this.formGroup.controls.password as FormControl);
  }

  public passwordBlur(): void {
    this.passwordInvalid = !this.checkControlValid(this.formGroup.controls.password as FormControl);
  }

  // проверяет валидность
  private checkControlValid(control: FormControl): boolean {
    return control.status === 'VALID';
  }

  // осуществляет аутентификацию пользователя
  public login(): void {
    // проверим правильность заполнения полей
    this.emailInvalid = !this.checkControlValid(this.formGroup.controls.email as FormControl);
    this.passwordInvalid = !this.checkControlValid(this.formGroup.controls.password as FormControl);

    // если все норм ...
    if (!this.passwordInvalid && !this.emailInvalid) {
      // ... пробуем логиниться
      this.authService.login({
        email: this.formGroup.controls.email.value,
        password: this.formGroup.controls.password.value,
        remember: this.formGroup.controls.remember.value
      });

      // действия в зависимости от результатов проверки логина/пароля
      if (this.authService.isLogged()) {
        this.authService.goHome();
      } else {
        // пока - сообщение, сделать всплывающее в html
        alert('Неверный логин / пароль !');
      }
    }
  }

}
