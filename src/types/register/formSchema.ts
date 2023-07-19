import * as yup from 'yup';

export interface RegisterSchema {
  email: string;
  password: string;
}

export const registerSchema = {
  email: yup
    .string()
    .email('Por favor, ingrese un correo electrónico válido')
    .required('El correo electrónico es requerido'),
  password: yup
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .required('La contraseña es requerida'),
};
