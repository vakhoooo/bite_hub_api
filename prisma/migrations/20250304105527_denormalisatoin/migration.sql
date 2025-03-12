/*
  Warnings:

  - You are about to drop the `Config` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Meal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Restaurant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RestaurantContact` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RestaurantRating` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RestaurantSetting` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RestaurantType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserContact` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_RestaurantToRestaurantType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Meal" DROP CONSTRAINT "Meal_restaurantId_fkey";

-- DropForeignKey
ALTER TABLE "Restaurant" DROP CONSTRAINT "Restaurant_userId_fkey";

-- DropForeignKey
ALTER TABLE "RestaurantContact" DROP CONSTRAINT "RestaurantContact_restaurantId_fkey";

-- DropForeignKey
ALTER TABLE "RestaurantRating" DROP CONSTRAINT "RestaurantRating_restaurantId_fkey";

-- DropForeignKey
ALTER TABLE "RestaurantSetting" DROP CONSTRAINT "RestaurantSetting_restaurantId_fkey";

-- DropForeignKey
ALTER TABLE "UserContact" DROP CONSTRAINT "UserContact_userId_fkey";

-- DropForeignKey
ALTER TABLE "_RestaurantToRestaurantType" DROP CONSTRAINT "_RestaurantToRestaurantType_A_fkey";

-- DropForeignKey
ALTER TABLE "_RestaurantToRestaurantType" DROP CONSTRAINT "_RestaurantToRestaurantType_B_fkey";

-- DropTable
DROP TABLE "Config";

-- DropTable
DROP TABLE "Meal";

-- DropTable
DROP TABLE "Restaurant";

-- DropTable
DROP TABLE "RestaurantContact";

-- DropTable
DROP TABLE "RestaurantRating";

-- DropTable
DROP TABLE "RestaurantSetting";

-- DropTable
DROP TABLE "RestaurantType";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "UserContact";

-- DropTable
DROP TABLE "_RestaurantToRestaurantType";
