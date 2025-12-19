-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "company" TEXT,
    "channel" TEXT NOT NULL,
    "offer" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'LEAD',
    "lastActionAt" DATETIME,
    "nextActionAt" DATETIME,
    "notes" TEXT,
    "owner" TEXT NOT NULL DEFAULT 'Wann',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE INDEX "Lead_status_idx" ON "Lead"("status");

-- CreateIndex
CREATE INDEX "Lead_nextActionAt_idx" ON "Lead"("nextActionAt");

-- CreateIndex
CREATE INDEX "Lead_name_idx" ON "Lead"("name");

-- CreateIndex
CREATE INDEX "Lead_company_idx" ON "Lead"("company");
