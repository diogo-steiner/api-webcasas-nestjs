import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreatePropertyDto } from './dto/create-property.dto';
import { PropertiesService } from './properties.service';
import { multerOptions } from 'src/multer';

@Controller('/properties')
// @UseInterceptors(ClassSerializerInterceptor)
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post()
  async create(@Body() dataProperty: CreatePropertyDto, @Req() req: Request) {
    return this.propertiesService.create(dataProperty, req.user.id);
  }

  @Post('/photos/:propertyId')
  @UseInterceptors(FilesInterceptor('photo', 4, multerOptions))
  async uploadPhotos(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param('propertyId') propertyId: string,
  ) {
    return this.propertiesService.uploadPhotos(files, propertyId);
  }

  @Patch('/deactivate/:propertyId')
  @HttpCode(204)
  async deactivateProperty(
    @Param('propertyId') propertyId: string,
    @Req() req: Request,
  ) {
    return this.propertiesService.deactivateProperty(propertyId, req.user.id);
  }

  @Patch('/activate/:propertyId')
  @HttpCode(204)
  async activateProperty(
    @Param('propertyId') propertyId: string,
    @Req() req: Request,
  ) {
    return this.propertiesService.activateProperty(propertyId, req.user.id);
  }

  @Delete('/:propertyId')
  @HttpCode(204)
  async delete(@Param('propertyId') propertyId: string, @Req() req: Request) {
    return this.propertiesService.delete(propertyId, req.user.id);
  }

  @Get()
  async getAll() {
    return await this.propertiesService.getAll();
  }

  @Get('/inHight')
  async getAllInHight() {
    return this.propertiesService.getAllInHight();
  }

  @Get('/:propertyId')
  async getById(@Param('propertyId') propertyId: string) {
    return this.propertiesService.getById(propertyId);
  }
}
