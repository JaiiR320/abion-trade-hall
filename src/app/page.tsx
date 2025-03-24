import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import { SellOrder } from "./_components/sellOrder";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    void api.sellOrder.get.prefetch();
  }

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-base-100 text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          {session?.user && <SellOrder />}
        </div>
      </main>
    </HydrateClient>
  );
}
