import { toast } from 'react-toastify';

const defaultOptions = {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
};

export const showSuccessToast = (message) => {
    toast.success(message, defaultOptions);
};

export const showErrorToast = (message) => {
    toast.error(message, defaultOptions);
};

export const showInfoToast = (message) => {
    toast.info(message, defaultOptions);
};

export const showWarningToast = (message) => {
    toast.warning(message, defaultOptions);
};

export const showCustomToast = (message, options = {}) => {
    toast(message, { ...defaultOptions, ...options });
};