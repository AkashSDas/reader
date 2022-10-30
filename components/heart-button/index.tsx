import { collection, doc, increment, writeBatch } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";

import { auth, firestore } from "@lib/firebase";

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
    <button onClick={removeHeart}>💔 Unheart</button>
  ) : (
    <button onClick={addHeart}>💗 Heart</button>
  );
}

export default HeartButton;
