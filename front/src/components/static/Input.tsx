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
        <div style={{ backgroundColor: 'pink' }}>
          <Combobox.Input
            value={props.value}
            onChange={(value) => props.onChange(value)}
            placeholder={props.placeholder && props.placeholder}
            displayValue={props.value}
          />
        </div>
      </Combobox>
    </>
  );
};
