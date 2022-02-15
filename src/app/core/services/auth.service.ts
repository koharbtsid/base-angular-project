import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(payload: any): any {
    if (payload.email == 'admin@admin.admin' && payload.password == 'password') {
      return {
        success: true,
        message: 'Success login.',
        errorMessages: [],
        data: {
          email: 'test@test.test',
          token: 'aaaa'
        }
      }
    } else {
      return {
        success: false,
        message: 'Filed login.',
        errorMessages: [
          'Incorrect email or password'
        ],
        data: {}
      }
    }
  }
}
