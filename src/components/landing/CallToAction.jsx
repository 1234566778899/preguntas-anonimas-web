'use client';

import React from 'react';
import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { PlayArrow, PersonAdd } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

export const CallToAction = () => {
  const router = useRouter();

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decoración de fondo */}
      <Box
        sx={{
          position: 'absolute',
          top: '-50%',
          right: '-10%',
          width: '50%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
        }}
      />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <Stack spacing={4} alignItems="center" textAlign="center">
          {/* Emoji decorativo */}
          <Typography sx={{ fontSize: '4rem' }}>🎉</Typography>

          {/* Título */}
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 700,
            }}
          >
            ¿Listo para Divertirte?
          </Typography>

          {/* Descripción */}
          <Typography
            variant="h6"
            sx={{
              maxWidth: 600,
              opacity: 0.95,
            }}
          >
            Únete a miles de jugadores que ya están descubriendo secretos y
            riéndose con sus amigos
          </Typography>

          {/* Botones */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{ width: { xs: '100%', sm: 'auto' } }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<PlayArrow />}
              onClick={() => router.push('/home')}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                px: 5,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 700,
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.9)',
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Comenzar a Jugar
            </Button>

            <Button
              variant="outlined"
              size="large"
              startIcon={<PersonAdd />}
              onClick={() => router.push('/home')}
              sx={{
                borderColor: 'white',
                color: 'white',
                px: 5,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 700,
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                  borderColor: 'white',
                  bgcolor: 'rgba(255,255,255,0.1)',
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Crear Sala Gratis
            </Button>
          </Stack>

          {/* Texto pequeño */}
          <Typography variant="body2" sx={{ opacity: 0.8, mt: 2 }}>
            No requiere registro • Gratis para siempre • Empieza en segundos
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};