import { collection, doc, orderBy, query, serverTimestamp, setDoc } from "firebase/firestore";
import kebabCase from "lodash.kebabcase";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useContext, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

import AuthCheck from "@components/auth-check";
import PostFeed from "@components/post-feed";
import { UserContext } from "@lib/context";
import { auth, firestore } from "@lib/firebase";
import { Box } from "@mui/material";

function AdminPostsPage() {
  return (
    <Box>
      <AuthCheck>
        <PostList />
        <CreateNewPost />
      </AuthCheck>
    </Box>
  );
}

function PostList() {
  var ref = collection(firestore, "users", auth.currentUser.uid, "posts");
  var q = query(ref, orderBy("createdAt", "desc"));
  var [querySnapshot] = useCollection(q);
  var posts = querySnapshot?.docs.map((doc) => doc.data());

  return (
    <>
      <h1>Manage your posts</h1>
      <PostFeed posts={posts} admin={true} />
    </>
  );
}

function CreateNewPost() {
  var router = useRouter();
  var { enqueueSnackbar } = useSnackbar();
  var { username } = useContext(UserContext);
  var [title, setTitle] = useState("");

  // Ensure slug is URL safe
  var slug = encodeURI(kebabCase(title));

  // Valid length
  var isValid = title.length > 3 && title.length < 100;

  async function createPost(e) {
    e.preventDefault();
    var uid = auth.currentUser.uid;
    var ref = doc(firestore, "users", uid, "posts", slug);

    // Default values of the post
    var data = {
      title,
      slug,
      uid,
      username,
      published: false,
      content: "# hello world!",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      heartCount: 0,
    };

    await setDoc(ref, data);
    enqueueSnackbar("Post created!", { variant: "success" });
    router.push(`/admin/${slug}`);
  }

  return (
    <form onSubmit={createPost}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="My Awesome Article!"
      />
      <p>
        <strong>Slug: </strong> {slug}
      </p>

      <button type="submit" disabled={!isValid}>
        Create New Post
      </button>
    </form>
  );
}

export default AdminPostsPage;
