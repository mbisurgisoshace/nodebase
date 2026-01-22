import prisma from "@/lib/db";
import { createTRPCRouter, protectedProcedure } from "../init";
import { inngest } from "@/inngest/client";
import { email } from "zod";

export const appRouter = createTRPCRouter({
  getWorkflows: protectedProcedure.query(() => {
    return prisma.workflow.findMany();
  }),
  createWorkflow: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "test/hello.world",
      data: {
        email: "maximiliano.bisurgi@gmail.com",
      },
    });

    return prisma.workflow.create({
      data: {
        name: "Test Workflow",
      },
    });
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
