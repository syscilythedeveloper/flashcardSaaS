"use client";
import Image from "next/image";
import getStripe from "../utils/get-stripe";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import {
  Typography,
  Container,
  AppBar,
  Grid,
  Toolbar,
  Button,
  Box,
} from "@mui/material";
import Navbar from "./components/NavBar";
import Head from "next/head";
import Stripe from "stripe";
import { useEffect, useState } from "react";

export default function Home() {
  const { user } = useUser();
  const [suscription, setSuscription] = useState(false);
  const stripe = new Stripe(
    "sk_test_51PoZ1gA1Bes7OdcoHZ5Y1pfe3wOAlNVfdz9ziYGAwFKjXCvtMMPYSh5cmgoVUCUDCc5G8IJvOK99HdSdnMWzZ0VS00SaZlixMb",
    {
      apiVersion: "2024-06-20",
    }
  );
  const proPayment = async () => {
    const payment_link = "https://buy.stripe.com/test_bIY29veFa7kZ5wsbII";
    window.open(payment_link, "_blank").focus();
  };

  const checkSubscription = async (email) => {
    try {
      // Retrieve customer list by email
      console.log(" Checking subscription for email: ", email);
      const customers = await stripe.customers.list({
        email: email,
        limit: 1, // Assuming each email corresponds to a single customer
      });

      if (customers.data.length === 0) {
        console.log("No customer found with this email.");
        return;
      }

      const customerId = customers.data[0].id;
      console.log("Customer ID: ", customerId);

      // Check for active subscriptions
      const subscriptions = await stripe.subscriptions.list({
        customer: customerId,
        status: "active",
      });

      if (subscriptions.data.length > 0) {
        console.log("Subscription found: ", subscriptions.data[0]);
        setSuscription(true);
      } else {
        console.log("No active subscription found.");
        setSuscription(false);
      }
    } catch (error) {
      console.error("Error checking subscription", error);
    }
  };

  useEffect(() => {
    if (!user) {
      return;
    }

    checkSubscription(user.primaryEmailAddress.emailAddress);
  }, [user]);

  return (
    <Container>
      <Head>
        <title>Flashcard SaaS</title>
        <meta name="description" content="Create flashcard from your text" />
      </Head>
      <Navbar />

      <Box sx={{ textAlign: "center", my: 4 }}>
        <Typography variant="h2" gutterBottom>
          Welcome to Flashcard SaaS
        </Typography>
        <Typography variant="h5">
          {" "}
          The easiest way to make flashcards from your text
        </Typography>
        <SignedOut>
          <Button
            variant="contained"
            href="/sign-in"
            color="primary"
            sx={{ mt: 2 }}
          >
            Get Started
          </Button>
        </SignedOut>
        <SignedIn>
          <Button
            variant="contained"
            href="/flashcards"
            color="primary"
            sx={{ mt: 2 }}
          >
            Start making cards
          </Button>
        </SignedIn>
      </Box>
      <Box
        sx={{
          my: 6,
        }}
      >
        <Typography variant="h4" components="h2" gutterBottom>
          {" "}
          Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Easy Text Input
            </Typography>
            <Typography>
              {" "}
              Simply input your text adn let our software do the rest. Creating
              flashCards has never been easier.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Smart FlashCards
            </Typography>
            <Typography>
              {" "}
              Our AI intelligently breaks down your text into concise
              flashcards, perfect for stuying.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Accsible anywhere</Typography>
            <Typography>
              {" "}
              Aces your flashcards from any device at any time. Study on the go
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ my: 6, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Pricing
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 3,
                border: "1px solid",
                borderColor: "grey.300",
                borderRadius: 2,
              }}
            >
              <Typography variant="h5" gutterBottom>
                Basic
              </Typography>
              <Typography variant="h6" gutterBottom>
                Free
              </Typography>
              <Typography>Create up to 3 flashcards collections.</Typography>

              {suscription ? (
                <Typography variant="body1" color="green" sx={{ mt: 2 }}>
                  You are already subscribed to the Pro Plan
                </Typography>
              ) : (
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                  Choose Basic
                </Button>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 3,
                border: "1px solid",
                borderColor: "grey.300",
                borderRadius: 2,
              }}
            >
              <Typography variant="h5" gutterBottom>
                Pro
              </Typography>
              <Typography variant="h6" gutterBottom>
                $10/Month
              </Typography>
              <Typography>
                Unlimited flashcards and storage, with priority support.
              </Typography>

              {suscription ? (
                <Typography variant="body1" color="green" sx={{ mt: 2 }}>
                  You are already subscribed to the Pro plan.
                </Typography>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={proPayment}
                >
                  Choose Pro
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
