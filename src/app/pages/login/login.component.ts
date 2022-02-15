import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage: string;
  loginForm: FormGroup;

  constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _router: Router
  ) {
    this.generateLoginForm();
  }

  ngOnInit(): void {
  }

  generateLoginForm() {
    this.loginForm = this._formBuilder.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  login() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.errorMessage = '';
      const payload = this.loginForm.value;
      const resLogin = this._authService.login(payload)
      console.log(resLogin)
      if (resLogin.success) {
        this._router.navigateByUrl('/employee-management')
      } else {
        this.errorMessage = resLogin.errorMessages[0];
      }

    }
  }

}
