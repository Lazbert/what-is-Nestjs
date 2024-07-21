import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import {
  ExtractJwt,
  Strategy,
} from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

// from Nestjs authentication docs
@Injectable() // note Strategy can be a provider for DI as well
export class JwtStrategy extends PassportStrategy(
  Strategy,
  'jwt', // match key in AuthGuard('jwt')
) {
  constructor(
    configService: ConfigService,
    private prismaService: PrismaService,
  ) {
    super({
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        configService.get('JWT_SECRET'),
    });
  }

  // return from validate will be added to request object
  // here, payload refers to the data encoded in the JWT
  async validate(payload: any) {
    const user =
      await this.prismaService.user.findUnique({
        where: {
          id: payload.sub,
        },
      });
    delete user.hash;
    return user;
  }
}
