export const PANTALLAS = {
  SALA_ESPERA: 0,
  ENVIAR_PREGUNTA: 1,
  PANTALLA_ESPERA: 2,
  RESPONDER_PREGUNTAS: 3,
  VOTAR_RESPUESTAS: 4,
  RESULTADOS: 5,
};

export const SOCKET_EVENTS = {
  // Eventos que emite el cliente
  ENVIAR_NOMBRE: 'enviar-nombre',
  EMPEZAR: 'empezar',
  ENVIAR_PREGUNTA: 'enviar-pregunta',
  ENVIAR_RESPUESTAS: 'enviar-respuestas',
  ENVIAR_VOTOS: 'enviar-votos',
  REINICIAR: 'reiniciar',
  DISCONNECT: 'disconnect',

  // Eventos que escucha el cliente
  CONNECT: 'connect',
  LISTA_USUARIOS: 'lista-usuarios',
  ADMIN_ASIGNADO: 'admin-asignado',
  EMPEZAR_JUEGO: 'empezar',
  RESPONDER_PREGUNTAS: 'responder-preguntas',
  INICIAR_VOTACION: 'iniciar-votacion',
  RESULTADOS: 'resultados',
  REINICIAR_SALA: 'reiniciar',
  NOMBRE_REPETIDO: 'nombre-repetido',
  EN_JUEGO: 'en-juego',
  CANTIDAD_PREGUNTAS: 'cantidad-preguntas',
  CANTIDAD_RESPUESTAS: 'cantidad-respuestas',
  CANTIDAD_VOTOS: 'cantidad-votos',
  ESPERAR: 'esperar',
};

export const MENSAJES = {
  NOMBRE_REQUERIDO: 'Debe ingresar un nombre de usuario',
  CODIGO_REQUERIDO: 'Debe ingresar el código de la sala',
  CODIGO_INVALIDO: 'El código debe tener 4 dígitos',
  PREGUNTA_REQUERIDA: 'Debe escribir una pregunta',
  COMPLETAR_CAMPOS: 'Debes completar todos los campos',
  USUARIO_EXISTENTE: 'Este nombre de usuario ya está en uso',
  PARTIDA_EN_CURSO: 'Debe esperar a que la partida termine',
  SALA_NO_EXISTE: 'La sala no existe',
  ERROR_CONEXION: 'Error al conectar con el servidor',
};

export const APP_CONFIG = {
  NOMBRE_APP: process.env.NEXT_PUBLIC_APP_NAME || 'Preguntas Anónimas',
  SOCKET_URL: 'https://preguntas-anonimas-server-production.up.railway.app',
  MAX_USUARIOS: 20,
  TIEMPO_ESPERA: 3000,
};
