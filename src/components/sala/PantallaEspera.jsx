'use client';

import React from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Stack,
    LinearProgress,
    Chip,
} from '@mui/material';
import { HourglassEmpty, CheckCircle } from '@mui/icons-material';

export const PantallaEspera = ({
    mensaje = 'Esperando a los demás...',
    cantidadPendiente = 0,
    totalJugadores = 0,
    tipo = 'preguntas', // 'preguntas', 'respuestas', 'votos'
}) => {
    const completados = totalJugadores - cantidadPendiente;
    const porcentaje = totalJugadores > 0 ? (completados / totalJugadores) * 100 : 0;

    const getEmoji = () => {
        switch (tipo) {
            case 'preguntas':
                return '❓';
            case 'respuestas':
                return '✍️';
            case 'votos':
                return '🗳️';
            default:
                return '⏳';
        }
    };

    const getMensaje = () => {
        switch (tipo) {
            case 'preguntas':
                return 'Esperando que todos envíen sus preguntas';
            case 'respuestas':
                return 'Esperando que todos respondan las preguntas';
            case 'votos':
                return 'Esperando que todos terminen de votar';
            default:
                return mensaje;
        }
    };

    return (
        <Card
            elevation={3}
            sx={{
                maxWidth: 500,
                mx: 'auto',
                borderRadius: 4,
                animation: 'fadeIn 0.5s ease-out',
            }}
        >
            <CardContent sx={{ p: 4 }}>
                <Stack spacing={4} alignItems="center" textAlign="center">
                    {/* Emoji animado */}
                    <Box
                        sx={{
                            fontSize: '5rem',
                            animation: 'pulse 2s ease-in-out infinite',
                        }}
                    >
                        {getEmoji()}
                    </Box>

                    {/* Título */}
                    <Typography variant="h5" fontWeight={700}>
                        {getMensaje()}
                    </Typography>

                    {/* Progreso */}
                    <Box sx={{ width: '100%' }}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{ mb: 1 }}
                        >
                            <Typography variant="body2" color="text.secondary">
                                Progreso
                            </Typography>
                            <Chip
                                icon={cantidadPendiente === 0 ? <CheckCircle /> : <HourglassEmpty />}
                                label={`${completados} / ${totalJugadores}`}
                                color={cantidadPendiente === 0 ? 'success' : 'primary'}
                                size="small"
                            />
                        </Stack>

                        <LinearProgress
                            variant="determinate"
                            value={porcentaje}
                            sx={{
                                height: 8,
                                borderRadius: 4,
                                bgcolor: '#e2e8f0',
                                '& .MuiLinearProgress-bar': {
                                    borderRadius: 4,
                                },
                            }}
                        />

                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ display: 'block', mt: 0.5 }}
                        >
                            {porcentaje.toFixed(0)}% completado
                        </Typography>
                    </Box>

                    {/* Mensaje de estado */}
                    {cantidadPendiente > 0 ? (
                        <Box
                            sx={{
                                p: 2,
                                bgcolor: '#fef3c7',
                                borderRadius: 2,
                                border: '1px solid #fde68a',
                                width: '100%',
                            }}
                        >
                            <Typography variant="body2" color="warning.dark">
                                <strong>Faltan {cantidadPendiente}</strong>{' '}
                                {cantidadPendiente === 1 ? 'jugador' : 'jugadores'}
                            </Typography>
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                p: 2,
                                bgcolor: '#d1fae5',
                                borderRadius: 2,
                                border: '1px solid #a7f3d0',
                                width: '100%',
                            }}
                        >
                            <Typography variant="body2" color="success.dark">
                                ✓ ¡Todos completaron! Pasando a la siguiente fase...
                            </Typography>
                        </Box>
                    )}

                    {/* Tip */}
                    <Box
                        sx={{
                            p: 2,
                            bgcolor: '#eff6ff',
                            borderRadius: 2,
                            border: '1px solid #bfdbfe',
                            width: '100%',
                        }}
                    >
                        <Typography variant="caption" color="primary.dark">
                            💡 Mientras esperas, puedes tomar un descanso o prepararte para la
                            siguiente ronda
                        </Typography>
                    </Box>

                    {/* Animación de carga */}
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 1,
                            '& > div': {
                                width: 12,
                                height: 12,
                                borderRadius: '50%',
                                bgcolor: 'primary.main',
                                animation: 'pulse 1.5s ease-in-out infinite',
                            },
                            '& > div:nth-of-type(2)': {
                                animationDelay: '0.3s',
                            },
                            '& > div:nth-of-type(3)': {
                                animationDelay: '0.6s',
                            },
                        }}
                    >
                        <Box />
                        <Box />
                        <Box />
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
};