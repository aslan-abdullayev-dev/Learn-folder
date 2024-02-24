type Props = {
  promise: Promise<Post[]>
}

export default async function UserPosts({ promise }: Props) {
  let content;
  try {
    const posts = await promise
    content = posts.map((post) => (
      <article key={post.id}>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <br />
      </article>
    ))
  } catch (err) {
    content = <span>error</span>
  }
  return content
}
