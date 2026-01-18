import prisma from "@/lib/db";
import { caller } from "@/trpc/server";
import Image from "next/image";

export default async function Home() {
  const users = await caller.getUsers();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-4xl font-bold">Welcome to Nodebase!</h1>
      {JSON.stringify(users)}
    </div>
  );
}
