import { signInWithPopup } from "firebase/auth";
import { doc, getDoc, writeBatch } from "firebase/firestore";
import { useSnackbar } from "notistack";
import { ChangeEvent, ChangeEventHandler, FormEvent, FormEventHandler, useContext, useEffect, useState } from "react";

import { UserContext } from "@lib/context";
import { auth, firestore, googleAuthProvider } from "@lib/firebase";
import { containedBtnStyle } from "@lib/material-ui";
import GoogleIcon from "@mui/icons-material/Google";
import { Box, Button, debounce } from "@mui/material";

function GetStartedPage() {
  var { user, username } = useContext(UserContext);

  // 1. user signed out <SignInButton /›
  // 2. user signed in, but missing username <UsernameForm />
  // 3. user signed in, has username <SignoutButton />
  return (
    <Box>
      {user ? (
        !username ? (
          <UsernameForm />
        ) : (
          <SignoutButton />
        )
      ) : (
        <SignInButton />
      )}
    </Box>
  );
}

// Sign in with Google button
function SignInButton() {
  var { enqueueSnackbar } = useSnackbar();

  async function signInWithGoogle() {
    try {
      await signInWithPopup(auth, googleAuthProvider);
    } catch (err) {
      enqueueSnackbar(err.message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  }

  return (
    <>
      <Button
        variant="contained"
        startIcon={<GoogleIcon />}
        disableElevation
        sx={containedBtnStyle}
        onClick={signInWithGoogle}
      >
        Sign in with Google
      </Button>
    </>
  );
}

function SignoutButton() {
  return (
    <Button
      onClick={() => auth.signOut()}
      variant="outlined"
      disableElevation
      sx={containedBtnStyle}
    >
      Sign out
    </Button>
  );
}

function UsernameForm() {
  var [formValue, setFormValue] = useState("");
  var [isValid, setIsValid] = useState(false); // username is valid
  var [loading, setLoading] = useState(false); // async checking username in firestore

  var { user, username } = useContext(UserContext);
  var { enqueueSnackbar } = useSnackbar();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    // Force form value typed in form to match correct format
    var val = e.target.value.toLowerCase();
    var regex = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // Only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (regex.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  }

  // Check if username is available in firestore
  useEffect(() => {
    checkUsername(formValue);
  }, [formValue, checkUsername]);

  // Check if username is available in firestore
  // useCallback is required for debounce to work
  var checkUsername = debounce(async (username: string) => {
    if (formValue.length >= 3) {
      var ref = doc(firestore, "usernames", username);
      var snapshot = await getDoc(ref);
      console.log("Firestore read executed!");
      setIsValid(!snapshot.exists());
      setLoading(false);
    }
  }, 500);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Create refs for both documents
    var userDoc = doc(firestore, "users", user.uid);
    var usernameDoc = doc(firestore, "usernames", formValue);

    try {
      // Commit both docs together as a batch write.
      var batch = writeBatch(firestore);
      batch.set(userDoc, {
        username: formValue,
        photoURL: user.photoURL,
        displayName: user.displayName,
      });
      batch.set(usernameDoc, { uid: user.uid });

      await batch.commit();
    } catch (err) {
      enqueueSnackbar(err.message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  }

  return (
    <main>
      {!username && (
        <section>
          <h3>Choose username</h3>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={formValue}
              onChange={handleChange}
            />
            <UsernameMessage
              username={formValue}
              isValid={isValid}
              loading={loading}
            />

            <button type="submit" disabled={!isValid}>
              Submit
            </button>
          </form>
        </section>
      )}
    </main>
  );
}

function UsernameMessage({ username, isValid, loading }) {
  if (loading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    return <p className="text-success">{username} is available!</p>;
  } else if (username && !isValid) {
    return <p className="text-danger">That username is taken!</p>;
  } else {
    return <p></p>;
  }
}

export default GetStartedPage;
