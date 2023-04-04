import { Body } from "@nestjs/common";
import { IsString ,IsEmail} from "class-validator";
import * as bcrypt from "bcrypt"

export class CreateUserDto {
    @IsString()
    @IsEmail()
   readonly email: string;
   @IsString()
    password: string;

   async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password, salt);
  }
  
}
