import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

// By declaring the type of the request body in a DTO class, NestJS will automatically validate the request body against the rules defined in the DTO class.
export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
