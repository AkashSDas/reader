import { doc, query, serverTimestamp, updateDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useDocument, useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";

import AuthCheck from "@components/auth-check";
import ImageUploader from "@components/image-uploader";
import { auth, firestore } from "@lib/firebase";
import { containedBtnStyle, textBtnStyle } from "@lib/material-ui";
import { CheckBox } from "@mui/icons-material";
import { Box, Button, IconButton, Stack, TextareaAutosize } from "@mui/material";

function AdminPostEditPage() {
  return (
    <Box>
      <AuthCheck>
        <PostManager />
      </AuthCheck>
    </Box>
  );
}

function PostManager() {
  var [preview, setPreview] = useState(false);
  var router = useRouter();
  var { slug } = router.query;

  var postRef = doc(
    firestore,
    "users",
    auth.currentUser.uid,
    "posts",
    slug as string
  );
  var [post] = useDocumentDataOnce(postRef); // No need to listen to changes

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
        {post && (
          <Box sx={{ width: "100%" }}>
            <h1>{post.title}</h1>
            <p>{post.slug}</p>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
            >
              <Button
                sx={{
                  textTransform: "unset",
                  padding: "0 1rem",
                  height: "32px",
                  borderRadius: "100px",
                  fontWeight: "400",
                  width: "fit-content",
                }}
                startIcon={<Box>🎹</Box>}
                variant="text"
                onClick={() => setPreview(!preview)}
              >
                {preview ? "Edit" : "Preview"}
              </Button>

              <Link href={`/${post.username}/${post.slug}`}>
                <Button
                  sx={{
                    textTransform: "unset",
                    padding: "0 1rem",
                    height: "32px",
                    borderRadius: "100px",
                    fontWeight: "400",
                    width: "fit-content",
                  }}
                  startIcon={<Box>🌐</Box>}
                  variant="text"
                >
                  Live view
                </Button>
              </Link>
            </Stack>

            <ImageUploader />

            <Box mt={4} />
            <PostForm
              postRef={postRef}
              defaultValues={post}
              preview={preview}
            />
          </Box>
        )}
      </Stack>
    </Box>
  );
}

function PostForm({ defaultValues, preview, postRef }) {
  var { enqueueSnackbar } = useSnackbar();
  var {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isDirty, isValid, errors },
  } = useForm({
    defaultValues,
    mode: "onChange",
  });

  async function updatePost({ content, published }) {
    console.log(content, published);
    await updateDoc(postRef, {
      content,
      published,
      updatedAt: serverTimestamp(),
    });

    reset({ content, published });
    enqueueSnackbar("Post updated successfully", { variant: "success" });
  }

  return (
    <Box component="form" onSubmit={handleSubmit(updatePost)}>
      {preview && (
        <div>
          <ReactMarkdown>{watch("content")}</ReactMarkdown>
        </div>
      )}

      {!preview && (
        <Box>
          <TextareaAutosize
            style={{
              width: "100%",
              height: "300px",
              resize: "none",
              padding: "1rem",
              fontSize: "1rem",
              fontFamily: "Syne",
            }}
            name="content"
            {...register("content", {
              maxLength: { value: 20000, message: "content is too long" },
              minLength: { value: 10, message: "content is too short" },
              required: true,
            })}
          />
          {errors.content && <p>{errors.content?.message.toString()}</p>}

          <Stack my={4} direction="row" alignItems="center" spacing={1}>
            <CheckBox {...register("published")} />
            <label>Published</label>
          </Stack>

          <Button
            type="submit"
            disabled={!isDirty || !isValid}
            variant="contained"
            disableElevation
            sx={containedBtnStyle}
          >
            Save Changes
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default AdminPostEditPage;
