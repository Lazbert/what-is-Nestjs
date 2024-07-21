import {
  Controller,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('users')
export class UserController {
  @UseGuards(AuthGuard('jwt')) // protect this route with JWT strategy
  @Get('me')
  getMe(@Req() request: Request) {
    return request.user;
  }
}
