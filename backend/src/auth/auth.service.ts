import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
  ) {}
  async signUp(authDto: AuthDto) {
    // generate password hash
    const hash = await argon.hash(
      authDto.password,
    );

    // save new user in db
    const user =
      await this.prismaService.user.create({
        data: {
          email: authDto.email,
          hash,
        },

        // select: {
        //   // select what fields to return - not very wise to return the hash
        //   id: true,
        //   email: true,
        //   createdAt: true,
        // },
      });

    // return new user
    return user;
  }
  signIn() {
    return { message: 'I am signed in' };
  }
}
