import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const users = await this.prisma.user.create({
      data : {
        username : createUserDto.username,
        email : createUserDto.email,
        password : createUserDto.password,
        role : createUserDto.role,
      }
    })
    return users
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
    const users = await this.prisma.user.update({
      where : {
        id : Number(id)
      },
        data : {
        username : updateUserDto.username,
        email : updateUserDto.email,
        password : updateUserDto.password,
        role : updateUserDto.role,
      }
    })
    return users
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
