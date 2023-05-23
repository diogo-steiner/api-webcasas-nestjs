import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Param,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreatePropertyDto } from './dto/create-property.dto';
import { PropertiesService } from './properties.service';
import { multerOptions } from 'src/multer';

@Controller('/properties')
@UseInterceptors(ClassSerializerInterceptor)
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
}
