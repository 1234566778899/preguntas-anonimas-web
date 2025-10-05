'use client';

import React from 'react';
import { Box, Container, Typography, Link, Stack } from '@mui/material';
import { Favorite, GitHub } from '@mui/icons-material';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        px: 2,
        mt: 'auto',
        backgroundColor: '#f8fafc',
        borderTop: '1px solid #e2e8f0',
      }}
    >
      <Container maxWidth="lg">
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
          >
            Hecho con <Favorite sx={{ fontSize: 16, color: '#ec4899' }} /> por tu equipo
          </Typography>

          <Typography variant="body2" color="text.secondary">
            © {currentYear} Preguntas Anónimas v2.0
          </Typography>

          <Stack direction="row" spacing={2}>
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              color="text.secondary"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                textDecoration: 'none',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              <GitHub sx={{ fontSize: 20 }} />
              GitHub
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};