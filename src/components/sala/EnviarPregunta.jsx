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
} from '@mui/material';
import { Send, HelpOutline } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { MENSAJES } from '@/utils/constants';

export const EnviarPregunta = ({ onEnviarPregunta }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    const pregunta = watch('pregunta', '');

    const handleEnviar = (data) => {
        onEnviarPregunta(data.pregunta.trim());
    };

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
                    background: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)',
                    color: 'white',
                    p: 3,
                    textAlign: 'center',
                }}
            >
                <HelpOutline sx={{ fontSize: 48, mb: 1 }} />
                <Typography variant="h5" fontWeight={700} gutterBottom>
                    Haz una Pregunta Anónima
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.95 }}>
                    Nadie sabrá que fue tu pregunta hasta el final
                </Typography>
            </Box>

            <CardContent sx={{ p: 3 }}>
                <form onSubmit={handleSubmit(handleEnviar)}>
                    <Stack spacing={3}>
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
                                💭 <strong>Tips para buenas preguntas:</strong>
                            </Typography>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                component="div"
                                sx={{ mt: 0.5 }}
                            >
                                • Sé creativo y divertido
                                <br />
                                • Haz preguntas que generen respuestas interesantes
                                <br />
                                • Puede ser seria, graciosa o comprometedora
                                <br />• Recuerda: ¡es completamente anónima!
                            </Typography>
                        </Paper>

                        {/* Campo de pregunta */}
                        <Box>
                            <TextField
                                {...register('pregunta', {
                                    required: MENSAJES.PREGUNTA_REQUERIDA,
                                    minLength: {
                                        value: 10,
                                        message: 'La pregunta debe tener al menos 10 caracteres',
                                    },
                                    maxLength: {
                                        value: 200,
                                        message: 'La pregunta no puede exceder 200 caracteres',
                                    },
                                })}
                                multiline
                                rows={4}
                                fullWidth
                                placeholder="Escribe tu pregunta aquí... 
Ejemplo: ¿Cuál es tu mayor miedo?"
                                error={!!errors.pregunta}
                                helperText={
                                    errors.pregunta?.message ||
                                    `${pregunta.length}/200 caracteres`
                                }
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        fontSize: '1.1rem',
                                    },
                                }}
                            />
                        </Box>

                        {/* Ejemplos */}
                        <Box>
                            <Typography
                                variant="subtitle2"
                                color="text.secondary"
                                gutterBottom
                            >
                                💡 Ejemplos de preguntas:
                            </Typography>
                            <Stack spacing={1}>
                                {[
                                    '¿Qué secreto nunca le has contado a nadie?',
                                    '¿Cuál fue tu momento más vergonzoso?',
                                    '¿A quién de aquí le tienes envidia y por qué?',
                                    '¿Cuál es tu mayor arrepentimiento?',
                                ].map((ejemplo, index) => (
                                    <Paper
                                        key={index}
                                        elevation={0}
                                        sx={{
                                            p: 1.5,
                                            bgcolor: '#f8fafc',
                                            borderRadius: 1,
                                            cursor: 'pointer',
                                            '&:hover': {
                                                bgcolor: '#f1f5f9',
                                            },
                                        }}
                                    >
                                        <Typography variant="body2" color="text.secondary">
                                            {ejemplo}
                                        </Typography>
                                    </Paper>
                                ))}
                            </Stack>
                        </Box>

                        {/* Botón enviar */}
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            endIcon={<Send />}
                            fullWidth
                            sx={{
                                py: 1.5,
                                fontSize: '1rem',
                                fontWeight: 600,
                                background: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)',
                            }}
                        >
                            Enviar Pregunta
                        </Button>

                        {/* Recordatorio */}
                        <Paper
                            elevation={0}
                            sx={{
                                p: 2,
                                bgcolor: '#eff6ff',
                                borderRadius: 2,
                                border: '1px solid #bfdbfe',
                            }}
                        >
                            <Typography variant="caption" color="primary.dark">
                                🔒 Tu pregunta es 100% anónima. Los demás no sabrán que fue
                                tuya hasta que vean los resultados finales.
                            </Typography>
                        </Paper>
                    </Stack>
                </form>
            </CardContent>
        </Card>
    );
};