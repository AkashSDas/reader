import Link from "next/link";

import { Box } from "@mui/system";

export default function Custom404() {
  return (
    <Box>
      <h1>404 - That page does not seem to exist...</h1>

      <iframe
        src="https://giphy.com/embed/KKOMG9EB7VqBq"
        width="480"
        height="270"
        frameBorder="0"
        className="giphy-embed"
        allowFullScreen
      ></iframe>

      <Link href="/">
        <button>Go home</button>
      </Link>
    </Box>
  );
}
