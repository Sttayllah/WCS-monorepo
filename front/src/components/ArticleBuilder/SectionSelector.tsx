import { useMemo, useState } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import Section from './Section';
import SectionStructureSelector from './SectionStructureSelector';
import idGenerator from '../../utils/idGenerator';
import { gql, useMutation } from '@apollo/client';
import { useUser } from '../../contexts/UserContext';

export const CREATE_ARTICLE = gql`
  mutation Mutation(
    $label: String!
    $content: String!
    $isPublished: Boolean!
    $blogId: Float!
    $publishedAt: DateTime
  ) {
    createArticle(
      label: $label
      content: $content
      isPublished: $isPublished
      blogId: $blogId
      publishedAt: $publishedAt
    ) {
      label
    }
  }
`;

interface ISection {
  id: string;
  elem: JSX.Element;
}

const SectionSelector = () => {
  const { user } = useUser();
  const [isAddingSection, setIsAddingSection] = useState(false);
  const [selectedSections, setSelectedSection] = useState<ISection[]>([]);
  const [cellsContainerIds, setCellsContainerIds] = useState<string[]>([]);
  const [createArticle] = useMutation(CREATE_ARTICLE);

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

  const handleDeleteCellsContainerId = (id: string) =>
    setCellsContainerIds((state) => state.filter((cellsContainerId) => cellsContainerId !== id));

  const handleDeleteSection = (id: string, cellsContainerId: string) => {
    handleDeleteCellsContainerId(cellsContainerId);
    setSelectedSection((state) => state.filter((section) => section.id !== id));
  };

  const handleSelectSectionStructure = (nb: number) => {
    const _id = idGenerator();
    const _cellsContainerId = idGenerator();
    setCellsContainerIds((state) => [...state, _cellsContainerId]);
    setSelectedSection((state) => {
      return [
        ...state,
        {
          id: _id,
          elem: (
            <Section
              nb={nb}
              id={_id}
              key={_id}
              handleDeleteSection={handleDeleteSection}
              cellsContainerId={_cellsContainerId}
            />
          ),
        },
      ];
    });
  };

  const handleRegister = async () => {
    const _cellsContainerId = [...cellsContainerIds];
    const htmlString = _cellsContainerId
      .map((id) => {
        return document.getElementById(id)?.innerHTML;
      })
      .reduce((acc, value) => {
        if (acc && value) {
          return acc + value + ' ';
        }
        return '';
      });
    // console.log({
    //   variables: {
    //     label: 'Is it going to work???',
    //     content: htmlString,
    //     isPublished: true,
    //     blogId: 1,
    //     publishedAt: Date.now(),
    //   },
    // });

    await createArticle({
      variables: {
        label: 'Is it going to work???',
        content: htmlString,
        isPublished: true,
        blogId: 1,
        publishedAt: new Date(),
      },
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
            <div className="flex justify-center gap-x-10">
              <button
                className="p-3 bg-red-500 rounded hover:bg-red-600 cursor-pointer text-white"
                onClick={() => setIsAddingSection(false)}
              >
                Annuler
              </button>
              <button
                onClick={() => handleRegister()}
                className="p-3 bg-green-600 rounded hover:bg-green-700 cursor-pointer text-white"
              >
                Enregistrer
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SectionSelector;
