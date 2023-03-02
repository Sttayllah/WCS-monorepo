import idGenerator from '../../utils/idGenerator';
import SectionStructureSelectorSeparator from './SectionStructureSelectorSeparator';

const SectionStructureSelector = ({ nbSeparator }: { nbSeparator: number }) => {
  const separators = new Array(nbSeparator).fill(0);
  return (
    <div className="w-40 h-20 bg-neutral-300 hover:bg-neutral-500 cursor-pointer flex justify-evenly">
      {!!nbSeparator &&
        separators.map((e) => <SectionStructureSelectorSeparator key={idGenerator()} />)}
    </div>
  );
};

export default SectionStructureSelector;
