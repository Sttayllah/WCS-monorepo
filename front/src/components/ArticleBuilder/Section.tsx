import CellsContainer from './CellsContainer';
import { AiFillCloseCircle } from 'react-icons/ai';

const Section = ({
  nb,
  id,
  handleDeleteSection,
}: {
  nb: number;
  id: string;
  handleDeleteSection: (id: string) => void;
}) => {
  return (
    <div key={id} className="relative my-5">
      <AiFillCloseCircle
        className="absolute cursor-pointer h-4 w-4 -right-1.5 -top-1.5 text-red-600 bg-white"
        onClick={() => handleDeleteSection(id)}
      />
      <CellsContainer nbCell={nb} />
    </div>
  );
};

export default Section;
