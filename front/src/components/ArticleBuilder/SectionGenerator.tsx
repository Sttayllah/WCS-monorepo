import { useState } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import StructureSelector from './StructureSelector';
import StructureSelectorSeparator from './StructureSelectorSeparator';

const SectionSelector = () => {
  const [isAddingSection, setIsAddingSection] = useState(false);

  return (
    <div className="border-2 border-dashed border-gray-400 p-16 flex items-center justify-center">
      {!isAddingSection ? (
        <AiFillPlusCircle
          className="h-12 w-12 cursor-pointer text-yeahbuddy"
          onClick={() => setIsAddingSection(true)}
        />
      ) : (
        <div className="w-full">
          <div className="text-center mb-5">
            <p>Veuillez sélectionner une structure</p>
          </div>
          <div className="flex gap-x-5 items-center justify-center">
            <StructureSelector nbSeparator={0} separator={<StructureSelectorSeparator />} />
            <StructureSelector nbSeparator={1} separator={<StructureSelectorSeparator />} />
            <StructureSelector nbSeparator={2} separator={<StructureSelectorSeparator />} />
            <StructureSelector nbSeparator={3} separator={<StructureSelectorSeparator />} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionSelector;
