-- AlterTable
ALTER TABLE "User" ALTER COLUMN "tgId" SET DATA TYPE TEXT;

-- CreateIndex
CREATE INDEX "User_tgId_idx" ON "User"("tgId");
