import CellsContainer from './CellsContainer';
import { AiFillCloseCircle } from 'react-icons/ai';

const Section = ({
  nb,
  id,
  handleDeleteSection,
  cellsContainerId,
}: {
  nb: number;
  id: string;
  handleDeleteSection: (id: string, cellsContainerId: string) => void;
  cellsContainerId: string;
}) => {
  return (
    <div key={id} className="relative my-5">
      <AiFillCloseCircle
        className="absolute cursor-pointer h-4 w-4 -right-1.5 -top-1.5 text-red-600 bg-white"
        onClick={() => handleDeleteSection(id, cellsContainerId)}
      />
      <CellsContainer nbCell={nb} cellsContainerId={cellsContainerId} />
    </div>
  );
};

export default Section;
