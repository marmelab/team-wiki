import { Login, LoginForm } from "react-admin";
import { Box, Typography } from "@mui/material";

export const LoginPage = () => (
  <Login>
    <Box textAlign="center">
      <Typography>Login with</Typography>
      <Typography>johndoe / password</Typography>
      <Typography>or</Typography>
      <Typography>janedoe / password</Typography>
    </Box>

    <LoginForm />
  </Login>
);
