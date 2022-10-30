import moment from "moment";
import Link from "next/link";

import { FiberManualRecord } from "@mui/icons-material";
import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import { Stack } from "@mui/system";

function PostFeed({ posts, admin }) {
  return posts
    ? posts.map((p) => <PostItem post={p} key={p.slug} admin={admin} />)
    : null;
}

function PostItem({ post, admin }) {
  var wordCount = post?.content.trim().split(/\s+/g).length;
  var readTime = (wordCount / 100 + 1).toFixed(0);

  return (
    <Card variant="outlined" sx={{ width: "100%" }}>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing="2px">
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            by
          </Typography>

          <Link href={`/${post.username}`}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              @{post.username}
            </Typography>
          </Link>

          <FiberManualRecord
            sx={(t) => ({ height: "6px", fill: t.palette.text.secondary })}
          />

          <Typography
            variant="caption"
            sx={(t) => ({ color: t.palette.text.secondary })}
          >
            {moment(post.createdAt).fromNow()}
          </Typography>
        </Stack>

        <Link href={`/${post.username}/${post.slug}`}>
          <Typography
            variant="h4"
            sx={{ cursor: "pointer", fontWeight: 700, width: "fit-content" }}
          >
            {post.title}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" spacing="2px">
          <Typography
            variant="body2"
            sx={(t) => ({ color: t.palette.text.secondary, fontWeight: 600 })}
          >
            {readTime} min read
          </Typography>
          <FiberManualRecord
            sx={(t) => ({ height: "6px", fill: t.palette.text.secondary })}
          />
          <Typography
            variant="body2"
            sx={(t) => ({ color: t.palette.text.secondary, fontWeight: 600 })}
          >
            👏🏻 {post.heartCount || 0} Hearts
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default PostFeed;
