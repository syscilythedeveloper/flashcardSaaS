"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useRouter } from "next/navigation";
import {
  CardActionArea,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

export default function Flashcard() {
  const { isLoading, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const router = useRouter();

  const getFlashcards = async () => {
    if (!user) return;

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
  };

  useEffect(() => {
    getFlashcards();
  }, [user]);

  if (isLoading || !isSignedIn) {
    return <></>;
  }

  if (flashcards.length === 0) {
    return (
      <Container maxWidth="100vw">
        <Typography variant="h4" sx={{ mt: 4 }}>
          You have no flashcards yet!
        </Typography>
      </Container>
    );
  }

  const handleCardClick = (id) => {
    router.push(`/flashcards?id=${id}`);
  };

  return (
    <Container maxWidth="100vw">
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {flashcards.map((flashcard, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardActionArea
                onClick={() => {
                  handleCardClick(id);
                }}
              ></CardActionArea>
              <CardContent>
                <Typography variant="h6">{flashcard.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
