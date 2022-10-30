import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";

import Loader from "@components/loader";
import { auth, storage } from "@lib/firebase";

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
    <div>
      {uploading && <Loader />}
      {uploading && <h3>{progress}%</h3>}

      {!uploading && (
        <>
          <label>
            Upload image
            <input
              type="file"
              onChange={uploadImage}
              accept="image/x-png, image/gif, image/jpeg"
            />
          </label>
        </>
      )}

      {downloadURL && <code>{`![alt](${downloadURL})`}</code>}
    </div>
  );
}

export default ImageUploader;
