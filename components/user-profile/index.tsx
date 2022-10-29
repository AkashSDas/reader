import { Avatar } from "@mui/material";
import { Box } from "@mui/system";

function UserProfile({ user }) {
  return (
    <Box>
      <Avatar src={user?.photoURL} sizes="40" />
      <p>@{user.username}</p>
      <h1>{user.displayName}</h1>
    </Box>
  );
}

export default UserProfile;
