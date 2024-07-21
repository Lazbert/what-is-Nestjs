import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  signUp() {
    return { message: 'I am signed up' };
  }
  signIn() {
    return { message: 'I am signed in' };
  }
}
