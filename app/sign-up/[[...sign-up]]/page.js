"use client";
import { SignUp } from "@clerk/clerk-react";
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

export default function SignUpPage() {
  return (
    <Container maxWidth="100vw">
      <Navbar />

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h4">Sign Up</Typography>
        <SignUp />
      </Box>
    </Container>
  );
}
