import { collectionGroup, doc, getDoc, getDocs, query } from "firebase/firestore";

import { firestore, getUserWithUsername, postToJSON } from "@lib/firebase";
import { Box } from "@mui/material";

export async function getStaticProps({ params }) {
  var { username, slug } = params;
  var userDoc = await getUserWithUsername(username);

  if (userDoc) {
    let postRef = doc(firestore, userDoc.ref.path, "posts", slug);
    var post = postToJSON(await getDoc(postRef));
    var path = postRef.path; // To refetch this data in the client-side
  }

  return {
    props: { post, path },
    revalidate: 5000, // Regenerate post page on the server every 5 seconds for incoming requests
  };
}

export async function getStaticPaths() {
  // Improve this by using the Admin SDK to select empty documents
  var postsQuery = query(collectionGroup(firestore, "posts"));
  var snapshot = await getDocs(postsQuery);

  var paths = snapshot.docs.map(function getPath(doc) {
    var { username, slug } = doc.data();
    return {
      params: { username, slug },
    };
  });

  return { paths, fallback: "blocking" };
}

function PostPage() {
  return (
    <Box>
      <h1>Post</h1>
    </Box>
  );
}

export default PostPage;
