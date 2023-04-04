import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { dataSourceOptions } from 'db/data-source';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory:()=>(dataSourceOptions)
    }),
    UserModule,
     AuthModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
