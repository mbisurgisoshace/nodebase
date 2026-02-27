/*
  Warnings:

  - You are about to drop the column `worflowId` on the `connections` table. All the data in the column will be lost.
  - You are about to drop the column `worflowId` on the `nodes` table. All the data in the column will be lost.
  - Added the required column `workflowId` to the `connections` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workflowId` to the `nodes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "connections" DROP CONSTRAINT "connections_worflowId_fkey";

-- DropForeignKey
ALTER TABLE "nodes" DROP CONSTRAINT "nodes_worflowId_fkey";

-- AlterTable
ALTER TABLE "connections" DROP COLUMN "worflowId",
ADD COLUMN     "workflowId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "nodes" DROP COLUMN "worflowId",
ADD COLUMN     "workflowId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "nodes" ADD CONSTRAINT "nodes_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "workflows"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "connections" ADD CONSTRAINT "connections_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "workflows"("id") ON DELETE CASCADE ON UPDATE CASCADE;
