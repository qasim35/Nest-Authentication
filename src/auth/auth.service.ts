console.log("This is the service")
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt"

@Injectable()

export class AuthService {
    
    constructor(private usersService: UserService,
      private jwtService: JwtService
      ) {}

      async signIn(email, pass) {
        const user = await this.usersService.findOne(email);
        
        const comparePasswords =  bcrypt.compare(user.password,pass)
        console.log(comparePasswords)
        if (!comparePasswords) {
          throw new UnauthorizedException();
        }
        const payload = { email: user.email,role:user.role};
        console.log(payload,'this is the payload')
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      }
}
