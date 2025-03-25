import { HydrateClient } from "@/trpc/server";
import Link from "next/link";

function ProfilePage() {
  return (
    <div>
      <h1>Profile</h1>
      <Link href="/api/auth/signout" className="btn btn-error">
        Logout
      </Link>
    </div>
  );
}

export default async function Profile() {
  return (
    <HydrateClient>
      <ProfilePage />
    </HydrateClient>
  );
}
