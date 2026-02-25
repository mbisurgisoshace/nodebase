/*
  Warnings:

  - You are about to drop the `Workflow` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "NodeType" AS ENUM ('INITIAL');

-- DropForeignKey
ALTER TABLE "Workflow" DROP CONSTRAINT "Workflow_userId_fkey";

-- DropTable
DROP TABLE "Workflow";

-- CreateTable
CREATE TABLE "workflows" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workflows_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nodes" (
    "id" TEXT NOT NULL,
    "worflowId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "NodeType" NOT NULL,
    "position" JSONB NOT NULL,
    "data" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "nodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "connections" (
    "id" TEXT NOT NULL,
    "worflowId" TEXT NOT NULL,
    "fromNodeId" TEXT NOT NULL,
    "toNodeId" TEXT NOT NULL,
    "fromOutput" TEXT NOT NULL DEFAULT 'main',
    "toInput" TEXT NOT NULL DEFAULT 'main',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "connections_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "connections_fromNodeId_toNodeId_fromOutput_toInput_key" ON "connections"("fromNodeId", "toNodeId", "fromOutput", "toInput");

-- AddForeignKey
ALTER TABLE "workflows" ADD CONSTRAINT "workflows_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nodes" ADD CONSTRAINT "nodes_worflowId_fkey" FOREIGN KEY ("worflowId") REFERENCES "workflows"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "connections" ADD CONSTRAINT "connections_worflowId_fkey" FOREIGN KEY ("worflowId") REFERENCES "workflows"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "connections" ADD CONSTRAINT "connections_fromNodeId_fkey" FOREIGN KEY ("fromNodeId") REFERENCES "nodes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "connections" ADD CONSTRAINT "connections_toNodeId_fkey" FOREIGN KEY ("toNodeId") REFERENCES "nodes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
