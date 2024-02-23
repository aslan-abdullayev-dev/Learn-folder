type Props = {
  promise: Promise<Post[]>
}

export default async function UserPosts({ promise }: Props) {
  const posts = await promise
  console.log("==========================")
  console.log(posts)
  console.log("==========================")

  if (Object.keys(posts).length) {
    const content = posts.map((post) => {
      return (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <br />
        </article>
      )
    })
    return content
  } else {
    const content = <span>error</span>
    return content
  }

}
