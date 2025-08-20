import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Container, Typography, Button, Box } from "@mui/material";

function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGoToUsers = () => {
    if (user) {
      navigate("/users");
    } else {
      navigate("/signin");
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="h3" component="h1" gutterBottom>
          SPS REACT TEST
        </Typography>
        
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Sistema de Gerenciamento de Usuários
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={handleGoToUsers}
          sx={{ mt: 2 }}
        >
          {user ? "Gerenciar Usuários" : "Fazer Login"}
        </Button>
      </Box>
    </Container>
  );
}

export default Home;
