/*
  Warnings:

  - Added the required column `order` to the `links` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "links" ADD COLUMN     "order" INTEGER NOT NULL;
