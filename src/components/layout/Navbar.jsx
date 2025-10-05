
'use client';

import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box, IconButton } from '@mui/material';
import { QuestionAnswer } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

export const Navbar = ({ title }) => {
  const router = useRouter();

  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ py: 1 }}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => router.push('/')}
            sx={{ mr: 2 }}
          >
            <QuestionAnswer sx={{ fontSize: 32 }} />
          </IconButton>
          
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 1,
              fontWeight: 700,
              textAlign: 'center',
              fontSize: { xs: '1rem', sm: '1.25rem' }
            }}
          >
            {title || 'Preguntas Anónimas'}
          </Typography>

          {/* Espacio para mantener el título centrado */}
          <Box sx={{ width: 48 }} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
