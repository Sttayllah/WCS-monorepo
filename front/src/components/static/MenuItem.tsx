const MenuItem = ({
  label,
  componentName,
  isActive,
  setComponent,
}: {
  label: string;
  componentName: string;
  isActive: boolean;
  setComponent: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div
      className={`h-10 pl-5 flex items-center cursor-pointer hover:bg-yeahbuddy hover:text-white ${
        isActive ? 'bg-yeahbuddy text-white' : ''
      }`}
      onClick={() => setComponent(componentName)}
    >
      <span>{label}</span>
    </div>
  );
};

export default MenuItem;
