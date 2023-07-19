import * as yup from 'yup';

export interface RegisterSchema {
  email: string;
  password: string;
  name: string;
}

export type LoginSchema = Omit<RegisterSchema, 'name'>;

const sharedSchema = {
  email: yup
    .string()
    .email('Por favor, ingrese un correo electrónico válido')
    .required('El correo electrónico es requerido'),
  password: yup
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .required('La contraseña es requerida'),
};

export const registerSchema = {
  ...sharedSchema,
  name: yup
    .string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .required('El nombre es requerido'),
};

export const loginSchema = {
  ...sharedSchema,
};
