import { Combobox } from '@headlessui/react';
import { useState } from 'react';
import { Label } from './Label';

interface InputProps {
  label: string;
  value: any;
  onChange: (value: any) => void;
  placeholder?: string;
  type?: string;
  autocomplete?: boolean;
  maxlength?: number;
  minLength?: number;
  disabled?: boolean;
}

export const Input = (props: InputProps) => {
  return (
    <>
      <Label>{props.label}</Label>
      <Combobox>
        <input
          style={{
            color: 'black',
            borderRadius: '5px',
            border: '1px solid #cc987a',
          }}
          type={props.type ? props.type : 'text'}
          value={props.value}
          onChange={props.onChange}
          placeholder={props.placeholder && props.placeholder}
        />
      </Combobox>
    </>
  );
};
