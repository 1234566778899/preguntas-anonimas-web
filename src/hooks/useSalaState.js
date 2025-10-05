'use client';

import { useState, useCallback } from 'react';
import { PANTALLAS } from '@/utils/constants';

/**
 * Hook para manejar el estado de las pantallas de la sala
 */
export const useSalaState = () => {
  const [pantallaActual, setPantallaActual] = useState(PANTALLAS.SALA_ESPERA);
  const [usuarios, setUsuarios] = useState([]);
  const [preguntas, setPreguntas] = useState([]);
  const [respuestas, setRespuestas] = useState({});
  const [votos, setVotos] = useState({});
  const [resultados, setResultados] = useState([]);
  const [esAdmin, setEsAdmin] = useState(false);
  const [cantidadPendiente, setCantidadPendiente] = useState(0);

  const cambiarPantalla = useCallback((nuevaPantalla) => {
    setPantallaActual(nuevaPantalla);
  }, []);

  const actualizarUsuarios = useCallback((listaUsuarios) => {
    setUsuarios(listaUsuarios);
  }, []);

  const actualizarPreguntas = useCallback((listaPreguntas) => {
    setPreguntas(listaPreguntas);
  }, []);

  const actualizarRespuesta = useCallback((idPregunta, respuesta) => {
    setRespuestas(prev => ({
      ...prev,
      [idPregunta]: respuesta
    }));
  }, []);

  const actualizarVoto = useCallback((idRespuesta, idUsuario) => {
    setVotos(prev => ({
      ...prev,
      [idRespuesta]: idUsuario
    }));
  }, []);

  const actualizarResultados = useCallback((listaResultados) => {
    setResultados(listaResultados);
  }, []);

  const reiniciarEstado = useCallback(() => {
    setPantallaActual(PANTALLAS.SALA_ESPERA);
    setPreguntas([]);
    setRespuestas({});
    setVotos({});
    setResultados([]);
    setCantidadPendiente(0);
  }, []);

  const limpiarRespuestas = useCallback(() => {
    setRespuestas({});
  }, []);

  const limpiarVotos = useCallback(() => {
    setVotos({});
  }, []);

  return {
    // Estados
    pantallaActual,
    usuarios,
    preguntas,
    respuestas,
    votos,
    resultados,
    esAdmin,
    cantidadPendiente,
    
    // Setters
    setEsAdmin,
    setCantidadPendiente,
    
    // Acciones
    cambiarPantalla,
    actualizarUsuarios,
    actualizarPreguntas,
    actualizarRespuesta,
    actualizarVoto,
    actualizarResultados,
    reiniciarEstado,
    limpiarRespuestas,
    limpiarVotos,
  };
};