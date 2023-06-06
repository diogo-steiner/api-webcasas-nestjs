import { Exclude, Transform } from 'class-transformer';

export class PropertyPhotos {
  id: string;
  photoUrl: string;

  @Exclude()
  propertyId: string;

  constructor(partial: Partial<PropertyPhotos[]>) {
    Object.assign(this, partial);
  }
}
