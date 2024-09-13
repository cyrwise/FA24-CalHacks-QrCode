-- CreateTable
CREATE TABLE "Badge" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fullName" TEXT NOT NULL,
    "university" TEXT NOT NULL,
    "major" TEXT NOT NULL,
    "graduationDate" DATETIME NOT NULL,
    "github" TEXT NOT NULL,
    "qrCodeUrl" TEXT NOT NULL,
    "profileId" INTEGER NOT NULL,
    CONSTRAINT "Badge_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fullName" TEXT NOT NULL,
    "university" TEXT NOT NULL,
    "major" TEXT NOT NULL,
    "graduationDate" DATETIME NOT NULL,
    "github" TEXT NOT NULL,
    "projects" TEXT,
    "skills" TEXT,
    "interests" TEXT
);
