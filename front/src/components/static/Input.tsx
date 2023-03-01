import { Combobox } from '@headlessui/react';
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
    <div className="w-full">
      <Label>{props.label}</Label>
      <Combobox>
        <input
          className="text-black rounded-md border-yeahbuddy border w-full p-1"
          type={props.type ? props.type : 'text'}
          value={props.value}
          onChange={props.onChange}
          placeholder={props.placeholder && props.placeholder}
        />
      </Combobox>
    </div>
  );
};
