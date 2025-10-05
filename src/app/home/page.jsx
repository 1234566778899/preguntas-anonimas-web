'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Stack,
  Divider,
  Paper,
} from '@mui/material';
import { PlayArrow, Add, ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MENSAJES } from '@/utils/constants';
import { generarCodigoSala, validarCodigoSala } from '@/utils/helpers';

export default function HomePage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleCrearSala = () => {
    const codigo = generarCodigoSala();
    router.push(`/username/${codigo}`);
  };

  const handleUnirse = (data) => {
    const codigo = data.codigo.trim();

    if (!validarCodigoSala(codigo)) {
      showErrorToast(MENSAJES.CODIGO_INVALIDO);
      return;
    }

    router.push(`/username/${codigo}`);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(180deg, #f8fafc 0%, #e0e7ff 100%)',
      }}
    >
      <Navbar title="Empezar a Jugar" />

      <Container
        maxWidth="sm"
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          py: 4,
        }}
      >
        <Box sx={{ width: '100%' }}>
          {/* Botón volver */}
          <Button
            startIcon={<ArrowBack />}
            onClick={() => router.push('/')}
            sx={{ mb: 3 }}
          >
            Volver al inicio
          </Button>

          {/* Card principal */}
          <Card
            elevation={3}
            sx={{
              borderRadius: 4,
              overflow: 'hidden',
              animation: 'fadeIn 0.5s ease-out',
            }}
          >
            <Box
              sx={{
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                color: 'white',
                p: 3,
                textAlign: 'center',
              }}
            >
              <Typography variant="h4" fontWeight={700} gutterBottom>
                🎮 Empezar a Jugar
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.95 }}>
                Crea una nueva sala o únete con un código
              </Typography>
            </Box>

            <CardContent sx={{ p: 4 }}>
              <Stack spacing={4}>
                {/* Sección: Unirse a una sala */}
                <Box>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    gutterBottom
                    sx={{ mb: 2 }}
                  >
                    Unirse a una Sala
                  </Typography>

                  <form onSubmit={handleSubmit(handleUnirse)}>
                    <Stack spacing={2}>
                      <TextField
                        {...register('codigo', {
                          required: MENSAJES.CODIGO_REQUERIDO,
                          validate: {
                            length: (value) =>
                              validarCodigoSala(value) || MENSAJES.CODIGO_INVALIDO,
                          },
                        })}
                        label="Código de la Sala"
                        placeholder="Ej: 1234"
                        variant="outlined"
                        fullWidth
                        error={!!errors.codigo}
                        helperText={errors.codigo?.message}
                        inputProps={{
                          maxLength: 4,
                          style: { fontSize: '1.2rem', textAlign: 'center' },
                        }}
                        autoFocus
                      />

                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        startIcon={<PlayArrow />}
                        fullWidth
                        sx={{
                          py: 1.5,
                          fontSize: '1rem',
                          fontWeight: 600,
                        }}
                      >
                        Unirse a Sala
                      </Button>
                    </Stack>
                  </form>
                </Box>

                {/* Divider */}
                <Divider>
                  <Typography variant="body2" color="text.secondary">
                    O
                  </Typography>
                </Divider>

                {/* Sección: Crear nueva sala */}
                <Box>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    gutterBottom
                    sx={{ mb: 2 }}
                  >
                    Crear Nueva Sala
                  </Typography>

                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      bgcolor: '#f1f5f9',
                      borderRadius: 2,
                      mb: 2,
                    }}
                  >
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">
                        ✓ Serás el administrador de la sala
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ✓ Solo tú podrás iniciar las partidas
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ✓ Hasta 20 jugadores pueden unirse
                      </Typography>
                    </Stack>
                  </Paper>

                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<Add />}
                    fullWidth
                    onClick={handleCrearSala}
                    sx={{
                      py: 1.5,
                      fontSize: '1rem',
                      fontWeight: 600,
                      borderWidth: 2,
                      '&:hover': {
                        borderWidth: 2,
                      },
                    }}
                  >
                    Crear Sala Nueva
                  </Button>
                </Box>

                {/* Información adicional */}
                <Box
                  sx={{
                    p: 2,
                    bgcolor: '#eff6ff',
                    borderRadius: 2,
                    border: '1px solid #bfdbfe',
                  }}
                >
                  <Typography variant="body2" color="primary.dark">
                    💡 <strong>Tip:</strong> Comparte el código de la sala con
                    tus amigos para que puedan unirse
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          {/* Estadísticas rápidas */}
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            sx={{ mt: 3 }}
          >
            <Paper
              elevation={0}
              sx={{
                px: 3,
                py: 1.5,
                bgcolor: 'rgba(255,255,255,0.8)',
                backdropFilter: 'blur(10px)',
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" fontWeight={700} color="primary.main">
                1000+
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Partidas hoy
              </Typography>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                px: 3,
                py: 1.5,
                bgcolor: 'rgba(255,255,255,0.8)',
                backdropFilter: 'blur(10px)',
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" fontWeight={700} color="secondary.main">
                500+
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Salas activas
              </Typography>
            </Paper>
          </Stack>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
}