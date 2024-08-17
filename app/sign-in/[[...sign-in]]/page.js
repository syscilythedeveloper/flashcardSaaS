"use client";
import { SignIn } from "@clerk/clerk-react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
  Link,
} from "@mui/material";
import Navbar from "../../components/NavBar";

export default function SignInPage() {
  return (
    <Container maxWidth="100vh">
      <Navbar />

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h4">Sign In</Typography>
        <SignIn />
      </Box>
    </Container>
  );
}
