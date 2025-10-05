'use client';

import React from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Stack,
    Paper,
    Chip,
    LinearProgress,
} from '@mui/material';
import { Send, QuestionAnswer } from '@mui/icons-material';

export const ResponderPreguntas = ({
    preguntas = [],
    respuestas = {},
    onCambiarRespuesta,
    onEnviarRespuestas,
}) => {
    const totalPreguntas = preguntas.length;
    const respuestasCompletadas = Object.values(respuestas).filter(
        (r) => r && r.trim() !== ''
    ).length;
    const porcentaje = totalPreguntas > 0 ? (respuestasCompletadas / totalPreguntas) * 100 : 0;

    const handleEnviar = () => {
        // Validar que todas las preguntas tengan respuesta
        const todasRespondidas = preguntas.every(
            (p) => respuestas[p.id] && respuestas[p.id].trim() !== ''
        );

        if (!todasRespondidas) {
            return; // El botón debería estar deshabilitado
        }

        onEnviarRespuestas();
    };

    return (
        <Box sx={{ maxWidth: 700, mx: 'auto' }}>
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
                        background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                        color: 'white',
                        p: 3,
                        textAlign: 'center',
                    }}
                >
                    <QuestionAnswer sx={{ fontSize: 48, mb: 1 }} />
                    <Typography variant="h5" fontWeight={700} gutterBottom>
                        Responde las Preguntas
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.95 }}>
                        Responde todas las preguntas (incluida la tuya)
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
                                    Tu progreso
                                </Typography>
                                <Chip
                                    label={`${respuestasCompletadas} / ${totalPreguntas}`}
                                    color={porcentaje === 100 ? 'success' : 'primary'}
                                    size="small"
                                />
                            </Stack>
                            <LinearProgress
                                variant="determinate"
                                value={porcentaje}
                                sx={{
                                    height: 6,
                                    borderRadius: 3,
                                }}
                            />
                        </Paper>

                        {/* Información */}
                        <Paper
                            elevation={0}
                            sx={{
                                p: 2,
                                bgcolor: '#fef3c7',
                                borderRadius: 2,
                                border: '1px solid #fde68a',
                            }}
                        >
                            <Typography variant="body2" color="warning.dark">
                                🔒 <strong>Recuerda:</strong> Tus respuestas son anónimas. Nadie
                                sabrá qué respondiste hasta la votación final.
                            </Typography>
                        </Paper>
                    </Stack>
                </CardContent>
            </Card>

            {/* Lista de preguntas */}
            <Stack spacing={3}>
                {preguntas.map((pregunta, index) => {
                    const tieneRespuesta = respuestas[pregunta.id]?.trim() !== '';

                    return (
                        <Card
                            key={pregunta.id}
                            elevation={2}
                            sx={{
                                borderRadius: 3,
                                border: tieneRespuesta ? '2px solid' : '1px solid',
                                borderColor: tieneRespuesta ? 'success.main' : 'divider',
                                animation: `slideInLeft 0.4s ease-out ${index * 0.1}s backwards`,
                            }}
                        >
                            <CardContent sx={{ p: 3 }}>
                                <Stack spacing={2}>
                                    {/* Número y pregunta */}
                                    <Box>
                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            alignItems="flex-start"
                                            sx={{ mb: 1 }}
                                        >
                                            <Chip
                                                label={`#${index + 1}`}
                                                size="small"
                                                color="primary"
                                                sx={{ fontWeight: 700 }}
                                            />
                                            {tieneRespuesta && (
                                                <Chip
                                                    label="✓ Respondida"
                                                    size="small"
                                                    color="success"
                                                    variant="outlined"
                                                />
                                            )}
                                        </Stack>
                                        <Typography
                                            variant="h6"
                                            fontWeight={600}
                                            color="text.primary"
                                            sx={{
                                                bgcolor: '#f8fafc',
                                                p: 2,
                                                borderRadius: 2,
                                                border: '1px solid #e2e8f0',
                                            }}
                                        >
                                            {pregunta.description}
                                        </Typography>
                                    </Box>

                                    {/* Campo de respuesta */}
                                    <TextField
                                        multiline
                                        rows={3}
                                        fullWidth
                                        placeholder="Escribe tu respuesta aquí..."
                                        value={respuestas[pregunta.id] || ''}
                                        onChange={(e) => onCambiarRespuesta(pregunta.id, e.target.value)}
                                        inputProps={{ maxLength: 300 }}
                                        helperText={`${(respuestas[pregunta.id] || '').length}/300 caracteres`}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                bgcolor: 'white',
                                            },
                                        }}
                                    />
                                </Stack>
                            </CardContent>
                        </Card>
                    );
                })}
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
                            background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                        }}
                    >
                        {porcentaje < 100
                            ? `Completa todas las preguntas (${respuestasCompletadas}/${totalPreguntas})`
                            : 'Enviar Todas las Respuestas'}
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
};