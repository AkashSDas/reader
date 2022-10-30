import { Avatar, Stack } from "@mui/material";

function UserProfile({ user }) {
  return (
    <Stack direction="column" alignItems="center" spacing={1}>
      <Avatar src={user?.photoURL} sx={{ width: 80, height: 80 }} />
      <p>@{user.username}</p>
      <h1>{user.displayName}</h1>
    </Stack>
  );
}

export default UserProfile;
