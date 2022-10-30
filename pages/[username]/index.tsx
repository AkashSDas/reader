import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

import PostFeed from "@components/post-feed";
import UserProfile from "@components/user-profile";
import { firestore, getUserWithUsername, postToJSON } from "@lib/firebase";
import { Box, Stack } from "@mui/material";

export async function getServerSideProps({ query: q }) {
  var { username } = q;
  var userDoc = await getUserWithUsername(username);

  // If no user, short-circuit to 404 page
  if (!userDoc) {
    return {
      notFound: true,
    };
  }

  // JSON serializable data
  if (userDoc) {
    var user = userDoc.data();

    let postQuery = query(
      collection(firestore, `${userDoc.ref.path}/posts`),
      where("published", "==", true),
      orderBy("createdAt", "desc")
    );
    var posts = (await getDocs(postQuery)).docs.map(postToJSON);
  }

  console.log("posts", posts);
  return {
    props: { user, posts }, // will be passed to the page component as props
  };
}

function UserPublicProfilePage({ user, posts }) {
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
      <Stack
        spacing={2}
        direction="column"
        alignItems="center"
        sx={{ maxWidth: "700px", width: "100%" }}
      >
        <UserProfile user={user} />
        <PostFeed posts={posts} admin={false} />
      </Stack>
    </Box>
  );
}

export default UserPublicProfilePage;
