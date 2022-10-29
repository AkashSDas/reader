import Link from "next/link";

function PostFeed({ posts, admin }) {
  return posts
    ? posts.map((p) => <PostItem post={p} key={p.slug} admin={admin} />)
    : null;
}

function PostItem({ post, admin }) {
  var wordCount = post?.content.trim().split(/\s+/g).length;
  var readTime = (wordCount / 100 + 1).toFixed(0);

  return (
    <div>
      <Link href={`/${post.username}`}>
        <>By @{post.username}</>
      </Link>
      <Link href={`/${post.username}/${post.slug}`}>
        <h1>{post.title}</h1>
      </Link>

      <footer>
        <span>
          {wordCount} words. {readTime} min read
        </span>
        <span>💗 {post.heartCount || 0} Hearts</span>
      </footer>
    </div>
  );
}

export default PostFeed;
