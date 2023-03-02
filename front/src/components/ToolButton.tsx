import { Label } from './Label';

interface ToolButtonProps {
  title?: string;
  onClick?: ((tool: any) => void) | (() => void) | undefined;
  onDragStart: (event: React.DragEvent<HTMLDivElement>) => void;
  style?: any;
  className?: any;
  icon?: any;
}

export const ToolButton = (props: ToolButtonProps) => {
  return (
    <div
      onMouseDown={props.onClick}
      style={props.style}
      draggable
      onDragStart={props.onDragStart}
      className={props.className}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          alignSelf: 'center',
          alignItems: 'center',
          margin: '2px',
          minWidth: '100px',
        }}
      >
        {props.icon}
        <Label>{props.title}</Label>
      </div>
    </div>
  );
};
