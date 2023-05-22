import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { Request } from 'express';
import { PropertiesService } from './properties.service';

@Controller('/properties')
@UseInterceptors(ClassSerializerInterceptor)
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post()
  async create(@Body() dataProperty: CreatePropertyDto, @Req() req: Request) {
    return this.propertiesService.create(dataProperty, req.user.id);
  }
}
