'use client';

import React from 'react';
import { Box, Typography, Button, Container, Stack } from '@mui/material';
import { PlayArrow, GroupAdd } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

export const HeroSection = () => {
  const router = useRouter();

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
        color: 'white',
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decoración de fondo */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          background: `
            radial-gradient(circle at 20% 50%, white 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, white 0%, transparent 50%)
          `,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Stack spacing={4} alignItems="center" textAlign="center">
          {/* Título principal */}
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
              fontWeight: 800,
              animation: 'fadeIn 1s ease-out',
            }}
          >
            Preguntas Anónimas
          </Typography>

          {/* Subtítulo */}
          <Typography
            variant="h5"
            sx={{
              maxWidth: 700,
              fontSize: { xs: '1.1rem', md: '1.5rem' },
              fontWeight: 400,
              opacity: 0.95,
              animation: 'fadeIn 1s ease-out 0.2s backwards',
            }}
          >
            Diviértete con tus amigos respondiendo preguntas anónimas y
            adivinando quién escribió cada respuesta
          </Typography>

          {/* Características rápidas */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={3}
            sx={{
              animation: 'fadeIn 1s ease-out 0.4s backwards',
            }}
          >
            {[
              '🎭 100% Anónimo',
              '🎮 Multijugador',
              '⚡ Tiempo Real',
              '🏆 Sistema de Puntos',
            ].map((feature) => (
              <Box
                key={feature}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(10px)',
                  px: 3,
                  py: 1.5,
                  borderRadius: 3,
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              >
                <Typography variant="body1" fontWeight={600}>
                  {feature}
                </Typography>
              </Box>
            ))}
          </Stack>

          {/* Botones de acción */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{
              width: { xs: '100%', sm: 'auto' },
              animation: 'fadeIn 1s ease-out 0.6s backwards',
            }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<PlayArrow />}
              onClick={() => router.push('/home')}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 700,
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.9)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Jugar Ahora
            </Button>

            <Button
              variant="outlined"
              size="large"
              startIcon={<GroupAdd />}
              onClick={() => router.push('/home')}
              sx={{
                borderColor: 'white',
                color: 'white',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 700,
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                  borderColor: 'white',
                  bgcolor: 'rgba(255,255,255,0.1)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Crear Sala
            </Button>
          </Stack>

          {/* Estadísticas */}
          <Stack
            direction="row"
            spacing={4}
            sx={{
              mt: 4,
              animation: 'fadeIn 1s ease-out 0.8s backwards',
            }}
          >
            {[
              { number: '1000+', label: 'Partidas Jugadas' },
              { number: '5000+', label: 'Jugadores' },
              { number: '50K+', label: 'Preguntas' },
            ].map((stat) => (
              <Box key={stat.label} textAlign="center">
                <Typography variant="h4" fontWeight={700}>
                  {stat.number}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
