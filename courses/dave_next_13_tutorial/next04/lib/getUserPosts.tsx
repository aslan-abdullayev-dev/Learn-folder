export default async function getUserPosts(id: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/?userId=${id}`
    // , { next: { revalidate: 60 } }
  )

  if (!res.ok) throw new Error("failed to fetch users")
  return res.json()
}

//* { cache: "force-cache" } -> request data only once and cache it (default option).
//* { cache: "no-store" } -> request data every time. No cache and deduplication.