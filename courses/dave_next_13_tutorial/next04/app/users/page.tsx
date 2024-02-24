import getAllUsers from "@/lib/getAllUsers"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Users Page",
}

export default async function UsersPage() {
  const usersData: Promise<User[]> = getAllUsers()
  const users = await usersData

  const content = (
    <section>
      <h2>
        <Link href="/">Back to Home</Link>
      </h2>
      {users.map((user) => {
        return <>
          <p key={user.id}>
            <Link href={`/users/${user.id}`}>{user.name}</Link>
          </p>
        </>
      })}
    </section>
  )

  return content
}
