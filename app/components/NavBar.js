import React from "react";
import { AppBar, Button, Toolbar, Typography, Box } from "@mui/material";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import HomeIcon from "@mui/icons-material/Home";
export default function Navbar() {
  const { user } = useUser();

  const router = useRouter();
  return (
    <AppBar position="static" sx={{ maxHeight: "64px" }}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ cursor: "pointer" }}
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Flashcard Sass
        </Typography>

        <SignedIn>
          <Typography
            variant="h6"
            sx={{
              cursor: "pointer",
              marginLeft: "5rem",
              display: "flex", // Use flexbox to align items
              alignItems: "center", // Align icon and text in the center
            }}
            onClick={() => router.push("/flashcards")}
          >
            <HomeIcon
              sx={{ marginRight: "0.5rem" }} // Add some spacing between the icon and the text
            />
            Home
          </Typography>
        </SignedIn>

        <Box sx={{ flexGrow: 1 }} />

        <SignedOut>
          <Button color="inherit" href="/sign-in">
            Login
          </Button>
          <Button color="inherit" href="/sign-up">
            Signup
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </Toolbar>
    </AppBar>
  );
}
