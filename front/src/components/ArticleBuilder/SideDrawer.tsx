const SideDrawer = ({ elements }: { elements: JSX.Element[] }) => {
  return (
    <aside className="sticky h-[80vh] w-64 bg-pink-500 overflow-y-scroll">
      {elements.map((e) => e)}
    </aside>
  );
};

export default SideDrawer;
