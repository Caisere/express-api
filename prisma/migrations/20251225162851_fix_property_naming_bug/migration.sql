/*
  Warnings:

  - You are about to drop the column `createAt` on the `User` table. All the data in the column will be lost.
  - The `status` column on the `WatchlistItem` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "WatchlistStatus" AS ENUM ('PLANNED', 'WATCHING', 'COMPLETED', 'DROPPED');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "WatchlistItem" DROP COLUMN "status",
ADD COLUMN     "status" "WatchlistStatus" NOT NULL DEFAULT 'PLANNED';

-- DropEnum
DROP TYPE "WashlistStatus";
