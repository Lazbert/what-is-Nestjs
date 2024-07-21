import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}
  signUp() {
    return { message: 'I am signed up' };
  }
  signIn() {
    return { message: 'I am signed in' };
  }
}
