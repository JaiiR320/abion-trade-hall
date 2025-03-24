import { auth } from "@/server/auth";
import Link from "next/link";

export async function Navbar() {
  const session = await auth();

  if (session?.user) {
  }
  return (
    <div className="navbar bg-primary text-primary-content">
      <div className="flex-1 flex flex-row pl-5 pr-5 justify-between text-3xl font-bold">
        <Link href="/">
          Albion Trade Hall
        </Link>
        {session?.user.name ?  ( 
        <div className="w-10 rounded-full">
          <img src={session?.user.image ?? ""} alt="user" />
        </div> 
        ) : (
          <Link href="/api/auth/signin">
            Login
          </Link>
        )}        
      </div>
    </div>
  );
}
