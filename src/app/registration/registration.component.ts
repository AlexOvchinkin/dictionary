import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AUTHORISATION_PAGE, EMAIL_PATTERN, PASSWORD_MIN_LENGTH} from "../types";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public formGroup: FormGroup;
  public nameInvalid: boolean;
  public emailInvalid: boolean;
  public passwordInvalid: boolean;

  constructor(private router: Router, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.nameInvalid = false;
    this.emailInvalid = false;
    this.passwordInvalid = false;

    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(PASSWORD_MIN_LENGTH)
        ]
      ],
      passwordRepeat: [
        '',
        [
          Validators.required,
          Validators.minLength(PASSWORD_MIN_LENGTH)
        ]
      ]
    });
  }

  // проверяет пароль и его подтверждение на идентичность
  private passwordIdentical(): boolean {
    return this.formGroup.controls['password'].value as string === this.formGroup.controls['passwordRepeat'].value as string;
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

  public passwordRepeatEnter(): void {
    this.passwordInvalid = !this.checkControlValid(this.formGroup.controls.password as FormControl);
  }

  public passwordRepeatBlur(): void {
    this.passwordInvalid = !this.checkControlValid(this.formGroup.controls.password as FormControl);
  }

  // проверяет валидность
  private checkControlValid(control: FormControl): boolean {
    return control.status === 'VALID';
  }

  // обработчик клика по кнопке регистрации
  public register(): void {
    // проверим на "VALID"
    this.passwordInvalid = !this.checkControlValid(this.formGroup.controls.password as FormControl);

    // проверим совпадают ли пароли
    if (!this.passwordInvalid) {
      this.passwordInvalid = !this.passwordIdentical();
    }

    this.emailInvalid = !this.checkControlValid(this.formGroup.controls.email as FormControl);
    this.nameInvalid = !this.checkControlValid(this.formGroup.controls.name as FormControl);

    if (!this.passwordInvalid
      && !this.emailInvalid
      && !this.nameInvalid) {

      this.router.navigate([AUTHORISATION_PAGE]);
    }
  }

}





















