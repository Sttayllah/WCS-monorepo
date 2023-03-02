// A VIRER
const DragableItem = ({ id }: { id: string }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    console.log('onDragStart');
    e.dataTransfer.setData('text', 'draggableItem');
  };

  return (
    <div
      id={id.toString() + 'caca'}
      draggable
      onDragStart={(e) => handleDragStart(e)}
      className="h-40 w-40 bg-gray-700 mr-2"
    ></div>
  );
};

export default DragableItem;
