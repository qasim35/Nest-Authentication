import { Controller,Get,Param,Post,Body, HttpCode, HttpStatus, Res, Patch, Delete, Query, ValidationPipe, UseInterceptors, UseGuards, Req, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';


@Controller('user')
export class UserController {
    constructor(
        private readonly usersService : UserService
    ){}
    
    @Get('all') //nasted route to get all blogs
    //get all blogs
    // findAll(@Res()response,@Query()paginationQuery)
    async findAll(){
        
       return this.usersService.findAll()
//         const {limit,offset} = paginationQuery //object destructuring
// response.status(200).send( `All blogs are here limit: ${limit} offset: ${offset}`)
    }
    //get blog by ID
   
    @Get(':id') //nasted route id to get blog with a specfic id
   findOne(@Param('id')id:string){
   console.log(id);
    return this.usersService.findOne(id)
   }
    //create/post a blog
    @UseGuards(AuthGuard)
    @Post()
    //posting a blog using the Body decorator
    // @HttpCode(HttpStatus.GONE) //decorators for specfic http responses
    // create(@Body()body){ //specfing a particular parameter without feild name means the whole body
    //     return body

    // };
    //simple dto (data transfer object) to create blog //only if we dont have a real database
    async create(@Req() req,@Body()CreateUserDto: CreateUserDto){
        //await CreateUserDto.setPassword(CreateUserDto.password)
        //console.log(req.user.role)
        const emailExist = await this.usersService.isEmailExist(CreateUserDto.email);

        if (emailExist) {
          throw new BadRequestException('Email already exists');
        }
        if(req.user.role === 'admin'){

       return this.usersService.create(CreateUserDto) //dto to pass any type of payload
        }else{
            throw new UnauthorizedException('only admin can create users')
        }
    

    }
    //update a blog
    @Patch(':id')
    // update(@Param('id')id:string,@Body()body,@Res()response){
    //  response.status(200).send(`Blog updated successfully with id ${id}`)

    // }
    //parameter based validation pipe only for update route body
    update(@Param('id')id:string,@Body(ValidationPipe)UpdateUserDto: UpdateUserDto){
        return this.usersService.update(id,UpdateUserDto)
    }
    //delete a blog
    // @Delete(':id')
    // // remove(@Param('id')id:string,@Res()response){
    // //     response.status(200).send(`Blog deleted successfully with id ${id}`)

    // // }
    // remove(@Param('id')id:string){
    //     return this.usersService.remove(id)
    // }
}
