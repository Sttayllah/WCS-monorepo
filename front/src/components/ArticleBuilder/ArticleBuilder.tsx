import SideDrawer from './SideDrawer';

const ArticleBuilder = () => {
  const fakeElement = <div className="w-full h-40 bg-blue-400 border-2 border-black"></div>;
  return (
    <div>
      <SideDrawer elements={[fakeElement]} />
    </div>
  );
};

export default ArticleBuilder;
