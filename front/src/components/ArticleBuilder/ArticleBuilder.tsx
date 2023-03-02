import { useState } from 'react';
import { SelectedTool } from '../SimpleToolPicker';
import ArticleDroppablePage from './ArticleDroppablePage';

import SideDrawer from './SideDrawer';

const ArticleBuilder = () => {
  const [selectedTool, setSelectedTool] = useState<SelectedTool>(SelectedTool.LABEL);

  const _handleSelectedTool = (tool: SelectedTool) => {
    setSelectedTool(tool);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', width: '100vw' }}>
      <SideDrawer
        onToolSelected={(tool: SelectedTool) => {
          _handleSelectedTool(tool);
        }}
      />
      <ArticleDroppablePage />
    </div>
  );
};

export default ArticleBuilder;
