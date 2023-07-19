import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import InputHightlight from './InputHightlight';

/**
 * @param {Object} props
 * @param {UseFormRegister<RegisterSchema | LoginSchema>} props.register
 */
export default function EmailInput({
  register,
}: {
  register: UseFormRegister<any>;
}) {
  return (
    <InputHightlight
      icon="/assets/register/at_icon.svg"
      name="email"
      inputProps={{
        type: 'email',
        placeholder: 'email@test.com',
        ...register('email'),
      }}
    />
  );
}
