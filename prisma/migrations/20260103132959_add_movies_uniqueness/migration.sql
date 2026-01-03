/*
  Warnings:

  - A unique constraint covering the columns `[title,releaseYear]` on the table `Movie` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Movie_title_releaseYear_key" ON "Movie"("title", "releaseYear");
