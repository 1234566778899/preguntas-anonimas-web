'use client';

import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Stack,
    Paper,
    Chip,
    Divider,
    Tabs,
    Tab,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
} from '@mui/material';
import {
    Replay,
    EmojiEvents,
    QuestionAnswer,
    Leaderboard,
} from '@mui/icons-material';
import { UserAvatar } from '@/components/common/UserAvatar';
import { AdminBadge } from '@/components/sala/AdminBadge';

export const Resultados = ({
    resultados = [],
    puntuaciones = [],
    esAdmin = false,
    onReiniciar,
}) => {
    const [tabActual, setTabActual] = useState(0);

    const handleCambiarTab = (event, nuevoValor) => {
        setTabActual(nuevoValor);
    };

    // Ordenar puntuaciones de mayor a menor
    const puntuacionesOrdenadas = [...puntuaciones].sort((a, b) => b.puntos - a.puntos);

    return (
        <Box sx={{ maxWidth: 900, mx: 'auto' }}>
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
                        background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                        color: 'white',
                        p: 3,
                        textAlign: 'center',
                    }}
                >
                    <EmojiEvents sx={{ fontSize: 56, mb: 1 }} />
                    <Typography variant="h4" fontWeight={700} gutterBottom>
                        🎉 ¡Resultados Finales! 🎉
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.95 }}>
                        Descubre quién escribió qué y las puntuaciones
                    </Typography>
                </Box>

                {/* Tabs */}
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        value={tabActual}
                        onChange={handleCambiarTab}
                        centered
                        sx={{
                            '& .MuiTab-root': {
                                fontWeight: 600,
                                fontSize: '1rem',
                            },
                        }}
                    >
                        <Tab icon={<Leaderboard />} label="Puntuaciones" />
                        <Tab icon={<QuestionAnswer />} label="Respuestas" />
                    </Tabs>
                </Box>

                <CardContent sx={{ p: 3 }}>
                    {/* Tab 0: Puntuaciones */}
                    {tabActual === 0 && (
                        <Stack spacing={3}>
                            <Typography variant="h6" fontWeight={600} textAlign="center">
                                🏆 Tabla de Posiciones
                            </Typography>

                            <List sx={{ bgcolor: 'background.paper' }}>
                                {puntuacionesOrdenadas.map((jugador, index) => {
                                    const esPrimero = index === 0;
                                    const esSegundo = index === 1;
                                    const esTercero = index === 2;

                                    return (
                                        <React.Fragment key={jugador.id}>
                                            <ListItem
                                                sx={{
                                                    py: 2,
                                                    bgcolor: esPrimero
                                                        ? '#fef3c7'
                                                        : esSegundo
                                                            ? '#e0e7ff'
                                                            : esTercero
                                                                ? '#fce7f3'
                                                                : 'transparent',
                                                    borderRadius: 2,
                                                    mb: 1,
                                                    animation: `slideInLeft 0.4s ease-out ${index * 0.1}s backwards`,
                                                }}
                                            >
                                                {/* Posición */}
                                                <Box
                                                    sx={{
                                                        minWidth: 50,
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    {esPrimero ? (
                                                        <Typography fontSize="2rem">🥇</Typography>
                                                    ) : esSegundo ? (
                                                        <Typography fontSize="2rem">🥈</Typography>
                                                    ) : esTercero ? (
                                                        <Typography fontSize="2rem">🥉</Typography>
                                                    ) : (
                                                        <Chip
                                                            label={`#${index + 1}`}
                                                            size="small"
                                                            sx={{ fontWeight: 700 }}
                                                        />
                                                    )}
                                                </Box>

                                                {/* Avatar y nombre */}
                                                <ListItemAvatar>
                                                    <UserAvatar
                                                        nombre={jugador.nombre}
                                                        esAdmin={jugador.esAdmin}
                                                        size={50}
                                                    />
                                                </ListItemAvatar>

                                                <ListItemText
                                                    primary={
                                                        <Stack direction="row" spacing={1} alignItems="center">
                                                            <Typography variant="h6" fontWeight={600}>
                                                                {jugador.nombre}
                                                            </Typography>
                                                            {jugador.esAdmin && <AdminBadge size="small" />}
                                                        </Stack>
                                                    }
                                                    secondary={`${jugador.aciertos || 0} aciertos`}
                                                />

                                                {/* Puntos */}
                                                <Box textAlign="right">
                                                    <Typography
                                                        variant="h5"
                                                        fontWeight={700}
                                                        color="primary.main"
                                                    >
                                                        {jugador.puntos}
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        puntos
                                                    </Typography>
                                                </Box>
                                            </ListItem>
                                            {index < puntuacionesOrdenadas.length - 1 && <Divider />}
                                        </React.Fragment>
                                    );
                                })}
                            </List>

                            {puntuacionesOrdenadas.length === 0 && (
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 3,
                                        bgcolor: '#f8fafc',
                                        textAlign: 'center',
                                        borderRadius: 2,
                                    }}
                                >
                                    <Typography color="text.secondary">
                                        No hay puntuaciones disponibles
                                    </Typography>
                                </Paper>
                            )}
                        </Stack>
                    )}

                    {/* Tab 1: Respuestas */}
                    {tabActual === 1 && (
                        <Stack spacing={3}>
                            {resultados.map((resultado, index) => (
                                <Card
                                    key={resultado.id}
                                    elevation={1}
                                    sx={{
                                        borderRadius: 3,
                                        animation: `slideInRight 0.4s ease-out ${index * 0.1}s backwards`,
                                    }}
                                >
                                    <CardContent sx={{ p: 3 }}>
                                        <Stack spacing={2}>
                                            {/* Pregunta */}
                                            <Box>
                                                <Chip
                                                    label={`Pregunta #${index + 1}`}
                                                    size="small"
                                                    color="primary"
                                                    sx={{ fontWeight: 700, mb: 1 }}
                                                />
                                                <Typography
                                                    variant="h6"
                                                    fontWeight={600}
                                                    sx={{
                                                        bgcolor: '#eff6ff',
                                                        p: 2,
                                                        borderRadius: 2,
                                                        border: '1px solid #bfdbfe',
                                                    }}
                                                >
                                                    {resultado.pregunta}
                                                </Typography>
                                                {resultado.autor && (
                                                    <Stack
                                                        direction="row"
                                                        spacing={1}
                                                        alignItems="center"
                                                        sx={{ mt: 1 }}
                                                    >
                                                        <Typography variant="caption" color="text.secondary">
                                                            Pregunta de:
                                                        </Typography>
                                                        <UserAvatar
                                                            nombre={resultado.autor}
                                                            size={20}
                                                            showAdminBadge={false}
                                                        />
                                                        <Typography variant="caption" fontWeight={600}>
                                                            {resultado.autor}
                                                        </Typography>
                                                    </Stack>
                                                )}
                                            </Box>

                                            <Divider />

                                            {/* Respuestas */}
                                            <Box>
                                                <Typography
                                                    variant="subtitle2"
                                                    color="text.secondary"
                                                    sx={{ mb: 1 }}
                                                >
                                                    Respuestas:
                                                </Typography>
                                                <Stack spacing={1}>
                                                    {resultado.respuestas?.map((respuesta, idx) => (
                                                        <Paper
                                                            key={idx}
                                                            elevation={0}
                                                            sx={{
                                                                p: 2,
                                                                bgcolor: '#f8fafc',
                                                                borderRadius: 2,
                                                                border: '1px solid #e2e8f0',
                                                            }}
                                                        >
                                                            <Stack
                                                                direction="row"
                                                                spacing={2}
                                                                alignItems="center"
                                                            >
                                                                <UserAvatar
                                                                    nombre={respuesta.autor || 'Anónimo'}
                                                                    size={32}
                                                                    showAdminBadge={false}
                                                                />
                                                                <Box flex={1}>
                                                                    <Typography variant="body2">
                                                                        "{respuesta.texto || respuesta}"
                                                                    </Typography>
                                                                    {respuesta.autor && (
                                                                        <Typography
                                                                            variant="caption"
                                                                            color="text.secondary"
                                                                        >
                                                                            - {respuesta.autor}
                                                                        </Typography>
                                                                    )}
                                                                </Box>
                                                            </Stack>
                                                        </Paper>
                                                    ))}
                                                </Stack>
                                            </Box>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            ))}

                            {resultados.length === 0 && (
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 3,
                                        bgcolor: '#f8fafc',
                                        textAlign: 'center',
                                        borderRadius: 2,
                                    }}
                                >
                                    <Typography color="text.secondary">
                                        No hay resultados disponibles
                                    </Typography>
                                </Paper>
                            )}
                        </Stack>
                    )}
                </CardContent>
            </Card>

            {/* Botón reiniciar (solo admin) */}
            {esAdmin && (
                <Card
                    elevation={3}
                    sx={{
                        borderRadius: 4,
                    }}
                >
                    <CardContent sx={{ p: 3 }}>
                        <Stack spacing={2}>
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
                                    💡 <strong>Admin:</strong> Puedes iniciar una nueva ronda
                                    cuando todos estén listos
                                </Typography>
                            </Paper>

                            <Button
                                variant="contained"
                                size="large"
                                startIcon={<Replay />}
                                onClick={onReiniciar}
                                fullWidth
                                sx={{
                                    py: 1.5,
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                                }}
                            >
                                Jugar Otra Ronda
                            </Button>
                        </Stack>
                    </CardContent>
                </Card>
            )}
        </Box>
    );
};