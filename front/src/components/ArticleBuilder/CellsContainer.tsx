import { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import idGenerator from '../../utils/idGenerator';
import { getToolIconProperties } from '../../utils/ToolIconProperties';

interface ICell {
  id: string;
  cell: JSX.Element;
}

const CellsContainer = ({
  nbCell,
  cellsContainerId,
}: {
  nbCell: number;
  cellsContainerId: string;
}) => {
  const [cells, setCells] = useState<ICell[]>([]);
  const [onDropZone, setOnDropZone] = useState<boolean>(false);
  const [id, setId] = useState<string>('');

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
    console.log(_cells);
    setCells(_cells);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setId(e.currentTarget.id);
    setOnDropZone(true);
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, cellId: string) => {
    console.log('onDrop');
    setOnDropZone(false);
    const elementType = e.dataTransfer.getData('text');
    replaceCellByElement(cellId, getToolIconProperties(elementType.toUpperCase()).content);
  };

  return (
    <div className="p-1 border border-black" id={cellsContainerId}>
      <div className="w-full flex gap-x-5">
        {cells.map((el, idx) => (
          <div
            style={{
              backgroundColor:
                onDropZone && idx.toString() === id ? 'rgba(204, 152, 122, 0.5)' : 'white',
            }}
            key={idGenerator()}
            id={idx.toString()}
            className="w-full"
            onDragLeave={() => setOnDropZone(false)}
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e, el.id)}
          >
            {el.cell}
          </div>
        ))}
      </div>
    </div>
  );
};

const Cell = ({ id }: { id: string }) => {
  return (
    <div
      id={id}
      className="h-7 w-full border border-dashed border-neutral-400 flex justify-center items-center"
    >
      <AiOutlinePlus className="text-neutral-400 rounded-full" />
    </div>
  );
};

export default CellsContainer;
