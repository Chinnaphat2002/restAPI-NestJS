import { PrismaService } from './../prisma.service';
import { User } from './entities/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { FORBIDDEN_MESSAGE } from '@nestjs/core/guards';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const saltRounds = 10
    const hash = await bcrypt.hashSync(createUserDto.password, saltRounds);
    const isUser = await this.prisma.user.findFirst({
      where: {
        username : createUserDto.username
      }
      
    })
    if(isUser){
      throw new HttpException('Username already exit', HttpStatus.FORBIDDEN)
    }else{
      const users = await this.prisma.user.create({
        data : {
          username : createUserDto.username,
          email : createUserDto.email,
          password : hash,
          role : createUserDto.role,
        }
      })
      return users
    }

    
  }

  async findAll() {
    return await this.prisma.user.findMany()
  }

  async findOne(id: number) {
    const users = await this.prisma.user.findFirst({
      where : {
        id : Number (id)
      }
    })
    return users
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
    const saltRounds = 10
    const hash = await bcrypt.hashSync(updateUserDto.password, saltRounds);
    const isUser = await this.prisma.user.findFirst({
      where :{
        username: updateUserDto.username
      }
    })
    if(isUser){
      const matchPassword = await bcrypt.compareSync(
        updateUserDto.passwordOld,
        isUser.password,
      )
      if(matchPassword){
        const users = await this.prisma.user.update({
          where : {
            id : Number(id)
          },
            data : {
            username : updateUserDto.username,
            email : updateUserDto.email,
            password : hash,
            role : updateUserDto.role,
          }
        })
        return users
      }else{
        throw new HttpException('Password Not Match',HttpStatus.FORBIDDEN)
      }
      
    }else{
      throw new HttpException('User not found',HttpStatus.FORBIDDEN )
    }

    
  }

  async remove(id: number) {
    const users = await this.prisma.user.delete({
      where :{
        id: Number(id)
      }
    })
    return users
  }
}
