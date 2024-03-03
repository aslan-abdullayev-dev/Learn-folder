export default async function getAllUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", { next: { revalidate: 0 } })
  if (!res.ok) throw new Error("failed to fetch user posts")

  return res.json()
}
