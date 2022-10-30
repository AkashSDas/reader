import Link from "next/link";
import { useContext } from "react";

import { UserContext } from "@lib/context";

export default function AuthCheck(props) {
  var { username } = useContext(UserContext);

  return username
    ? props.children
    : props.fallback || <Link href="/get-started">You must be signed in</Link>;
}
