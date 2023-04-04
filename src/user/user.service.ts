import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt"

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository:Repository <User>
    ){}
    findAll(){
       
        return this.userRepository.find()
    };
    async findOne(email: string){
        const blogs = await this.userRepository.findOne({where:{email: email}})
        if(! blogs){
            throw new HttpException(`No user with id: ${email}`,HttpStatus.NOT_FOUND)
        }
        return blogs
    };
    async create(CreateUserDto: CreateUserDto){
        const users = this.userRepository.create(CreateUserDto)
        const hashedPassword = await bcrypt.hash(users.password,12)
        users.password = hashedPassword
        return this.userRepository.save(users)
    };
    async isEmailExist(email: string): Promise<boolean> {
        const user = await this.userRepository.findOne({ where:{
            email:email
        } });
        return !!user;
    }
    async update(id:string, updateUserDto: UpdateUserDto){

       const blogs = await this.userRepository.preload({id: +id,
    ...updateUserDto
    })
       if(! blogs){
        throw new NotFoundException(`user with ${id} not found`)
       }
       return this.userRepository.save(blogs)
    };
    // async remove(id:number){
    //     const blogs = await this.findOne(id)
    //     return this.userRepository.remove(blogs)
    // };
    async getUserByEmail(email: string) {
        const user = await this.userRepository. findOne({where:{email}})
        console.log(user)
    }
}


