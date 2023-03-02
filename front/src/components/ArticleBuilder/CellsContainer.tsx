import { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import idGenerator from '../../utils/idGenerator';
import { getToolIconProperties } from '../../utils/ToolIconProperties';

interface ICell {
  id: string;
  cell: JSX.Element;
}

const CellsContainer = ({ nbCell }: { nbCell: number }) => {
  const [cells, setCells] = useState<ICell[]>([]);

  const createCells = () => {
    const _id = idGenerator();
    return { id: _id, cell: <Cell id={_id} /> };
  };

  useEffect(() => {
    setCells(new Array(nbCell).fill(0).map((_) => createCells()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const replaceCellByElement = (cellId: string, element: JSX.Element) => {
    const _cells = cells.map((e) => {
      if (e.id === cellId) {
        e.cell = element;
      }
      return e;
    });
    setCells(_cells);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('onDragOver');
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, cellId: string) => {
    console.log('onDrop');
    const elementType = e.dataTransfer.getData('text');
    replaceCellByElement(cellId, getToolIconProperties(elementType.toUpperCase()).content);
  };

  return (
    <div className="w-full flex gap-x-5 p-1 border border-black">
      {cells.map((el) => (
        <div
          key={idGenerator()}
          className="w-full"
          onDragOver={(e) => handleDragOver(e)}
          onDrop={(e) => handleDrop(e, el.id)}
        >
          {el.cell}
        </div>
      ))}
    </div>
  );
};

const Cell = ({ id }: { id: string }) => {
  return (
    <div
      id={id}
      className="
        h-7 w-full border border-dashed border-neutral-400 cursor-pointer
        flex justify-center items-center
    "
    >
      <AiOutlinePlus className="text-neutral-400 rounded-full" />
    </div>
  );
};

export default CellsContainer;
