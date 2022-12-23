import '../App.css';
import { Userprofile } from '../components/Userprofile';
import { articles } from '../model/fakeDatas';

export const UserScreen = () => {
  return (
    <div
      className={'userprofileGlobal'}
      style={{ position: 'relative', top: '150px', height: '80vh' }}
    >
      <Userprofile articles={articles} />
    </div>
  );
};
