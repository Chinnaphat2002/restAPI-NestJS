import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const product = await this.prisma.product.create({
      data: {
        name: createProductDto.name,
        price: createProductDto.price,
      },
    })
    return product;
  }

  async findAll() {
    return  await this.prisma.product.findMany()
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findFirst(
      {
        where : {
          id : Number(id)
        }
      }
    )
    return product
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.prisma.product.update({
      where : {
        id : Number(id),
      },
      data : {
        name : updateProductDto.name,
        price : updateProductDto.price,
      }
    })
    return product
  }

  async remove(id: number) {
    const product = await this.prisma.product.delete({
      where : {
        id : Number(id),
      }
    })
    return product
  }
}
