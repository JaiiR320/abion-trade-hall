import { auth } from "@/server/auth";
import Link from "next/link";
import Image from "next/image";

export async function Navbar() {
  const session = await auth();

  if (session?.user) {
  }
  return (
    <div className="navbar bg-primary text-primary-content">
      <div className="flex flex-1 flex-row justify-between pr-5 pl-5 text-3xl font-bold">
        <Link href="/" className="btn btn-ghost text-3xl">
          Albion Trade Hall
        </Link>
        <div className="flex flex-row gap-2">
          <Link href="/sell" className="btn btn-accent">
            Sell
          </Link>
          <Link href="/search" className="btn btn-accent">
            Search
          </Link>
          {session?.user.name ? (
            <Link href="/profile" className="w-10 rounded-full">
              <Image src={session?.user.image ?? ""} alt="user" />
            </Link>
          ) : (
            <Link href="/api/auth/signin">Login</Link>
          )}
        </div>
      </div>
    </div>
  );
}
