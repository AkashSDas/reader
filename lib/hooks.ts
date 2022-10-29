import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, firestore } from "./firebase";

export function useUserData() {
  var [user] = useAuthState(auth);
  var [username, setUsername] = useState(null);

  useEffect(
    function listenToUserDoc() {
      if (user) {
        let ref = doc(firestore, "users", user.uid);
        var unsubscribe = onSnapshot(ref, function updateUsername(snapshot) {
          setUsername(snapshot.data()?.username);
        });
      } else {
        setUsername(null);
      }

      // turn off realtime subscription
      return unsubscribe;
    },
    [user]
  );

  return { user, username };
}
