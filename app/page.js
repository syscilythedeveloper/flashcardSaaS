import Image from 'next/image';
import getStripe from '../utils/get-stripe';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import {
  Typography,
  Container,
  AppBar,
  Grid,
  Toolbar,
  Button,
  Box,
} from '@mui/material';
import Head from 'next/head';

export default function Home() {
  return (
    <Container maxWidth='lg'>
      <Head>
        <title>Flashcard SaaS</title>
        <meta name='description' content='Create flashcard from your text' />
      </Head>

      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' style={{ flexGrow: 1 }}>
            Flashcard Sass
          </Typography>

          <SignedOut>
            <Button color='inherit' href='/sign-in'>
              {' '}
              Login
            </Button>
            <Button color='inherit' href='/sign-up'>
              {' '}
              Signup
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant='h2' gutterBottom>
          Welcome to Flashcard SaaS
        </Typography>
        <Typography variant='h5'>
          {' '}
          The easiest way to make flashcards from your text
        </Typography>
        <SignedOut>
          <Button variant='contained' href='/sign-in' color='primary' sx={{ mt: 2 }}>
            Get Started
          </Button>
        </SignedOut>
        <SignedIn>
          <Button variant='contained' href='/generate' color='primary' sx={{ mt: 2 }}>
            Start making cards
          </Button>
        </SignedIn>
      </Box>
      <Box
        sx={{
          my: 6,
        }}
      >
        <Typography variant='h4' components='h2' gutterBottom>
          {' '}
          Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant='h6' gutterBottom>
              Easy Text Input
            </Typography>
            <Typography>
              {' '}
              Simply input your text adn let our software do the rest. Creating
              flashCards has never been easier.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant='h6' gutterBottom>
              Smart FlashCards
            </Typography>
            <Typography>
              {' '}
              Our AI intelligently breaks down your text into concise
              flashcards, perfect for stuying.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant='h6'>Accsible anywhere</Typography>
            <Typography>
              {' '}
              Aces your flashcards from any device at any time. Study on the go
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ my: 6, textAlign: 'center' }}>
        <Typography variant='h4' gutterBottom>
          Pricing
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 3,
                border: '1px solid',
                borderColor: 'grey.300',
                borderRadius: 2,
              }}
            >
              <Typography variant='h5' gutterBottom>
                Basic
              </Typography>
              <Typography variant='h6' gutterBottom>
                $5/Month
              </Typography>
              <Typography>
                {' '}
                Access to basic flashcard features and limited storage
              </Typography>
              <Button variant='contained' color='primary' sx={{ mt: 2 }}>
                {' '}
                Choose Basic
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 3,
                border: '1px solid',
                borderColor: 'grey.300',
                borderRadius: 2,
              }}
            >
              <Typography variant='h5' gutterBottom>
                Pro
              </Typography>
              <Typography variant='h6' gutterBottom>
                $10/Month
              </Typography>
              <Typography>
                {' '}
                Unlimited flashcards and storage, with priority support.
              </Typography>
              <Button variant='contained' color='primary' sx={{ mt: 2 }}>
                {' '}
                Choose Pro
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
