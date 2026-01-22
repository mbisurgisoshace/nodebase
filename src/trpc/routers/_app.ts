import { generateText } from "ai";
import { google } from "@ai-sdk/google";

import prisma from "@/lib/db";
import { inngest } from "@/inngest/client";
import { createTRPCRouter, protectedProcedure } from "../init";

export const appRouter = createTRPCRouter({
  testAi: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "execute/ai",
    });

    return "AI Event Queued";
  }),
  getWorkflows: protectedProcedure.query(() => {
    return prisma.workflow.findMany();
  }),
  createWorkflow: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "execute/ai",
    });

    // return prisma.workflow.create({
    //   data: {
    //     name: "Test Workflow",
    //   },
    // });
    return "Workflow Creation Queued";
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
