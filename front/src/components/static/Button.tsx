import { Label } from './Label';

interface ButtonProps {
  title: string;
  selected?: boolean;
  disabled?: boolean;
  onClick: () => void;
  style?: any;
  children?: any;
}

export const Button = (props: ButtonProps) => {
  return (
    <div
      onClick={props.onClick}
      style={props.style}
      className="flex justify-center bg-[#cc987a] text-white rounded-full w-fit px-7 py-2 mt-2.5 mb-2.5 cursor-pointer"
    >
      {props.children}
      <Label style={{ padding: '0 20px' }}>{props.title}</Label>
    </div>
  );
};
