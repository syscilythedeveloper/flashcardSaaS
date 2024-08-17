"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Box,
  CardActionArea,
  Typography,
  Grid,
  Card,
  CardContent,
  Container,
} from "@mui/material";
import Navbar from "../components/NavBar";

export default function FlashcardPage() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const cards = JSON.parse(decodeURIComponent(searchParams.get("cards")));
  const [flipped, setFlipped] = useState([]);

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          height: "100vh",
          overflow: "hidden", // Ensure the container does not overflow
          display: "flex",
          flexDirection: "column",
          paddingInline: "40px",
        }}
      >
        <Navbar />

        {cards.length > 0 && (
          <Box
            sx={{
              mt: 4,
              flex: 1, // Allow the box to take up available space
              overflowY: "auto", // Enable vertical scrolling
              paddingRight: 2, // Add some padding for better UX
              paddingBottom: 2,
            }}
          >
            {" "}
            <Grid container spacing={3}>
              {cards.map((card, index) => {
                return (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card>
                      <CardActionArea
                        onClick={() => {
                          handleCardClick(index);
                        }}
                      >
                        <CardContent>
                          <Box
                            sx={{
                              perspective: "1000px",
                              "& > div": {
                                transition: "transform 0.6s",
                                transformStyle: "preserve-3d",
                                position: "relative",
                                width: "100%",
                                height: "200px",
                                boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                                transform: flipped[index]
                                  ? "rotateY(180deg)"
                                  : "rotateY(0deg)",
                              },
                              "& > div > div": {
                                position: "absolute",
                                width: "100%",
                                height: "100%",
                                backfaceVisibility: "hidden",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: 2,
                                boxSizing: "border-box",
                              },

                              "& > div > div:nth-of-type(2)": {
                                transform: "rotateY(180deg)",
                              },
                            }}
                          >
                            <div>
                              <div>
                                <Typography variant="h5" component="div">
                                  {card.front}
                                </Typography>
                              </div>
                              <div>
                                <Typography variant="h5" component="div">
                                  {card.back}
                                </Typography>
                              </div>
                            </div>
                          </Box>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        )}
      </Container>
    </>
  );
}
