import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidations, FormFields, ValidationMessages } from 'src/app/shared/custom/validations';
import { AuthService } from '../auth.service';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginFormField = FormFields.loginForm;
  loginValidationMessages = ValidationMessages.loginMessages;

  constructor(
    private _router: Router,
    private fb: FormBuilder,
    private _customValidation: CustomValidations,
    private _authService: AuthService,
    private _tokenService: TokenService
  ) {
    this.createLoginForm();
  }

  ngOnInit() {
    const isUserSessionValid = this._tokenService.isLoggedIn();
    if (isUserSessionValid) {
      this._router.navigate(['/messages'])
    }
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    this.loginForm.valueChanges.subscribe((data) => {
      this._customValidation.validate(data, this.loginForm, this.loginFormField, this.loginValidationMessages)
    });
  }

  onLogin() {
    console.log(this.loginForm.valid)
    if (this.loginForm.valid) {
      this._authService.login(this.loginForm.value).subscribe((res) => {
        if (res.code === 200) {
          this._tokenService.setSession(res.user)
          this._router.navigate(['/messages']);
        } 
      }, (err) => {
        console.log(err, 'eeeeeeeeeeee');
      })
    } else {
      this._customValidation.validateAllFormFields(this.loginForm, this.loginFormField, this.loginValidationMessages);
    }
  }

}
