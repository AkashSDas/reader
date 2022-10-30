import AuthCheck from "@components/auth-check";
import { Box } from "@mui/material";

function AdminPostsPage() {
  return (
    <Box>
      <AuthCheck>
        <h1>Admin posts</h1>
      </AuthCheck>
    </Box>
  );
}

export default AdminPostsPage;
