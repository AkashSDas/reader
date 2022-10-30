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
import { Box } from "@mui/material";

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
    <Box>
      <h1>Post</h1>
      {post && (
        <>
          <section>
            <h1>{post.title}</h1>
            <p>{post.slug}</p>
            <ImageUploader />

            <PostForm
              postRef={postRef}
              defaultValues={post}
              preview={preview}
            />
          </section>

          <aside>
            <h3>Tools</h3>

            <button onClick={() => setPreview(!preview)}>
              {preview ? "Edit" : "Preview"}
            </button>

            <Link href={`/${post.username}/${post.slug}`}>
              <button>Live view</button>
            </Link>
          </aside>
        </>
      )}
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
    <form onSubmit={handleSubmit(updatePost)}>
      {preview && (
        <div>
          <ReactMarkdown>{watch("content")}</ReactMarkdown>
        </div>
      )}

      {!preview && (
        <div>
          <textarea
            name="content"
            {...register("content", {
              maxLength: { value: 20000, message: "content is too long" },
              minLength: { value: 10, message: "content is too short" },
              required: true,
            })}
          ></textarea>
          {errors.content && <p>{errors.content?.message.toString()}</p>}

          <fieldset>
            <input type="checkbox" {...register("published")} />
            <label>Published</label>
          </fieldset>

          <button type="submit" disabled={!isDirty || !isValid}>
            Save Changes
          </button>
        </div>
      )}
    </form>
  );
}

export default AdminPostEditPage;
