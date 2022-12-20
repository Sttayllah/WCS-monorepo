import { MouseEventHandler } from 'react';

export const NULL_VALUE_LABEL: string = 'Non renseigné';

interface NullValueProps {
  isError?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
  style?: any;
}

export const NullValue = (props: NullValueProps) => {
  const textColor = props.isError
    ? {
        color: 'red',
      }
    : {};
  return (
    <div className="null-value" style={{ ...textColor, ...props.style }} onClick={props.onClick}>
      {NULL_VALUE_LABEL}
    </div>
  );
};
