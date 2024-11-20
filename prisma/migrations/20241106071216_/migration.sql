/*
  Warnings:

  - You are about to drop the column `food_id` on the `Preference` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Preference` table. All the data in the column will be lost.
  - You are about to drop the column `inactivatedate` on the `Users` table. All the data in the column will be lost.
  - You are about to alter the column `phonenum` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(15)` to `Int`.
  - Added the required column `foodId` to the `Preference` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Preference` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Preference` DROP FOREIGN KEY `Preference_food_id_fkey`;

-- DropForeignKey
ALTER TABLE `Preference` DROP FOREIGN KEY `Preference_user_id_fkey`;

-- AlterTable
ALTER TABLE `Preference` DROP COLUMN `food_id`,
    DROP COLUMN `user_id`,
    ADD COLUMN `foodId` INTEGER NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Users` DROP COLUMN `inactivatedate`,
    MODIFY `email` VARCHAR(191) NULL,
    MODIFY `gender` VARCHAR(10) NULL,
    MODIFY `birth` DATETIME(3) NULL,
    MODIFY `address` VARCHAR(50) NULL,
    MODIFY `point` INTEGER NULL DEFAULT 0,
    MODIFY `phonenum` INTEGER NULL,
    MODIFY `status` BOOLEAN NULL DEFAULT false;

-- CreateTable
CREATE TABLE `Images` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Regions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Stores` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `regionId` INTEGER NULL,
    `address` VARCHAR(50) NULL,
    `description` VARCHAR(191) NULL,
    `type` VARCHAR(50) NULL,
    `evaluation` INTEGER NULL,

    INDEX `Stores_regionId_idx`(`regionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Missions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `storeId` INTEGER NULL,
    `name` VARCHAR(50) NOT NULL,
    `description` VARCHAR(191) NULL,
    `award` VARCHAR(191) NULL,
    `awardPoint` INTEGER NULL,

    INDEX `Missions_storeId_idx`(`storeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StoreImg` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `storeId` INTEGER NULL,
    `pictureId` INTEGER NULL,

    INDEX `StoreImg_storeId_idx`(`storeId`),
    INDEX `StoreImg_pictureId_idx`(`pictureId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Inquire` (
    `inquireId` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NULL,
    `inquireTitle` VARCHAR(50) NOT NULL,
    `inquireText` VARCHAR(191) NULL,
    `date` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` INTEGER NULL,
    `pictureId` INTEGER NULL,

    INDEX `Inquire_userId_idx`(`userId`),
    INDEX `Inquire_pictureId_idx`(`pictureId`),
    PRIMARY KEY (`inquireId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reviews` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NULL,
    `missionId` INTEGER NULL,
    `storeId` INTEGER NULL,
    `content` VARCHAR(191) NULL,
    `rating` INTEGER NULL,
    `date` DATETIME(3) NULL,

    INDEX `Reviews_userId_idx`(`userId`),
    INDEX `Reviews_missionId_idx`(`missionId`),
    INDEX `Reviews_storeId_idx`(`storeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AcceptedMission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NULL,
    `missionId` INTEGER NULL,
    `reviewId` INTEGER NULL,
    `state` BOOLEAN NULL,
    `dday` DATETIME(3) NULL,

    INDEX `AcceptedMission_userId_idx`(`userId`),
    INDEX `AcceptedMission_missionId_idx`(`missionId`),
    INDEX `AcceptedMission_reviewId_idx`(`reviewId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reviewId` INTEGER NULL,
    `content` VARCHAR(191) NULL,

    INDEX `Comment_reviewId_idx`(`reviewId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReviewImg` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reviewId` INTEGER NULL,
    `imgId` INTEGER NULL,

    INDEX `ReviewImg_reviewId_idx`(`reviewId`),
    INDEX `ReviewImg_imgId_idx`(`imgId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserRegion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NULL,
    `regionId` INTEGER NULL,
    `point` INTEGER NULL DEFAULT 0,

    INDEX `UserRegion_userId_idx`(`userId`),
    INDEX `UserRegion_regionId_idx`(`regionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Preference_userId_idx` ON `Preference`(`userId`);

-- CreateIndex
CREATE INDEX `Preference_foodId_idx` ON `Preference`(`foodId`);

-- AddForeignKey
ALTER TABLE `Stores` ADD CONSTRAINT `Stores_regionId_fkey` FOREIGN KEY (`regionId`) REFERENCES `Regions`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Missions` ADD CONSTRAINT `Missions_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Stores`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StoreImg` ADD CONSTRAINT `StoreImg_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Stores`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StoreImg` ADD CONSTRAINT `StoreImg_pictureId_fkey` FOREIGN KEY (`pictureId`) REFERENCES `Images`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inquire` ADD CONSTRAINT `Inquire_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inquire` ADD CONSTRAINT `Inquire_pictureId_fkey` FOREIGN KEY (`pictureId`) REFERENCES `Images`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Preference` ADD CONSTRAINT `Preference_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Preference` ADD CONSTRAINT `Preference_foodId_fkey` FOREIGN KEY (`foodId`) REFERENCES `Foods`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reviews` ADD CONSTRAINT `Reviews_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reviews` ADD CONSTRAINT `Reviews_missionId_fkey` FOREIGN KEY (`missionId`) REFERENCES `Missions`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reviews` ADD CONSTRAINT `Reviews_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Stores`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AcceptedMission` ADD CONSTRAINT `AcceptedMission_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AcceptedMission` ADD CONSTRAINT `AcceptedMission_missionId_fkey` FOREIGN KEY (`missionId`) REFERENCES `Missions`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AcceptedMission` ADD CONSTRAINT `AcceptedMission_reviewId_fkey` FOREIGN KEY (`reviewId`) REFERENCES `Reviews`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_reviewId_fkey` FOREIGN KEY (`reviewId`) REFERENCES `Reviews`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReviewImg` ADD CONSTRAINT `ReviewImg_reviewId_fkey` FOREIGN KEY (`reviewId`) REFERENCES `Reviews`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReviewImg` ADD CONSTRAINT `ReviewImg_imgId_fkey` FOREIGN KEY (`imgId`) REFERENCES `Images`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRegion` ADD CONSTRAINT `UserRegion_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRegion` ADD CONSTRAINT `UserRegion_regionId_fkey` FOREIGN KEY (`regionId`) REFERENCES `Regions`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `Users` RENAME INDEX `email` TO `Users_email_key`;
