import Link from "next/link";
import { useContext } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import AuthCheck from "../../components/AuthCheck";
import HeartButton from "../../components/HeartButton";
import Metatags from "../../components/Metatags";
import PostContent from "../../components/PostContent";
import { UserContext } from "../../lib/context";
import { firestore, getUserWithUsername, postToJSON } from "../../lib/firebase";
import styles from "../../styles/Post.module.css";

export async function getStaticProps({ params }) {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);

  let post;
  let path;

  if (userDoc) {
    const postRef = userDoc.ref.collection("posts").doc(slug);
    post = postToJSON(await postRef.get());

    path = postRef.path;
  }

  return {
    props: { post, path },
    revalidate: 100,
  };
}

export async function getStaticPaths() {
  // Improve my using Admin SDK to select empty docs
  const snapshot = await firestore.collectionGroup("posts").get();

  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data();
    return {
      params: { username, slug },
    };
  });

  return {
    // must be in this format:
    // paths: [
    //   { params: { username, slug }}
    // ],
    paths,
    fallback: "blocking",

    // Here we're going to work with dynamic data, so how would next js re-run
    // this func each time a new post is created. So in traditional static
    // generation next js won't have a way to know when we added a new post and
    // it will by default fallback to 404 error (page not found), however adding
    // a fallback value of "blocking" can slove this issue. When a user navigates to
    // a page that isn't rendered, it tells next js to fallback to regular server side
    // rendering and once it renders the page then it will be cached on a CDN like all
    // the other pages. This is great, as normally we had to re-build and re-deploy the
    // entire site with regular static generation and that is inefficient if you have
    // big site with a lot of content
  };
}

export default function Post(props) {
  const postRef = firestore.doc(props.path);
  const [realtimePost] = useDocumentData(postRef);

  // Here in the UI we don't care about the datasource
  // it might be server side rendered (props.post) or
  // realtime post (realtimePost)
  const post = realtimePost || props.post;

  const { user: currentUser } = useContext(UserContext);

  return (
    <main className={styles.container}>
      <Metatags title={post.title} description={post.title} />

      <section>
        <PostContent post={post} />
      </section>

      <aside className="card">
        <p>
          <strong>{post.heartCount || 0} 🤍</strong>
        </p>

        <AuthCheck
          fallback={
            <Link href="/enter">
              <button>💗 Sign Up</button>
            </Link>
          }
        >
          <HeartButton postRef={postRef} />
        </AuthCheck>

        {currentUser?.uid === post.uid && (
          <Link href={`/admin/${post.slug}`}>
            <button className="btn-blue">Edit Post</button>
          </Link>
        )}
      </aside>
    </main>
  );
}
