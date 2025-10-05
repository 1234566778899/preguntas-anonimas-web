// src/app/sala/[codigo]/page.jsx
'use client';

import React, { useEffect, useCallback, useRef } from 'react';
import { Box } from '@mui/material';
import { useRouter, useParams } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SalaEspera } from '@/components/sala/SalaEspera';
import { EnviarPregunta } from '@/components/sala/EnviarPregunta';
import { PantallaEspera } from '@/components/sala/PantallaEspera';
import { ResponderPreguntas } from '@/components/sala/ResponderPreguntas';
import { VotarRespuestas } from '@/components/sala/VotarRespuestas';
import { Resultados } from '@/components/sala/Resultados';
import { useSocketContext } from '@/context/SocketContext';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useSalaState } from '@/hooks/useSalaState';
import { PANTALLAS, SOCKET_EVENTS, MENSAJES } from '@/utils/constants';
import { showInfoToast, showErrorToast, showSuccessToast } from '@/utils/toast';

export default function SalaPage() {
  const router = useRouter();
  const params = useParams();
  const codigo = params.codigo;
  const { socket, isConnected } = useSocketContext();
  const [nombreUsuario] = useLocalStorage('name', '');

  const nombreEnviadoRef = useRef(false);

  const {
    pantallaActual,
    usuarios,
    preguntas,
    respuestas,
    votos,
    resultados,
    puntuaciones,
    esAdmin,
    cantidadPendiente,
    setEsAdmin,
    setCantidadPendiente,
    cambiarPantalla,
    actualizarUsuarios,
    actualizarPreguntas,
    actualizarRespuesta,
    actualizarVoto,
    actualizarResultados,
    reiniciarEstado,
    limpiarRespuestas,
    limpiarVotos,
  } = useSalaState();

  // Verificar nombre y enviar al servidor UNA SOLA VEZ
  useEffect(() => {
    console.log('=== USEEFFECT PRINCIPAL ===');
    console.log('Socket:', !!socket);
    console.log('Conectado:', isConnected);
    console.log('Nombre:', nombreUsuario);
    console.log('Ya enviado:', nombreEnviadoRef.current);

    if (!nombreUsuario) {
      console.log('No hay nombre, redirigiendo a username');
      router.push(`/username/${codigo}`);
      return;
    }

    if (socket && isConnected && !nombreEnviadoRef.current) {
      console.log('>>> ENVIANDO NOMBRE AL SERVIDOR <<<');
      console.log('Datos:', { codigo, name: nombreUsuario });

      socket.emit('enviar-nombre', {
        codigo,
        name: nombreUsuario,
      });

      nombreEnviadoRef.current = true;
      console.log('Flag marcada, no se enviará de nuevo');
    }
  }, [socket, isConnected, nombreUsuario, codigo, router]);

  // Reset flag cuando se desmonta
  useEffect(() => {
    return () => {
      nombreEnviadoRef.current = false;
    };
  }, []);

  // Escuchar eventos de Socket
  useEffect(() => {
    if (!socket) return;

    console.log('Registrando listeners de socket...');

    const handleListaUsuarios = (listaUsuarios) => {
      console.log('Evento: lista-usuarios', listaUsuarios);
      actualizarUsuarios(listaUsuarios);
    };

    const handleAdminAsignado = () => {
      console.log('Evento: admin-asignado');
      setEsAdmin(true);
      showSuccessToast('Eres el administrador de esta sala');
    };

    const handleEmpezarJuego = () => {
      console.log('Evento: empezar');
      cambiarPantalla(PANTALLAS.ENVIAR_PREGUNTA);
      limpiarRespuestas();
      limpiarVotos();
    };

    const handleCantidadPreguntas = (cantidad) => {
      console.log('Evento: cantidad-preguntas', cantidad);
      setCantidadPendiente(cantidad);
    };

    const handleResponderPreguntas = (listaPreguntas) => {
      console.log('Evento: responder-preguntas', listaPreguntas);
      actualizarPreguntas(listaPreguntas);
      cambiarPantalla(PANTALLAS.RESPONDER_PREGUNTAS);
      limpiarRespuestas();
    };

    const handleCantidadRespuestas = (cantidad) => {
      console.log('Evento: cantidad-respuestas', cantidad);
      setCantidadPendiente(cantidad);
    };

    const handleIniciarVotacion = (datosVotacion) => {
      console.log('Evento: iniciar-votacion', datosVotacion);
      actualizarPreguntas(datosVotacion);
      cambiarPantalla(PANTALLAS.VOTAR_RESPUESTAS);
      limpiarVotos();
    };

    const handleCantidadVotos = (cantidad) => {
      console.log('Evento: cantidad-votos', cantidad);
      setCantidadPendiente(cantidad);
    };

    const handleResultados = (datosResultados) => {
      console.log('Evento: resultados', datosResultados);
      actualizarResultados(datosResultados);
      cambiarPantalla(PANTALLAS.RESULTADOS);
    };

    const handleReiniciarSala = () => {
      console.log('Evento: reiniciar');
      reiniciarEstado();
      showInfoToast('Nueva partida iniciada');
    };

    const handleNombreRepetido = () => {
      console.log('Evento: nombre-repetido');
      showErrorToast(MENSAJES.USUARIO_EXISTENTE);
      nombreEnviadoRef.current = false;
      localStorage.removeItem('name');
      router.push(`/username/${codigo}`);
    };

    const handleEnJuego = () => {
      console.log('Evento: en-juego');
      showInfoToast(MENSAJES.PARTIDA_EN_CURSO);
      router.push('/home');
    };

    const handleEsperar = () => {
      console.log('Evento: esperar');
      showInfoToast('Debes esperar que termine la partida');
      router.push('/home');
    };

    socket.on('lista-usuarios', handleListaUsuarios);
    socket.on('admin-asignado', handleAdminAsignado);
    socket.on('empezar', handleEmpezarJuego);
    socket.on('cantidad-preguntas', handleCantidadPreguntas);
    socket.on('responder-preguntas', handleResponderPreguntas);
    socket.on('cantidad-respuestas', handleCantidadRespuestas);
    socket.on('iniciar-votacion', handleIniciarVotacion);
    socket.on('cantidad-votos', handleCantidadVotos);
    socket.on('resultados', handleResultados);
    socket.on('reiniciar', handleReiniciarSala);
    socket.on('nombre-repetido', handleNombreRepetido);
    socket.on('en-juego', handleEnJuego);
    socket.on('esperar', handleEsperar);

    return () => {
      socket.off('lista-usuarios', handleListaUsuarios);
      socket.off('admin-asignado', handleAdminAsignado);
      socket.off('empezar', handleEmpezarJuego);
      socket.off('cantidad-preguntas', handleCantidadPreguntas);
      socket.off('responder-preguntas', handleResponderPreguntas);
      socket.off('cantidad-respuestas', handleCantidadRespuestas);
      socket.off('iniciar-votacion', handleIniciarVotacion);
      socket.off('cantidad-votos', handleCantidadVotos);
      socket.off('resultados', handleResultados);
      socket.off('reiniciar', handleReiniciarSala);
      socket.off('nombre-repetido', handleNombreRepetido);
      socket.off('en-juego', handleEnJuego);
      socket.off('esperar', handleEsperar);
    };
  }, [socket, router, codigo, setEsAdmin, setCantidadPendiente, cambiarPantalla, actualizarUsuarios, actualizarPreguntas, actualizarResultados, reiniciarEstado, limpiarRespuestas, limpiarVotos]);

  const handleEmpezar = useCallback(() => {
    if (!socket) return;
    console.log('>>> Emitiendo: empezar');
    socket.emit('empezar');
  }, [socket]);

  const handleEnviarPregunta = useCallback(
    (pregunta) => {
      if (!socket) return;
      console.log('>>> Emitiendo: enviar-pregunta', pregunta);
      socket.emit('enviar-pregunta', pregunta);
      cambiarPantalla(PANTALLAS.PANTALLA_ESPERA);
      setCantidadPendiente(0);
    },
    [socket, cambiarPantalla, setCantidadPendiente]
  );

  const handleEnviarRespuestas = useCallback(() => {
    if (!socket) return;

    for (let p of preguntas) {
      if (!respuestas[p.id] || respuestas[p.id].trim() === '') {
        showErrorToast(MENSAJES.COMPLETAR_CAMPOS);
        return;
      }
    }

    console.log('>>> Emitiendo: enviar-respuestas', respuestas);
    socket.emit('enviar-respuestas', respuestas);
    cambiarPantalla(PANTALLAS.PANTALLA_ESPERA);
    setCantidadPendiente(0);
  }, [socket, preguntas, respuestas, cambiarPantalla, setCantidadPendiente]);

  const handleEnviarVotos = useCallback(() => {
    if (!socket) return;
    console.log('>>> Emitiendo: enviar-votos', votos);
    socket.emit('enviar-votos', votos);
    cambiarPantalla(PANTALLAS.PANTALLA_ESPERA);
    setCantidadPendiente(0);
  }, [socket, votos, cambiarPantalla, setCantidadPendiente]);

  const handleReiniciar = useCallback(() => {
    if (!socket) return;
    console.log('>>> Emitiendo: reiniciar');
    socket.emit('reiniciar');
  }, [socket]);

  const handleSalir = useCallback(() => {
    console.log('Saliendo de la sala, limpiando localStorage');
    localStorage.removeItem('name');
    nombreEnviadoRef.current = false;
    router.push('/home');
  }, [router]);

  const handleCambiarNombre = useCallback(() => {
    console.log('Cambiando nombre, limpiando localStorage');
    localStorage.removeItem('name');
    nombreEnviadoRef.current = false;
    router.push(`/username/${codigo}`);
  }, [router, codigo]);

  const obtenerTituloNav = () => {
    switch (pantallaActual) {
      case PANTALLAS.SALA_ESPERA:
        return `PIN: ${codigo}`;
      case PANTALLAS.ENVIAR_PREGUNTA:
        return 'Haz una Pregunta';
      case PANTALLAS.PANTALLA_ESPERA:
        return 'Esperando...';
      case PANTALLAS.RESPONDER_PREGUNTAS:
        return 'Responde las Preguntas';
      case PANTALLAS.VOTAR_RESPUESTAS:
        return 'Vota las Respuestas';
      case PANTALLAS.RESULTADOS:
        return 'Resultados';
      default:
        return `PIN: ${codigo}`;
    }
  };

  const obtenerTipoEspera = () => {
    if (pantallaActual === PANTALLAS.PANTALLA_ESPERA) {
      if (preguntas.length === 0) return 'preguntas';
      if (Object.keys(respuestas).length > 0) return 'votos';
      return 'respuestas';
    }
    return 'preguntas';
  };

  const renderizarPantalla = () => {
    switch (pantallaActual) {
      case PANTALLAS.SALA_ESPERA:
        return (
          <SalaEspera
            usuarios={usuarios}
            esAdmin={esAdmin}
            nombreUsuario={nombreUsuario}
            onEmpezar={handleEmpezar}
            onSalir={handleSalir}
            onCambiarNombre={handleCambiarNombre}
          />
        );

      case PANTALLAS.ENVIAR_PREGUNTA:
        return <EnviarPregunta onEnviarPregunta={handleEnviarPregunta} />;

      case PANTALLAS.PANTALLA_ESPERA:
        return (
          <PantallaEspera
            cantidadPendiente={cantidadPendiente}
            totalJugadores={usuarios.length}
            tipo={obtenerTipoEspera()}
          />
        );

      case PANTALLAS.RESPONDER_PREGUNTAS:
        return (
          <ResponderPreguntas
            preguntas={preguntas}
            respuestas={respuestas}
            onCambiarRespuesta={actualizarRespuesta}
            onEnviarRespuestas={handleEnviarRespuestas}
          />
        );

      case PANTALLAS.VOTAR_RESPUESTAS:
        return (
          <VotarRespuestas
            preguntas={preguntas}
            usuarios={usuarios}
            votos={votos}
            onCambiarVoto={actualizarVoto}
            onEnviarVotos={handleEnviarVotos}
          />
        );

      case PANTALLAS.RESULTADOS:
        return (
          <Resultados
            resultados={resultados.resultados || resultados}
            puntuaciones={resultados.puntuaciones || puntuaciones}
            esAdmin={esAdmin}
            onReiniciar={handleReiniciar}
          />
        );

      default:
        return null;
    }
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
      <Navbar title={obtenerTituloNav()} />

      <Box
        component="main"
        sx={{
          flex: 1,
          py: 4,
          px: 2,
        }}
      >
        {renderizarPantalla()}
      </Box>

      <Footer />
    </Box>
  );
}