'use client';

import React from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Stack,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Chip,
    Divider,
    Paper,
} from '@mui/material';
import {
    PlayArrow,
    ExitToApp,
    People,
    Edit,
} from '@mui/icons-material';
import { UserAvatar } from '@/components/common/UserAvatar';
import { AdminBadge } from '@/components/sala/AdminBadge';

export const SalaEspera = ({
    usuarios = [],
    esAdmin = false,
    nombreUsuario = '',
    onEmpezar,
    onSalir,
    onCambiarNombre,
}) => {
    // Filtrar duplicados por si acaso
    const usuariosUnicos = usuarios.filter(
        (usuario, index, self) =>
            index === self.findIndex((u) => u.id === usuario.id)
    );

    return (
        <Card
            elevation={3}
            sx={{
                maxWidth: 600,
                mx: 'auto',
                borderRadius: 4,
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
                <People sx={{ fontSize: 48, mb: 1 }} />
                <Typography variant="h5" fontWeight={700} gutterBottom>
                    Sala de Espera
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.95 }}>
                    {esAdmin
                        ? '¡Eres el administrador! Inicia cuando todos estén listos'
                        : 'Esperando a que el admin inicie la partida'}
                </Typography>
            </Box>

            <CardContent sx={{ p: 3 }}>
                <Stack spacing={3}>
                    {/* Contador de jugadores */}
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
                        <Typography variant="body1" fontWeight={600}>
                            Jugadores conectados
                        </Typography>
                        <Chip
                            label={`${usuariosUnicos.length} / 20`}
                            color="primary"
                            sx={{ fontWeight: 700 }}
                        />
                    </Paper>

                    {/* Lista de usuarios */}
                    <Box>
                        <Typography
                            variant="subtitle2"
                            color="text.secondary"
                            sx={{ mb: 1, px: 1 }}
                        >
                            En la sala:
                        </Typography>
                        <List
                            sx={{
                                maxHeight: 300,
                                overflow: 'auto',
                                bgcolor: 'background.paper',
                                borderRadius: 2,
                                border: '1px solid',
                                borderColor: 'divider',
                            }}
                        >
                            {usuariosUnicos.map((usuario, index) => (
                                <React.Fragment key={`usuario-${usuario.id}-${index}`}>
                                    <ListItem
                                        sx={{
                                            py: 1.5,
                                            animation: `slideInLeft 0.3s ease-out ${index * 0.05}s backwards`,
                                        }}
                                    >
                                        <ListItemAvatar>
                                            <UserAvatar
                                                nombre={usuario.name}
                                                esAdmin={usuario.esAdmin}
                                                size={45}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    <Typography variant="body1" fontWeight={600}>
                                                        {usuario.name}
                                                    </Typography>
                                                    {usuario.esAdmin && <AdminBadge size="small" />}
                                                    {usuario.name === nombreUsuario && (
                                                        <Chip
                                                            label="Tú"
                                                            size="small"
                                                            sx={{
                                                                bgcolor: 'secondary.light',
                                                                color: 'white',
                                                                height: 20,
                                                            }}
                                                        />
                                                    )}
                                                </Stack>
                                            }
                                            secondary={usuario.esAdmin ? 'Administrador' : 'Jugador'}
                                        />
                                    </ListItem>
                                    {index < usuariosUnicos.length - 1 && <Divider variant="inset" />}
                                </React.Fragment>
                            ))}

                            {usuariosUnicos.length === 0 && (
                                <ListItem>
                                    <ListItemText
                                        primary="No hay jugadores aún"
                                        sx={{ textAlign: 'center', color: 'text.secondary' }}
                                    />
                                </ListItem>
                            )}
                        </List>
                    </Box>

                    {/* Información */}
                    {esAdmin ? (
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
                                💡 <strong>Como admin puedes:</strong>
                            </Typography>
                            <Typography variant="caption" color="text.secondary" component="div">
                                • Iniciar la partida cuando todos estén listos
                                <br />
                                • Reiniciar el juego al finalizar
                                <br />• Controlar el flujo del juego
                            </Typography>
                        </Paper>
                    ) : (
                        <Paper
                            elevation={0}
                            sx={{
                                p: 2,
                                bgcolor: '#f0fdf4',
                                borderRadius: 2,
                                border: '1px solid #bbf7d0',
                            }}
                        >
                            <Typography variant="body2" color="success.dark">
                                ✓ Esperando a que el administrador inicie el juego...
                            </Typography>
                        </Paper>
                    )}

                    {/* Botones de acción */}
                    <Stack spacing={2}>
                        {esAdmin && (
                            <Button
                                variant="contained"
                                size="large"
                                startIcon={<PlayArrow />}
                                onClick={onEmpezar}
                                disabled={usuariosUnicos.length < 2}
                                fullWidth
                                sx={{
                                    py: 1.5,
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                }}
                            >
                                {usuariosUnicos.length < 2
                                    ? 'Necesitas al menos 2 jugadores'
                                    : 'Empezar Partida'}
                            </Button>
                        )}

                        <Stack direction="row" spacing={2}>
                            <Button
                                variant="outlined"
                                startIcon={<Edit />}
                                onClick={onCambiarNombre}
                                fullWidth
                            >
                                Cambiar Nombre
                            </Button>
                            <Button
                                variant="outlined"
                                color="error"
                                startIcon={<ExitToApp />}
                                onClick={onSalir}
                                fullWidth
                            >
                                Salir
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
};