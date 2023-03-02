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
    <div onMouseDown={props.onClick} style={props.style} draggable onDragStart={props.onDragStart}>
      <div style={{ display: 'flex', flexDirection: 'row', paddingRight: '10px' }}>
        {props.icon}
        <Label style={{ marginLeft: '10px' }}>{props.title}</Label>
      </div>
    </div>
  );
};
