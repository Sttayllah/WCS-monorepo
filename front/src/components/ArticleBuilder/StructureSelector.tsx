const StructureSelector = ({
  nbSeparator,
  separator,
}: {
  nbSeparator: number;
  separator: JSX.Element;
}) => {
  const separators = new Array(nbSeparator).fill(separator);
  return (
    <div className="w-40 h-20 bg-neutral-300 hover:bg-neutral-500 cursor-pointer flex justify-evenly">
      {!!nbSeparator && separators.map((e) => e)}
    </div>
  );
};

export default StructureSelector;
