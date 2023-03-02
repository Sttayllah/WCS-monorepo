import { getToolIconProperties } from '../utils/ToolIconProperties';
import { BaseIcon, SMALL_ICON_SIZE } from './BaseIcon';
import { ToolButton } from './ToolButton';

export enum SelectedTool {
  NONE = 'NONE',
  LABEL = 'LABEL',
  SEPARATOR = 'SEPARATOR',
  PARAGRAPH = 'PARAGRAPH',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  BUTTON = 'BUTTON',
  ICON = 'ICON',
  TEXT = 'TEXT',
  INTERN_SECTION = 'INTERN_SECTION',
  EDIT = 'EDIT',
  DELETE = 'DELETE',
  DELETE_ALL = 'DELETE_ALL',
  BACKGROUND_COLOR = 'BACKGROUND_COLOR',
}

interface SimpleToolPickerProps {
  availableTools: SelectedTool[];
  selectedTool: any;
  onToolSelected: (tool: any) => void;
  onDragStart: (event: React.DragEvent<HTMLDivElement>) => void;
  tooltip?: boolean;
  contextualMenu?: boolean;
  children?: any;
  maxWidth?: number;
  style?: any;
}

export const SimpleToolPicker = (props: SimpleToolPickerProps) => {
  console.log('props.availableTools.length :', props.availableTools.length);

  return (
    <div
      className={'container'}
      style={{
        maxWidth: props.maxWidth,
        cursor: 'pointer',
        position: 'relative',
        padding: 20,
        gap: 10,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {props.availableTools.map((t: any, i) => {
        const toolItemProperties = getToolIconProperties(t);

        return (
          <ToolButton
            key={'edit' + i}
            style={{ paddingRight: '10px', backgroundColor: 'cyan' }}
            icon={
              <BaseIcon
                style={{ paddingRight: '10px' }}
                iconName={toolItemProperties.name}
                size={SMALL_ICON_SIZE * 1.5}
                color={'white'}
              />
            }
            title={toolItemProperties.title}
            onClick={() => {
              props.onToolSelected(t);
            }}
            onDragStart={props.onDragStart}
          />
        );
      })}

      {props.children}
    </div>
  );
};
