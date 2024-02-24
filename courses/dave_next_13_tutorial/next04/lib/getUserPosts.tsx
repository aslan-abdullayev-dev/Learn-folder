export default async function getUserPosts(id: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/?userId=${id}`)

  if (!res.ok) throw new Error("failed to fetch users")
  return res.json()
}
