'use client';

import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Stack } from '@mui/material';
import {
  QuestionAnswer,
  Groups,
  EmojiEvents,
  Security,
  Speed,
  Celebration,
} from '@mui/icons-material';

const features = [
  {
    icon: QuestionAnswer,
    title: 'Preguntas Anónimas',
    description: 'Haz preguntas sin revelar tu identidad y descubre lo que piensan tus amigos',
    color: '#6366f1',
  },
  {
    icon: Groups,
    title: 'Multijugador',
    description: 'Juega con hasta 20 personas al mismo tiempo en salas privadas',
    color: '#ec4899',
  },
  {
    icon: EmojiEvents,
    title: 'Sistema de Votación',
    description: 'Adivina quién escribió cada respuesta y gana puntos por cada acierto',
    color: '#f59e0b',
  },
  {
    icon: Security,
    title: '100% Privado',
    description: 'Tus respuestas son anónimas. Nadie sabrá qué escribiste hasta el final',
    color: '#10b981',
  },
  {
    icon: Speed,
    title: 'Tiempo Real',
    description: 'Conexión instantánea con Socket.io para una experiencia fluida',
    color: '#3b82f6',
  },
  {
    icon: Celebration,
    title: 'Divertido',
    description: 'Descubre secretos, opiniones y personalidades de tus amigos',
    color: '#8b5cf6',
  },
];

export const FeaturesSection = () => {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Stack spacing={6}>
          {/* Título de sección */}
          <Box textAlign="center">
            <Typography
              variant="h2"
              gutterBottom
              sx={{
                fontSize: { xs: '2rem', md: '3rem' },
                fontWeight: 700,
                color: 'text.primary',
              }}
            >
              ¿Por qué Preguntas Anónimas?
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto' }}
            >
              Todas las características que necesitas para una experiencia
              divertida y única
            </Typography>
          </Box>

          {/* Grid de características */}
          <Grid container spacing={3}>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                  <Card
                    className="card-hover"
                    sx={{
                      height: '100%',
                      border: '1px solid',
                      borderColor: 'divider',
                      animation: `fadeIn 0.6s ease-out ${index * 0.1}s backwards`,
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: 2,
                          bgcolor: `${feature.color}15`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 2,
                        }}
                      >
                        <Icon sx={{ fontSize: 32, color: feature.color }} />
                      </Box>
                      <Typography variant="h6" gutterBottom fontWeight={600}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
};