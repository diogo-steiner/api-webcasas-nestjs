-- CreateTable
CREATE TABLE "properties_photos" (
    "id" TEXT NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,

    CONSTRAINT "properties_photos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "properties_photos" ADD CONSTRAINT "properties_photos_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;
