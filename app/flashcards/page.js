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
  const [filteredFlashcards, setFilteredFlashcards] = useState([]);
  const [searchInput, setSearchInput] = useState("");
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
      setFilteredFlashcards(flashcardsData); // Initialize with all flashcards
    } else {
      await setDoc(docRef, { flashcards: [] });
    }
    setLoadingFlashcards(false);
  };

  useEffect(() => {
    if (!isLoading && isSignedIn) {
      getFlashcards();
    }
  }, [user, isLoading, isSignedIn]);

  useEffect(() => {
    // Filter flashcards based on the search input
    const filtered = flashcards.filter((flashcard) =>
      flashcard.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredFlashcards(filtered);
  }, [searchInput, flashcards]);

  if (isLoading) {
    return <CircularProgress />;
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
        {filteredFlashcards.length === 0 && (
          <Typography variant="h6" gutterBottom>
            No flashcards found
          </Typography>
        )}

        {filteredFlashcards.length > 0 &&
          filteredFlashcards.map((flashcard) => (
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
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: { xs: "center", md: "left" },
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
        <Grid
          item
          xs={12}
          md={8}
          sx={{
            height: "100%",
            padding: { xs: 1, md: 2 },
          }}
          maxHeight={{ xs: "60%", md: "90%" }}
          overflowY="hidden"
        >
          <Autocomplete
            options={flashcards}
            getOptionLabel={(option) => option.name}
            inputValue={searchInput}
            onInputChange={(event, newInputValue) => {
              setSearchInput(newInputValue);
            }}
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
