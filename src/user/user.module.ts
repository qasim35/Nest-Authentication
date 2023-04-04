import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserService } from './user.service';
//import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';

@Module({
  imports:[TypeOrmModule.forFeature([User])],
    //controllers:[UserController],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule {}
