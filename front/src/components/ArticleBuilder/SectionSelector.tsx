import { useState } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import Section from './Section';
import StructureSelector from './StructureSelector';
import StructureSelectorSeparator from './StructureSelectorSeparator';

const SectionSelector = () => {
  const [isAddingSection, setIsAddingSection] = useState(false);
  const [selectedStructure, setSelectedStructure] = useState<JSX.Element[]>([]);

  const structureSelector = new Array(4).fill(0);

  const handleSelectStructure = (nb: number) => {
    setSelectedStructure((state) => [
      ...state,
      <div className="my-5">
        <Section nbCell={nb} />
      </div>,
    ]);
  };

  return (
    <>
      {selectedStructure.map((e) => e)}
      <div className="border-2 border-dashed border-gray-400 p-10 flex items-center justify-center mt-10">
        {!isAddingSection ? (
          <AiFillPlusCircle
            className="h-12 w-12 cursor-pointer text-yeahbuddy"
            onClick={() => setIsAddingSection(true)}
          />
        ) : (
          <div className="w-full fles flex-col">
            <div className="text-center">
              <p>Veuillez sélectionner une structure</p>
            </div>
            <div className="flex gap-x-5 items-center justify-center my-6">
              {structureSelector.map((e, i) => (
                <div onClick={() => handleSelectStructure(i + 1)}>
                  <StructureSelector nbSeparator={i} separator={<StructureSelectorSeparator />} />
                </div>
              ))}
              <div onClick={() => handleSelectStructure(1)}></div>
            </div>
            <div className="flex justify-center">
              <button
                className="p-3 bg-red-500 rounded hover:bg-red-600 cursor-pointer text-white m-auto"
                onClick={() => setIsAddingSection(false)}
              >
                Annuler
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SectionSelector;
