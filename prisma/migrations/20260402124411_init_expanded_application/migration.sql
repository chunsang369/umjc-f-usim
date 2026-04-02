-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "planId" TEXT NOT NULL,
    "planName" TEXT NOT NULL,
    "monthlyPrice" TEXT NOT NULL,
    "verificationType" TEXT NOT NULL,
    "identityName" TEXT NOT NULL,
    "identityNumber" TEXT NOT NULL,
    "visaType" TEXT,
    "contactNumber" TEXT,
    "arcFrontFile" TEXT,
    "mugshotFile" TEXT,
    "passportFile" TEXT,
    "entryProofFile" TEXT,
    "deliveryMethod" TEXT NOT NULL,
    "phoneModel" TEXT,
    "imei1" TEXT,
    "imei2" TEXT,
    "eid" TEXT,
    "deliveryAddress" TEXT,
    "deliveryPhone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
