'use client';

import React, { useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Stack,
  Paper,
  Chip,
} from '@mui/material';
import {
  Person,
  ArrowForward,
  ArrowBack,
  VpnKey,
} from '@mui/icons-material';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { formatearNombre } from '@/utils/helpers';
import { MENSAJES } from '@/utils/constants';

export default function UsernamePage() {
  const router = useRouter();
  const params = useParams();
  const codigo = params.codigo;
  const [, setNombre] = useLocalStorage('name', '');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  // Auto-navegar si ya tiene nombre guardado (opcional, puedes comentar esto)
  // useEffect(() => {
  //   const nombreGuardado = localStorage.getItem('name');
  //   if (nombreGuardado) {
  //     setValue('name', JSON.parse(nombreGuardado));
  //   }
  // }, [setValue]);

  const handleContinuar = (data) => {
    const nombreFormateado = formatearNombre(data.name);
    setNombre(nombreFormateado);
    router.push(`/sala/${codigo}`);
  };

  const handleVolver = () => {
    router.push('/home');
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
      <Navbar title="Configurar Usuario" />

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
            onClick={handleVolver}
            sx={{ mb: 3 }}
          >
            Cambiar sala
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
            {/* Header */}
            <Box
              sx={{
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                color: 'white',
                p: 3,
                textAlign: 'center',
              }}
            >
              <Person sx={{ fontSize: 48, mb: 1 }} />
              <Typography variant="h4" fontWeight={700} gutterBottom>
                ¿Cómo te llamas?
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.95 }}>
                Elige un nombre para empezar a jugar
              </Typography>
            </Box>

            <CardContent sx={{ p: 4 }}>
              <Stack spacing={3}>
                {/* Código de sala */}
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    bgcolor: '#f1f5f9',
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <VpnKey sx={{ color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      Código de la sala:
                    </Typography>
                  </Stack>
                  <Chip
                    label={codigo}
                    sx={{
                      fontWeight: 700,
                      fontSize: '1.2rem',
                      bgcolor: 'primary.main',
                      color: 'white',
                      px: 1,
                    }}
                  />
                </Paper>

                {/* Formulario */}
                <form onSubmit={handleSubmit(handleContinuar)}>
                  <Stack spacing={3}>
                    <Box>
                      <TextField
                        {...register('name', {
                          required: MENSAJES.NOMBRE_REQUERIDO,
                          minLength: {
                            value: 2,
                            message: 'El nombre debe tener al menos 2 caracteres',
                          },
                          maxLength: {
                            value: 20,
                            message: 'El nombre no puede exceder 20 caracteres',
                          },
                        })}
                        label="Tu Nombre"
                        placeholder="Ej: Juan Pérez"
                        variant="outlined"
                        fullWidth
                        error={!!errors.name}
                        helperText={
                          errors.name?.message ||
                          'Tu nombre será visible para todos los jugadores'
                        }
                        autoFocus
                        inputProps={{
                          maxLength: 20,
                        }}
                      />
                    </Box>

                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      endIcon={<ArrowForward />}
                      fullWidth
                      sx={{
                        py: 1.5,
                        fontSize: '1rem',
                        fontWeight: 600,
                      }}
                    >
                      Continuar a la Sala
                    </Button>
                  </Stack>
                </form>
              </Stack>
            </CardContent>
          </Card>

          {/* Mensaje de privacidad */}
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="caption" color="text.secondary">
              🔒 Tus datos son privados y solo se usan durante la partida
            </Typography>
          </Box>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
}