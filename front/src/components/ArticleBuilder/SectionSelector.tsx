import { useMemo, useState } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import Section from './Section';
import SectionStructureSelector from './SectionStructureSelector';
import idGenerator from '../../utils/idGenerator';

interface ISection {
  id: string;
  elem: JSX.Element;
}

const SectionSelector = () => {
  const [isAddingSection, setIsAddingSection] = useState(false);
  const [selectedSections, setSelectedSection] = useState<ISection[]>([]);

  const sectionStructureSelectors = useMemo(() => {
    const items = new Array(4).fill(0);
    const _items = items.map((e, i) => (
      <div key={idGenerator()} onClick={() => handleSelectSectionStructure(i + 1)}>
        <SectionStructureSelector nbSeparator={i} />
      </div>
    ));
    return _items;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteSection = (id: string) =>
    setSelectedSection((state) => state.filter((section) => section.id !== id));

  const handleSelectSectionStructure = (nb: number) => {
    const _id = idGenerator();
    setSelectedSection((state) => {
      return [
        ...state,
        {
          id: _id,
          elem: <Section nb={nb} id={_id} key={_id} handleDeleteSection={handleDeleteSection} />,
        },
      ];
    });
  };

  return (
    <>
      {selectedSections.map((e) => e.elem)}

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
              {sectionStructureSelectors}
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
