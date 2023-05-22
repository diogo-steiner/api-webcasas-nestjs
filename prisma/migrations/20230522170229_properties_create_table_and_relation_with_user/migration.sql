-- CreateTable
CREATE TABLE "properties" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(72) NOT NULL,
    "description" VARCHAR(900) NOT NULL,
    "numberRooms" SMALLINT NOT NULL,
    "numberBathrooms" SMALLINT NOT NULL,
    "numberGarage" SMALLINT NOT NULL,
    "propertyType" VARCHAR(16) NOT NULL,
    "isSale" BOOLEAN NOT NULL DEFAULT true,
    "isInCondo" BOOLEAN NOT NULL DEFAULT false,
    "hasPoolProperty" BOOLEAN NOT NULL DEFAULT false,
    "hasAirConditioningProperty" BOOLEAN NOT NULL DEFAULT false,
    "hasGrillProperty" BOOLEAN NOT NULL DEFAULT false,
    "hasFurnitureProperty" BOOLEAN NOT NULL DEFAULT false,
    "hasPoolCondo" BOOLEAN NOT NULL DEFAULT false,
    "hasSecurity24hCondo" BOOLEAN NOT NULL DEFAULT false,
    "hasGymCondo" BOOLEAN NOT NULL DEFAULT false,
    "hasPartyHallCondo" BOOLEAN NOT NULL DEFAULT false,
    "price" DECIMAL(12,2) NOT NULL,
    "priceCondo" DECIMAL(12,2),
    "isCondoPriceIncluded" BOOLEAN NOT NULL DEFAULT false,
    "state" VARCHAR(26) NOT NULL,
    "city" VARCHAR(26) NOT NULL,
    "contact" VARCHAR(11) NOT NULL,
    "isDisplayContact" BOOLEAN NOT NULL DEFAULT true,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "viewsCounter" SMALLINT NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "properties_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
