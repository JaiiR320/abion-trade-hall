import { HydrateClient } from "@/trpc/server";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { SellOrderForm } from "../_components/sellOrderForm";

export default async function Search() {
  const session = await auth();
  if (!session?.user) {
    redirect("/api/auth/signin");
  }
  return (
    <HydrateClient>
      <main className="bg-base-300 flex min-h-screen flex-col items-center text-white">
        <div className="container flex flex-col items-center gap-12 px-4 py-16">
          <SellOrderForm />
        </div>
      </main>
    </HydrateClient>
  );
}
