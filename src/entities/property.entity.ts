import { Exclude, Transform } from 'class-transformer';
import { PropertyPhotos } from './propertyPhotos.entity';
import { UserEntity } from './user.entity';

export class PropertyEntity {
  id: string;
  title: string;
  description: string;
  numberRooms: number;
  numberBathrooms: number;
  numberGarage: number;
  propertyType: string;
  isSale: boolean;
  isInCondo: boolean;
  hasPoolProperty: boolean;
  hasAirConditioningProperty: boolean;
  hasGrillProperty: boolean;
  hasFurnitureProperty: boolean;
  hasPoolCondo: boolean;
  hasSecurity24hCondo: boolean;
  hasGymCondo: boolean;
  hasPartyHallCondo: boolean;

  price: string;
  priceCondo: string;

  isCondoPriceIncluded: boolean;
  state: string;
  city: string;
  isDisplayContact: boolean;

  @Transform(({ value, key, obj }) => {
    if (obj.isDisplayContact) {
      delete obj[key];
      return;
    }
    return;
  })
  contact: string;

  isActive: boolean;
  viewsCounter: number;
  updatedAt: Date;
  createdAt: Date;

  @Transform(({ value }) =>
    value.map((photo) => {
      delete photo['propertyId'];
      return photo;
    }),
  )
  PropertyPhotos: PropertyPhotos[];

  @Exclude()
  ownerId: string;

  @Transform(({ value }) => new UserEntity(value))
  owner?: UserEntity;

  constructor(partial: Partial<PropertyEntity>) {
    Object.assign(this, partial);
  }
}
