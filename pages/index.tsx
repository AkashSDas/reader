import { collectionGroup, getDocs, limit, orderBy, query, startAfter, Timestamp, where } from "firebase/firestore";
import { useState } from "react";

import Loader from "@components/loader";
import PostFeed from "@components/post-feed";
import { firestore, postToJSON } from "@lib/firebase";

// Max post to query per page
const LIMIT = 1;

export async function getServerSideProps(context) {
  var postQuery = query(
    collectionGroup(firestore, "posts"),
    where("published", "==", true),
    orderBy("createdAt", "desc"),
    limit(LIMIT)
  );

  var posts = (await getDocs(postQuery)).docs.map(postToJSON);

  return {
    props: { posts }, // will be passed to the page component as props
  };
}

function IndexPage(props) {
  var [posts, setPosts] = useState(props.posts);
  var [loading, setLoading] = useState(false);
  var [postsEnd, setPostsEnd] = useState(false);

  async function getMorePosts() {
    setLoading(true);
    var last = posts[posts.length - 1];

    // Since some data is fetched in the server (that will have createdAt as firestore
    // timestamp) and remaining data is fetched in the client (that will have createdAt
    // as number, since we would have already convered them in postToJSON), we need to
    // convert the timestamp to firestore's timestamp format.
    var cursor =
      typeof last.createdAt == "number"
        ? Timestamp.fromMillis(last.createdAt)
        : last.createdAt;
    console.log(cursor);

    var postQuery = query(
      collectionGroup(firestore, "posts"),
      where("published", "==", true),
      orderBy("createdAt", "desc"),
      startAfter(cursor),
      limit(LIMIT)
    );

    var newPosts = (await getDocs(postQuery)).docs.map(postToJSON);
    setPosts(posts.concat(newPosts));
    setLoading(false);
    if (newPosts.length < LIMIT) setPostsEnd(true);
  }

  return (
    <div>
      <PostFeed posts={posts} admin={false} />

      {!loading && !postsEnd && (
        <button onClick={getMorePosts}>Load more</button>
      )}

      {loading && <Loader />}

      {postsEnd && "You have reached the end!"}
    </div>
  );
}

export default IndexPage;
