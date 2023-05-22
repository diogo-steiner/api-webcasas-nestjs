import { Decimal } from '@prisma/client/runtime/binary';
import { Exclude, Transform } from 'class-transformer';

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

  @Transform(({ value }) => value.d[0])
  price: Decimal;

  @Transform(({ value }) => {
    if (value) {
      return value.d[0];
    }
  })
  priceCondo: Decimal;

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

  @Exclude()
  ownerId: string;

  constructor(partial: Partial<PropertyEntity>) {
    Object.assign(this, partial);
  }
}
