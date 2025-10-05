'use client';

import React from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Stack,
    Paper,
    Chip,
    LinearProgress,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@mui/material';
import { Send, HowToVote } from '@mui/icons-material';
import { UserAvatar } from '@/components/common/UserAvatar';

export const VotarRespuestas = ({
    preguntas = [],
    usuarios = [],
    votos = {},
    onCambiarVoto,
    onEnviarVotos,
}) => {
    // Calcular progreso
    const totalRespuestas = preguntas.reduce(
        (sum, p) => sum + (p.respuestas?.length || 0),
        0
    );
    const votosCompletados = Object.keys(votos).length;
    const porcentaje = totalRespuestas > 0 ? (votosCompletados / totalRespuestas) * 100 : 0;

    const handleEnviar = () => {
        if (porcentaje < 100) return;
        onEnviarVotos();
    };

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
            <Card
                elevation={3}
                sx={{
                    borderRadius: 4,
                    animation: 'fadeIn 0.5s ease-out',
                    mb: 3,
                }}
            >
                {/* Header */}
                <Box
                    sx={{
                        background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
                        color: 'white',
                        p: 3,
                        textAlign: 'center',
                    }}
                >
                    <HowToVote sx={{ fontSize: 48, mb: 1 }} />
                    <Typography variant="h5" fontWeight={700} gutterBottom>
                        ¿Quién escribió qué?
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.95 }}>
                        Adivina quién escribió cada respuesta y gana puntos
                    </Typography>
                </Box>

                <CardContent sx={{ p: 3 }}>
                    <Stack spacing={2}>
                        {/* Progreso */}
                        <Paper
                            elevation={0}
                            sx={{
                                p: 2,
                                bgcolor: '#f1f5f9',
                                borderRadius: 2,
                            }}
                        >
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                sx={{ mb: 1 }}
                            >
                                <Typography variant="body2" fontWeight={600}>
                                    Progreso de votación
                                </Typography>
                                <Chip
                                    label={`${votosCompletados} / ${totalRespuestas}`}
                                    color={porcentaje === 100 ? 'success' : 'warning'}
                                    size="small"
                                />
                            </Stack>
                            <LinearProgress
                                variant="determinate"
                                value={porcentaje}
                                sx={{
                                    height: 6,
                                    borderRadius: 3,
                                    bgcolor: '#fef3c7',
                                    '& .MuiLinearProgress-bar': {
                                        bgcolor: '#f59e0b',
                                    },
                                }}
                            />
                        </Paper>

                        {/* Información */}
                        <Paper
                            elevation={0}
                            sx={{
                                p: 2,
                                bgcolor: '#eff6ff',
                                borderRadius: 2,
                                border: '1px solid #bfdbfe',
                            }}
                        >
                            <Typography variant="body2" color="primary.dark">
                                🎯 <strong>Cómo funciona:</strong> Por cada respuesta que adivines
                                correctamente, ganarás 10 puntos. ¡Usa tu intuición!
                            </Typography>
                        </Paper>
                    </Stack>
                </CardContent>
            </Card>

            {/* Lista de preguntas y respuestas para votar */}
            <Stack spacing={3}>
                {preguntas.map((pregunta, indexPregunta) => (
                    <Card
                        key={pregunta.id}
                        elevation={2}
                        sx={{
                            borderRadius: 3,
                            animation: `slideInLeft 0.4s ease-out ${indexPregunta * 0.1}s backwards`,
                        }}
                    >
                        <CardContent sx={{ p: 3 }}>
                            <Stack spacing={3}>
                                {/* Pregunta */}
                                <Box>
                                    <Chip
                                        label={`Pregunta #${indexPregunta + 1}`}
                                        size="small"
                                        color="warning"
                                        sx={{ fontWeight: 700, mb: 1 }}
                                    />
                                    <Typography
                                        variant="h6"
                                        fontWeight={600}
                                        sx={{
                                            bgcolor: '#fef3c7',
                                            p: 2,
                                            borderRadius: 2,
                                            border: '1px solid #fde68a',
                                        }}
                                    >
                                        {pregunta.pregunta}
                                    </Typography>
                                </Box>

                                {/* Respuestas para votar */}
                                <Box>
                                    <Typography
                                        variant="subtitle2"
                                        color="text.secondary"
                                        sx={{ mb: 2 }}
                                    >
                                        Selecciona quién crees que escribió cada respuesta:
                                    </Typography>

                                    <Stack spacing={2}>
                                        {pregunta.respuestas?.map((respuesta, indexRespuesta) => {
                                            const respuestaId = `${pregunta.id}-${indexRespuesta}`;
                                            const votoActual = votos[respuestaId];

                                            return (
                                                <Paper
                                                    key={indexRespuesta}
                                                    elevation={0}
                                                    sx={{
                                                        p: 2,
                                                        bgcolor: votoActual ? '#f0fdf4' : '#f8fafc',
                                                        border: '2px solid',
                                                        borderColor: votoActual ? '#10b981' : '#e2e8f0',
                                                        borderRadius: 2,
                                                    }}
                                                >
                                                    <Stack spacing={2}>
                                                        {/* La respuesta */}
                                                        <Box
                                                            sx={{
                                                                p: 2,
                                                                bgcolor: 'white',
                                                                borderRadius: 1,
                                                                border: '1px solid #e2e8f0',
                                                            }}
                                                        >
                                                            <Typography variant="body1">
                                                                "{respuesta}"
                                                            </Typography>
                                                        </Box>

                                                        {/* Selector de usuario */}
                                                        <FormControl component="fieldset">
                                                            <Typography
                                                                variant="caption"
                                                                color="text.secondary"
                                                                sx={{ mb: 1 }}
                                                            >
                                                                ¿Quién lo escribió?
                                                            </Typography>
                                                            <RadioGroup
                                                                value={votoActual || ''}
                                                                onChange={(e) =>
                                                                    onCambiarVoto(respuestaId, e.target.value)
                                                                }
                                                            >
                                                                <Stack
                                                                    direction="row"
                                                                    flexWrap="wrap"
                                                                    gap={1}
                                                                >
                                                                    {usuarios.map((usuario) => (
                                                                        <FormControlLabel
                                                                            key={usuario.id}
                                                                            value={usuario.id}
                                                                            control={<Radio size="small" />}
                                                                            label={
                                                                                <Stack
                                                                                    direction="row"
                                                                                    spacing={1}
                                                                                    alignItems="center"
                                                                                >
                                                                                    <UserAvatar
                                                                                        nombre={usuario.name}
                                                                                        esAdmin={usuario.esAdmin}
                                                                                        size={24}
                                                                                        showAdminBadge={false}
                                                                                    />
                                                                                    <Typography variant="body2">
                                                                                        {usuario.name}
                                                                                    </Typography>
                                                                                </Stack>
                                                                            }
                                                                            sx={{
                                                                                m: 0,
                                                                                px: 1.5,
                                                                                py: 0.5,
                                                                                borderRadius: 2,
                                                                                bgcolor:
                                                                                    votoActual === usuario.id
                                                                                        ? 'primary.light'
                                                                                        : 'transparent',
                                                                                color:
                                                                                    votoActual === usuario.id
                                                                                        ? 'white'
                                                                                        : 'inherit',
                                                                                '& .MuiFormControlLabel-label': {
                                                                                    color:
                                                                                        votoActual === usuario.id
                                                                                            ? 'white'
                                                                                            : 'inherit',
                                                                                },
                                                                            }}
                                                                        />
                                                                    ))}
                                                                </Stack>
                                                            </RadioGroup>
                                                        </FormControl>
                                                    </Stack>
                                                </Paper>
                                            );
                                        })}
                                    </Stack>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                ))}
            </Stack>

            {/* Botón enviar */}
            <Card
                elevation={3}
                sx={{
                    borderRadius: 4,
                    mt: 3,
                    position: 'sticky',
                    bottom: 16,
                    zIndex: 10,
                }}
            >
                <CardContent sx={{ p: 3 }}>
                    <Button
                        variant="contained"
                        size="large"
                        endIcon={<Send />}
                        fullWidth
                        onClick={handleEnviar}
                        disabled={porcentaje < 100}
                        sx={{
                            py: 1.5,
                            fontSize: '1rem',
                            fontWeight: 600,
                            background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
                        }}
                    >
                        {porcentaje < 100
                            ? `Completa todas las votaciones (${votosCompletados}/${totalRespuestas})`
                            : 'Enviar Todos los Votos'}
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
};