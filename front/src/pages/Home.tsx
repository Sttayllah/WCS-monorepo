import '../App.css';
import SectionHomePage from '../components/SectionHomepage';
import mostVisitedBlogs from '../fakeData/mostVisitedBlogs.json';
import mostUsedTags from '../fakeData/mostUsedTags.json';
import mostUsedCategories from '../fakeData/mostUsedCategories.json';
import { mostViewedBlogsHeader, mostViewedArticleHeader } from '../staticData/tableHeaders';
import hero from '../assets/hero.png';
import { Button } from '../components/static/Button';

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
      <img src={hero} alt="bg" style={{ height: '100vh', width: '100vw', objectFit: 'fill' }} />
      <div
        style={{
          position: 'absolute',
          top: 150,
          left: 20,
          width: '30%',
        }}
      >
        <div style={{ fontSize: '6rem', color: 'white' }}>LIGHTWEIGHTS BLOGS</div>
        <div style={{ fontSize: '1.3rem', color: 'white' }}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore ab voluptatibus
          aliquid distinctio tempora voluptates consequatur, ratione aut similique, blanditiis
          numquam doloribus, culpa voluptate eos. Aperiam ipsum sint qui earum! Assumenda
        </div>
        <Button title={'Commencer'} onClick={() => {}}></Button>
      </div>
      <div>
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
      </div>
    </>
  );
}

export default Home;
