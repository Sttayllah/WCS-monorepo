import '../App.css';
import SectionHomePage from '../components/SectionHomepage';
import mostVisitedBlogs from '../fakeData/mostVisitedBlogs.json';
import mostUsedTags from '../fakeData/mostUsedTags.json';
import mostUsedCategories from '../fakeData/mostUsedCategories.json';
import { mostViewedBlogsHeader, mostViewedArticleHeader } from '../staticData/tableHeaders';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  // const token = localStorage.getItem("token");

  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (token === null) {
  //     navigate("/login");
  //   }
  // });
  return (
    <>
      <div className="w-4/5 m-auto mt-10">
        <SectionHomePage
          title="Most viewed blogs"
          tableHeader={mostViewedBlogsHeader}
          tableContent={mostVisitedBlogs.data}
        />
      </div>
      <div className="w-4/5 m-auto mt-10">
        <SectionHomePage
          title="Most viewed articles"
          tableHeader={mostViewedArticleHeader}
          tableContent={mostVisitedBlogs.data}
        />
      </div>
      <div className="w-4/5 m-auto mt-10">
        <SectionHomePage
          title="Most used tags"
          tableHeader={['Tags']}
          tableContent={mostUsedTags.data}
          isTags={true}
        />
      </div>
      <div className="w-4/5 m-auto mt-10">
        <SectionHomePage
          title="Most used categories"
          tableHeader={['Categories']}
          tableContent={mostUsedCategories.data}
          isCategory={true}
        />
      </div>
    </>
  );
}

export default Home;
