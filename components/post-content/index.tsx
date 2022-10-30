import moment from "moment";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

import { Box, Typography } from "@mui/material";

function PostContent({ post }) {
  var createdAt =
    typeof post?.createdAt == "number"
      ? new Date(post.createdAt)
      : post.createdAt.toDate();

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h5" sx={{ fontWeight: 700 }}>
        {post?.title}
      </Typography>

      <Typography variant="body2" sx={{ mb: 4 }}>
        Written by{" "}
        <Link href={`/${post.username}`}>
          <a>@{post.username}</a>
        </Link>{" "}
        {moment(createdAt.toISOString()).fromNow()}
      </Typography>

      <ReactMarkdown>{post?.content}</ReactMarkdown>
    </Box>
  );
}

export default PostContent;
