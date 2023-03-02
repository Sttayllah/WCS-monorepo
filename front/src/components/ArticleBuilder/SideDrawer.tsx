import { useState } from 'react';
import { getToolIconProperties } from '../../utils/ToolIconProperties';
import { Label } from '../Label';
import { SelectedTool, SimpleToolPicker } from '../SimpleToolPicker';
interface SideDrawerProps {
  showControls?: boolean;
  onToolSelected: (tool: any) => void;
}
const SideDrawer = (props: SideDrawerProps) => {
  const [selectedTool, setSelectedTool] = useState<SelectedTool>(SelectedTool.LABEL);
  const [elementType, setElementType] = useState<string>('');
  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('text', elementType);
  };
  return (
    <aside className="sticky  w-1/4 bg-mediumweight overflow-y-auto">
      <Label className="text-center p-2 text-white font-semibold text-xl">ÉLÉMENTS</Label>
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
