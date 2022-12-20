import '../App.css';
import { useState } from 'react';
import { Button } from '../components/static/Button';

import { Userprofile } from '../components/Userprofile';
import { articles, users } from '../model/fakeDatas';
import { User } from '../model/models';

export const UserScreen = () => {
  const allUsers: User[] = users;

  const [editMode, setEditMode] = useState(false);
  return (
    <div className={'userprofileGlobal'} style={{ paddingLeft: '20px' }}>
      <Userprofile user={allUsers[1]} editMode={editMode} articles={articles} />
      <Button title={'Editer'} onClick={() => setEditMode(true)} />
      <Button
        title={'Valider'}
        onClick={() => {
          setEditMode(false);

          //DO SOMETHING ELSE WITH BDD
        }}
      />
    </div>
  );
};
