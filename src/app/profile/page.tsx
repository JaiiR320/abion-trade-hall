import { HydrateClient } from "@/trpc/server"

export function ProfilePage() {
  return (
    <div>
      <h1>Profile</h1>
      <a href="/api/auth/signout" className="btn btn-error">
        Logout
      </a>
    </div>
  )
}

export default async function Profile() {
  return (
    <HydrateClient>
      <ProfilePage />
    </HydrateClient>
  )   
}