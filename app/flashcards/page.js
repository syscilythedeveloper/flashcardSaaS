"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useRouter } from "next/navigation";
import {
  CardActionArea,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  Box,
  Autocomplete,
  TextField,
} from "@mui/material";
import Navbar from "../components/NavBar";
import CircularProgress from "@mui/material/CircularProgress";

export default function Flashcard() {
  const { isLoading, isSignedIn, user } = useUser();
  const [loadingFlashcards, setLoadingFlashcards] = useState(true);
  const [flashcards, setFlashcards] = useState([]);
  const router = useRouter();

  const getFlashcards = async () => {
    if (!user) return;

    setLoadingFlashcards(true);

    const docRef = doc(db, "users", user.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const collectionsNames = docSnap.data().flashcards || [];

      const flashcardsData = await Promise.all(
        collectionsNames.map(async (collectionData) => {
          const collectionName = collectionData.name;
          const collectionRef = collection(
            db,
            "users",
            user.id,
            collectionName
          );
          const collectionSnap = await getDocs(collectionRef);

          const flashcardsList = collectionSnap.docs.map((doc) => doc.data());
          return { name: collectionName, cards: flashcardsList };
        })
      );
      setFlashcards(flashcardsData);
    } else {
      await setDoc(docRef, { flashcards: [] });
    }
    setLoadingFlashcards(false);
  };

  useEffect(() => {
    getFlashcards();
  }, [user]);

  if (isLoading) {
    return <>ddf</>;
  }

  if (!isLoading && !isSignedIn) {
    router.push("/sign-in");
    return;
  }

  const handleCardClick = (name, cards) => {
    router.push(
      `/flashcardPage?name=${name}&cards=${encodeURIComponent(
        JSON.stringify(cards)
      )}`
    );
  };

  const FlashCardsList = () => {
    if (loadingFlashcards) {
      return (
        <Box
          height="100%"
          display="flex"
          justifyContent={"center"}
          alignItems={"center"}
        >
          <CircularProgress />
        </Box>
      );
    }

    return (
      <Box overflow="auto" height="100%">
        {flashcards.length === 0 && (
          <Typography variant="h6" gutterBottom>
            No flashcards found
          </Typography>
        )}

        {flashcards.length > 0 &&
          flashcards.map((flashcard) => (
            <Card
              sx={{
                width: "100%",
                mt: 2,
              }}
              key={flashcard.name}
            >
              <CardActionArea
                onClick={() => handleCardClick(flashcard.name, flashcard.cards)}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {flashcard.name}
                  </Typography>
                  <Typography>{flashcard.cards.length} flashcards</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
      </Box>
    );
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        height: "100vh",
      }}
      style={{ paddingInline: "40px" }}
      overflowY="hidden"
    >
      <Navbar />

      <Grid
        container
        spacing={2}
        sx={{ height: "calc(100% - 10%)", width: "100%" }}
        paddingTop={8}
        overflowY="hidden"
      >
        {/* Left Side - Title and Create Button */}
        <Grid
          item
          xs={12} // Full width on extra-small screens
          md={4} // 8/12 width on medium and larger screens
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center", // Center vertically
            alignItems: "center", // Center horizontally
            textAlign: { xs: "center", md: "left" }, // Center text on small screens
          }}
          overflowY="hidden"
        >
          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push("/generate")}
            >
              Generate flashcards
            </Button>
          </Box>
        </Grid>
        {/* Right Side - Flashcard List */}
        <Grid
          item
          xs={12} // Full width on extra-small screens
          md={8} // 4/12 width on medium and larger screens
          sx={{
            height: "100%", // Full height
            padding: { xs: 1, md: 2 }, // Adjust padding based on screen size
          }}
          maxHeight={{ xs: "60%", md: "90%" }}
          overflowY="hidden"
        >
          <Autocomplete
            options={flashcards}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} label="Flashcards" variant="outlined" />
            )}
            sx={{ mb: 2 }}
          />
          <Divider />
          <FlashCardsList />
        </Grid>
      </Grid>
    </Container>
  );
}
