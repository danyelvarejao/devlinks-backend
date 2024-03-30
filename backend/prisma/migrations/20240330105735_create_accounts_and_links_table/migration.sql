-- CreateEnum
CREATE TYPE "Platform" AS ENUM ('GITHUB', 'FRONTENDMENTOR', 'TWITTER', 'LINKEDIN', 'YOUTUBE', 'FACEBOOK', 'TWITCH', 'DEVTO', 'CODEWARS', 'CODEPEN', 'FREECODECAMP', 'GITLAB', 'HASHNODE', 'STACKOVERFLOW');

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "image" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "links" (
    "id" TEXT NOT NULL,
    "platform" "Platform" NOT NULL,
    "link" TEXT NOT NULL,
    "account_id" TEXT NOT NULL,

    CONSTRAINT "links_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_email_key" ON "accounts"("email");

-- AddForeignKey
ALTER TABLE "links" ADD CONSTRAINT "links_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
