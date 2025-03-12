-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'RESTAURANT_OWNER', 'ADMIN', 'MODERATOR');

-- CREATE EXTENSION IF NOT EXISTS postgis;

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "tgId" BIGINT NOT NULL,
    "userName" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserContact" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "city" TEXT,
    "addRess" TEXT,
    "phoneNumber" TEXT,

    CONSTRAINT "UserContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Restaurant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "introImageUrl" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RestaurantContact" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "phoneNumber" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "ownerFullname" TEXT NOT NULL,
    "pickUpAddress" TEXT,
    "restaurantId" INTEGER NOT NULL,

    CONSTRAINT "RestaurantContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RestaurantSetting" (
    "id" SERIAL NOT NULL,
    "isOpen" BOOLEAN NOT NULL DEFAULT false,
    "isCashAcceptable" BOOLEAN NOT NULL DEFAULT false,
    "restaurantId" INTEGER NOT NULL,

    CONSTRAINT "RestaurantSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RestaurantType" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "RestaurantType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RestaurantRating" (
    "id" SERIAL NOT NULL,
    "restaurantId" INTEGER NOT NULL,
    "estimate" INTEGER NOT NULL,

    CONSTRAINT "RestaurantRating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meal" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "imageUrl" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL DEFAULT 0.00,
    "isHalal" BOOLEAN NOT NULL DEFAULT false,
    "spicyLevel" INTEGER,
    "isAllergic" BOOLEAN NOT NULL DEFAULT false,
    "restaurantId" INTEGER NOT NULL,
    "weight" DECIMAL(65,30) NOT NULL,
    "ingredients" TEXT[],
    "prepApproxTime" INTEGER NOT NULL,

    CONSTRAINT "Meal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RestaurantToRestaurantType" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_RestaurantToRestaurantType_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_tgId_key" ON "User"("tgId");

-- CreateIndex
CREATE UNIQUE INDEX "UserContact_userId_key" ON "UserContact"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserContact_phoneNumber_key" ON "UserContact"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_name_key" ON "Restaurant"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_userId_key" ON "Restaurant"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "RestaurantContact_email_key" ON "RestaurantContact"("email");

-- CreateIndex
CREATE UNIQUE INDEX "RestaurantContact_phoneNumber_key" ON "RestaurantContact"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "RestaurantContact_restaurantId_key" ON "RestaurantContact"("restaurantId");

-- CreateIndex
CREATE UNIQUE INDEX "RestaurantSetting_restaurantId_key" ON "RestaurantSetting"("restaurantId");

-- CreateIndex
CREATE UNIQUE INDEX "RestaurantType_type_key" ON "RestaurantType"("type");

-- CreateIndex
CREATE UNIQUE INDEX "RestaurantRating_restaurantId_key" ON "RestaurantRating"("restaurantId");

-- CreateIndex
CREATE INDEX "_RestaurantToRestaurantType_B_index" ON "_RestaurantToRestaurantType"("B");

-- AddForeignKey
ALTER TABLE "UserContact" ADD CONSTRAINT "UserContact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Restaurant" ADD CONSTRAINT "Restaurant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RestaurantContact" ADD CONSTRAINT "RestaurantContact_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RestaurantSetting" ADD CONSTRAINT "RestaurantSetting_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RestaurantRating" ADD CONSTRAINT "RestaurantRating_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RestaurantToRestaurantType" ADD CONSTRAINT "_RestaurantToRestaurantType_A_fkey" FOREIGN KEY ("A") REFERENCES "Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RestaurantToRestaurantType" ADD CONSTRAINT "_RestaurantToRestaurantType_B_fkey" FOREIGN KEY ("B") REFERENCES "RestaurantType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
