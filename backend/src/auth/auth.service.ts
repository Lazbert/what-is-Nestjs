import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

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
    try {
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

      // return new user without hash
      delete user.hash;
      return user;
    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          // duplicate email
          throw new ForbiddenException(
            'Credentials taken',
          );
        }
      }
      throw error;
    }
  }
  async signIn(authDto: AuthDto) {
    // find user by email (unique field)
    // if user does not exist throw exception
    const user =
      await this.prismaService.user.findUnique({
        where: {
          email: authDto.email,
        },
      });

    if (!user) {
      throw new ForbiddenException(
        'Credentials incorrect',
      );
    }

    // if user exists, compare password
    // throw exception if password incorrect
    const passwordMatches = await argon.verify(
      user.hash,
      authDto.password,
    );
    if (!passwordMatches) {
      throw new ForbiddenException(
        'Credentials incorrect',
      );
    }

    // return user
    delete user.hash;
    return user;
  }
}
