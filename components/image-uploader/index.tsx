import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";

import Loader from "@components/loader";
import { auth, storage } from "@lib/firebase";
import { Box, Button } from "@mui/material";

function ImageUploader() {
  var [uploading, setUploading] = useState(false);
  var [progress, setProgress] = useState(0);
  var [downloadURL, setDownloadURL] = useState(null);

  // Create firebase upload task
  async function uploadImage(e) {
    // Get the file
    var file = Array.from(e.target.files)[0] as any;
    var extension = file.type.split("/")[1];

    var storageRef = ref(
      storage,
      `uploads/${auth.currentUser.uid}/${Date.now()}.${extension}`
    );
    setUploading(true);

    // Start the upload
    var task = uploadBytesResumable(storageRef, file);
    task.on(
      "state_changed",
      (snapshot) => {
        var pct = (
          (snapshot.bytesTransferred / snapshot.totalBytes) *
          100
        ).toFixed(0);
        setProgress(Number(pct));
      },
      (err) => {
        console.log(err);
        setUploading(false);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(task.snapshot.ref).then((downloadURL) => {
          setDownloadURL(downloadURL);
          setUploading(false);
        });
      }
    );
  }

  return (
    <Box component="div">
      {downloadURL && (
        <Box
          component="code"
          sx={{ fontSize: "0.8rem" }}
        >{`![alt](${downloadURL})`}</Box>
      )}

      {uploading && <Loader />}
      {uploading && <h3>{progress}%</h3>}

      {!uploading && (
        <Button
          sx={{
            textTransform: "unset",
            padding: "0 1rem",
            height: "32px",
            borderRadius: "100px",
            fontWeight: "400",
            width: "fit-content",
          }}
          startIcon={<Box>📸</Box>}
          variant="text"
          component="label"
        >
          Upload image
          <input
            type="file"
            onChange={uploadImage}
            accept="image/x-png, image/gif, image/jpeg"
            hidden
          />
        </Button>
      )}
    </Box>
  );
}

export default ImageUploader;
