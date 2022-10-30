import { collection, doc, increment, writeBatch } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";

import { auth, firestore } from "@lib/firebase";
import { containedBtnStyle } from "@lib/material-ui";
import { Button } from "@mui/material";

function HeartButton({ postRef }) {
  var heartRef = doc(firestore, postRef.path, "hearts", auth.currentUser.uid);
  var [heartDoc] = useDocument(heartRef);

  async function addHeart() {
    var uid = auth.currentUser.uid;
    var batch = writeBatch(firestore);
    batch.update(postRef, { heartCount: increment(1) });
    batch.set(heartRef, { uid });

    await batch.commit();
  }

  async function removeHeart() {
    var batch = writeBatch(firestore);
    batch.update(postRef, { heartCount: increment(-1) });
    batch.delete(heartRef);

    await batch.commit();
  }

  return heartDoc?.exists() ? (
    <Button sx={containedBtnStyle} onClick={removeHeart} variant="outlined">
      💔 Unheart
    </Button>
  ) : (
    <Button sx={containedBtnStyle} onClick={addHeart} variant="outlined">
      💗 Heart
    </Button>
  );
}

export default HeartButton;
