import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import { SellOrder } from "./_components/sellOrder";
import { SellOrderForm } from "./_components/sellOrderForm";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    void api.sellOrder.get.prefetch();
  }

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center bg-base-300 text-white">
        <div className="container flex flex-col items-center gap-12 px-4 py-16">
          <SellOrder/>
          {session?.user && <SellOrderForm />}
        </div>
      </main>
    </HydrateClient>
  );
}

