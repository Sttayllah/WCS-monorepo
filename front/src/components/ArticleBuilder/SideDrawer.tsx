import { useState } from 'react';
import { getToolIconProperties } from '../../utils/ToolIconProperties';
import { SelectedTool, SimpleToolPicker } from '../SimpleToolPicker';
interface SideDrawerProps {
  showControls?: boolean;
  onToolSelected: (tool: any) => void;
}
const SideDrawer = (props: SideDrawerProps) => {
  const [selectedTool, setSelectedTool] = useState<SelectedTool>(
    props.showControls ? SelectedTool.LABEL : SelectedTool.NONE,
  );
  const [elementType, setElementType] = useState<string>('');
  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('text', elementType);
  };
  return (
    <aside className="sticky h-[80vh] w-64 bg-yeahbuddy overflow-y-scroll">
      <SimpleToolPicker
        availableTools={Array.from(Object.values(SelectedTool)) as SelectedTool[]}
        selectedTool={getToolIconProperties(selectedTool)}
        onToolSelected={(tool: SelectedTool) => {
          setSelectedTool(tool);
          setElementType(getToolIconProperties(tool).type);
          props.onToolSelected(tool);
        }}
        onDragStart={onDragStart}
      />
    </aside>
  );
};

export default SideDrawer;
