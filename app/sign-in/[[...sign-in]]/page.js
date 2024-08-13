
"use client"
import { SignIn } from "@clerk/clerk-react";
import { AppBar, Box, Button, Container, Toolbar, Typography, Link } from "@mui/material";


export default function SignUpPage(){
    return (
        <Container maxWidth="sm">
            <AppBar position = "static" sx={{backgroundColor:"#3f51b5"}}>
                <Toolbar>
                    <Typography variant="h6" sx={{
                        flexGrow:1
                    }}>FlashCard Sass</Typography>
                    <Button color="inherit">
                        <Link href="/login" passHref>
                        Login
                        </Link>
                    </Button>
                    <Button color="inherit">
                        <Link href="/signup" passHref>
                        Signup
                        </Link>
                    </Button>
                </Toolbar>
            </AppBar>
            <Box display="flex" 
            flexDirection="column" 
            alignItems="center"
            justifyContent="center">
                <Typography variant ="h4">Sign In</Typography>
                <SignIn />
                
                

                
            </Box>
           
        </Container>
    )
}