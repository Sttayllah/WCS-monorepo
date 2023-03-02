import { useState } from 'react';
import { getToolIconProperties } from '../../utils/ToolIconProperties';
import { SelectedTool } from '../SimpleToolPicker';
import ArticleDroppablePage from './ArticleDroppablePage';

import SideDrawer from './SideDrawer';

const ArticleBuilder = () => {
  const [selectedTool, setSelectedTool] = useState<SelectedTool>(SelectedTool.LABEL);
  const [content, setContent] = useState<JSX.Element[]>([]);
  const [droppedElements, setDroppedElements] = useState<JSX.Element[]>([]);

  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('text', event.currentTarget.id);
    event.dataTransfer.effectAllowed = 'move';
  };
  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    // const id = event.dataTransfer.getData('text');
    const toolIconProperties = getToolIconProperties(selectedTool);
    let element: JSX.Element = toolIconProperties.content;
    setDroppedElements([...droppedElements, element]);
  };

  const _handleSelectedTool = (tool: SelectedTool) => {
    const toolIconProperties = getToolIconProperties(tool);
    setSelectedTool(tool);
    switch (tool) {
      case SelectedTool.LABEL:
        setContent([toolIconProperties.content]);

        break;
      case SelectedTool.BUTTON:
        setContent([toolIconProperties.content]);

        break;
      case SelectedTool.ICON:
        setContent([toolIconProperties.content]);

        break;
      case SelectedTool.IMAGE:
        setContent([toolIconProperties.content]);

        break;
      case SelectedTool.INTERN_SECTION:
        setContent([toolIconProperties.content]);

        break;
      case SelectedTool.PARAGRAPH:
        setContent([toolIconProperties.content]);

        break;
      case SelectedTool.SEPARATOR:
        setContent([toolIconProperties.content]);

        break;
      case SelectedTool.VIDEO:
        setContent([toolIconProperties.content]);

        break;
      case SelectedTool.TEXT:
        setContent([toolIconProperties.content]);

        break;
      default:
        setContent([<div>R</div>]);

        break;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', width: '100vw' }}>
      <SideDrawer
        onToolSelected={(tool: SelectedTool) => {
          _handleSelectedTool(tool);
          console.log(content);
        }}
      />
      <ArticleDroppablePage />
      {/* 
      <div
        style={{ backgroundColor: 'pink', width: '100%' }}
        onDrop={onDrop}
        onDragOver={(event) => event.preventDefault()}
      >
        {droppedElements.map((element, index) => (
          <div
            draggable
            onDragStart={(event) => onDragStart(event)}
            key={index}
            id={'move-' + index}
          >
            {element}
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default ArticleBuilder;
