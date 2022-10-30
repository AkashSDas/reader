import { collection, doc, orderBy, query, serverTimestamp, setDoc } from "firebase/firestore";
import kebabCase from "lodash.kebabcase";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useContext, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

import AuthCheck from "@components/auth-check";
import PostFeed from "@components/post-feed";
import { UserContext } from "@lib/context";
import { auth, firestore, postToJSON } from "@lib/firebase";
import { containedBtnStyle } from "@lib/material-ui";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

function AdminPostsPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        px: 2,
        mt: 2,
      }}
    >
      <AuthCheck>
        <Stack
          spacing={2}
          direction="column"
          alignItems="center"
          sx={{ maxWidth: "700px", width: "100%" }}
        >
          <PostList />
          <CreateNewPost />
        </Stack>
      </AuthCheck>
    </Box>
  );
}

function PostList() {
  var ref = collection(firestore, "users", auth.currentUser.uid, "posts");
  var q = query(ref, orderBy("createdAt", "desc"));
  var [querySnapshot] = useCollection(q);
  var posts = querySnapshot?.docs.map(postToJSON);

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
    console.log(serverTimestamp());

    await setDoc(ref, data);
    enqueueSnackbar("Post created!", { variant: "success" });
    router.push(`/admin/${slug}`);
  }

  return (
    <Box
      component="form"
      onSubmit={createPost}
      style={{ width: "100%", marginTop: "2rem" }}
    >
      <TextField
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        label="Post Title"
        placeholder="My Awesome Article!"
        fullWidth
        variant="standard"
        inputProps={{ style: { fontWeight: 700, fontSize: "24px" } }}
        InputLabelProps={{
          style: { fontWeight: 500, fontSize: "18px" },
          shrink: true,
        }}
      />

      <Stack direction="row" spacing={1} sx={{ my: 2 }}>
        <Typography fontWeight={700}>Slug: </Typography>{" "}
        <Typography>{slug}</Typography>
      </Stack>

      <Button
        type="submit"
        disabled={!isValid}
        variant="contained"
        sx={containedBtnStyle}
      >
        Create New Post
      </Button>
    </Box>
  );
}

export default AdminPostsPage;
