import { Injectable } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { PrismaClient } from '@prisma/client';
import { PropertyEntity } from 'src/entities/property.entity';

const prisma = new PrismaClient();

@Injectable()
export class PropertiesService {
  async create(dataProperty: CreatePropertyDto, userId: string) {
    const owner = await prisma.user.findUnique({ where: { id: userId } });

    const newProperty = await prisma.property.create({
      data: { ...dataProperty, ownerId: owner.id },
    });

    return new PropertyEntity(newProperty);
  }
}
