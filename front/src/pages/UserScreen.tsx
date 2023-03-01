import '../App.css';
import { Userprofile } from '../components/Userprofile';
import { articles } from '../model/fakeDatas';

export const UserScreen = () => {
  return (
    <div className="userprofileGlobal mt-[140px]">
      <Userprofile articles={articles} />
    </div>
  );
};
