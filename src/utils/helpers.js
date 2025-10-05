/**
 * Genera un código aleatorio de 4 dígitos
 */
export const generarCodigoSala = () => {
    let codigo = '';
    for (let i = 0; i < 4; i++) {
        codigo += Math.floor(Math.random() * 10).toString();
    }
    return codigo;
};

/**
 * Desordena un array aleatoriamente
 */
export const desordenarArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
};

/**
 * Valida que un código tenga 4 dígitos
 */
export const validarCodigoSala = (codigo) => {
    return /^\d{4}$/.test(codigo);
};

/**
 * Formatea el nombre de usuario (capitaliza primera letra)
 */
export const formatearNombre = (nombre) => {
    if (!nombre) return '';
    return nombre.trim().charAt(0).toUpperCase() + nombre.trim().slice(1).toLowerCase();
};

/**
 * Obtiene las iniciales de un nombre para el avatar
 */
export const obtenerIniciales = (nombre) => {
    if (!nombre) return '?';
    const palabras = nombre.trim().split(' ');
    if (palabras.length === 1) {
        return palabras[0].charAt(0).toUpperCase();
    }
    return (palabras[0].charAt(0) + palabras[palabras.length - 1].charAt(0)).toUpperCase();
};

/**
 * Genera un color aleatorio para el avatar basado en el nombre
 */
export const generarColorAvatar = (nombre) => {
    if (!nombre) return '#6366f1';

    const colores = [
        '#6366f1', // Indigo
        '#ec4899', // Pink
        '#10b981', // Green
        '#f59e0b', // Amber
        '#3b82f6', // Blue
        '#8b5cf6', // Violet
        '#ef4444', // Red
        '#06b6d4', // Cyan
    ];

    const index = nombre.charCodeAt(0) % colores.length;
    return colores[index];
};

/**
 * Trunca un texto si excede un límite
 */
export const truncarTexto = (texto, limite = 50) => {
    if (!texto) return '';
    if (texto.length <= limite) return texto;
    return texto.substring(0, limite) + '...';
};

/**
 * Calcula puntuación basada en votos correctos
 */
export const calcularPuntuacion = (votosCorrectos, totalVotos) => {
    if (totalVotos === 0) return 0;
    return Math.round((votosCorrectos / totalVotos) * 100);
};
