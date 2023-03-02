import { AiOutlinePlus } from 'react-icons/ai';

const Section = ({ nbCell }: { nbCell: number }) => {
  const cells = new Array(nbCell).fill(<SectionCell />);
  return <div className="w-full flex gap-x-5 p-1 border border-black">{cells.map((e) => e)}</div>;
};

const SectionCell = () => {
  return (
    <div
      className="
        h-7 w-full border border-dashed border-neutral-400 cursor-pointer
        flex justify-center items-center
    "
    >
      <AiOutlinePlus className="text-neutral-400" />
    </div>
  );
};

export default Section;
