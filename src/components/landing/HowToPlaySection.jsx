'use client';

import React from 'react';
import { Box, Container, Typography, Stack, Paper } from '@mui/material';
import {
  PersonAdd,
  Create,
  QuestionAnswer,
  HowToVote,
  EmojiEvents,
  Replay,
} from '@mui/icons-material';

const steps = [
  {
    icon: PersonAdd,
    number: '01',
    title: 'Crear o Unirse',
    description: 'Crea una nueva sala o únete con un código de 4 dígitos',
  },
  {
    icon: Create,
    number: '02',
    title: 'Hacer Pregunta',
    description: 'Cada jugador escribe una pregunta anónima',
  },
  {
    icon: QuestionAnswer,
    number: '03',
    title: 'Responder',
    description: 'Todos responden todas las preguntas (incluida la propia)',
  },
  {
    icon: HowToVote,
    number: '04',
    title: 'Votar',
    description: 'Adivina quién escribió cada respuesta',
  },
  {
    icon: EmojiEvents,
    number: '05',
    title: 'Resultados',
    description: 'Ve las respuestas reales y tu puntuación',
  },
  {
    icon: Replay,
    number: '06',
    title: 'Repetir',
    description: '¡Juega otra ronda para más diversión!',
  },
];

export const HowToPlaySection = () => {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={6}>
          {/* Título */}
          <Box textAlign="center">
            <Typography
              variant="h2"
              gutterBottom
              sx={{
                fontSize: { xs: '2rem', md: '3rem' },
                fontWeight: 700,
              }}
            >
              ¿Cómo se Juega?
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Es súper fácil, solo sigue estos pasos
            </Typography>
          </Box>

          {/* Steps */}
          <Stack spacing={3}>
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <Paper
                  key={index}
                  elevation={0}
                  sx={{
                    p: 3,
                    border: '2px solid',
                    borderColor: 'divider',
                    borderRadius: 3,
                    animation: `slideIn${isEven ? 'Left' : 'Right'} 0.6s ease-out ${index * 0.1}s backwards`,
                    '&:hover': {
                      borderColor: 'primary.main',
                      transform: 'translateX(8px)',
                      transition: 'all 0.3s ease',
                    },
                  }}
                >
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={3}
                    alignItems="center"
                  >
                    {/* Número */}
                    <Box
                      sx={{
                        minWidth: 80,
                        height: 80,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 800,
                        fontSize: '1.5rem',
                      }}
                    >
                      {step.number}
                    </Box>

                    {/* Icono */}
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: 2,
                        bgcolor: 'primary.light',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon sx={{ fontSize: 32, color: 'white' }} />
                    </Box>

                    {/* Contenido */}
                    <Box flex={1}>
                      <Typography variant="h5" gutterBottom fontWeight={600}>
                        {step.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {step.description}
                      </Typography>
                    </Box>
                  </Stack>
                </Paper>
              );
            })}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};