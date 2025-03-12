-- AlterTable
ALTER TABLE "RestaurantSetting" ADD COLUMN     "isBlocked" BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE INDEX "RestaurantContact_city_idx" ON "RestaurantContact"("city");
