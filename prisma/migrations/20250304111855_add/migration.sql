/*
  Warnings:

  - You are about to drop the column `pos` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `pos` on the `User` table. All the data in the column will be lost.
  - Added the required column `lat` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `long` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lat` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `long` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "pos",
ADD COLUMN     "lat" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "long" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "pos",
ADD COLUMN     "lat" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "long" DECIMAL(65,30) NOT NULL;
