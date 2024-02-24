import { Suspense, use } from "react"
import { Metadata } from "next"

import getUser from "@/lib/getUser"
import getUserPosts from "@/lib/getUserPosts"
import UserPosts from "./components/UserPosts"

type Params = {
  params: {
    userId: string
  }
}

// * "generateMetadata" is reserved keyword
export async function generateMetadata({ params: { userId } }: Params): Promise<Metadata> {
  const userData: Promise<User> = getUser(userId)
  const user: User = await userData

  return {
    title: user.name,
    description: `This is the name of ${user.name}`
  }
}

export default async function UserPage({ params: { userId } }: Params) {
  //* Fetch data in parallel
  const userData: Promise<User> = getUser(userId)
  const userPostsData: Promise<Post[]> = getUserPosts(userId)

  //* const [user, userPosts] = await Promise.all([userData, userPostsData])

  const user = await userData;

  return (
    <>
      <h2>{user.name}</h2>
      <br />
      {/* using suspense for loading screen of individual component */}
      <Suspense fallback={<h2>Loading ...</h2>}>
        {/* @ts-expect-error Server Component*/}
        <UserPosts promise={userPostsData} />
      </Suspense>
    </>
  )
}
