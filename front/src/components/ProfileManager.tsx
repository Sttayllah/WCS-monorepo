import { gql, useMutation } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userContext from '../contexts/UserContext';
import { Avatar } from './static/Avatar';
import { Button } from './static/Button';
import { Input } from './static/Input';
import { Value } from './static/Value';

const UPDATE_USER_MUTATION = gql`
  mutation updateUser($email: String!, $pseudo: String!, $description: String!, $avatar: String!) {
    updateUser(email: $email, pseudo: $pseudo, description: $description, avatar: $avatar) {
      id
      email
      pseudo
      description
      avatar
    }
  }
`;

const DELETE_USER = gql`
  mutation deleteUser($id: Float!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

const ProfileManager = () => {
  const currentUser = useContext(userContext).user;
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const [pseudo, setPseudo] = useState(currentUser.pseudo);
  const [description, setDescription] = useState(currentUser.description);
  const [email, setEmail] = useState(currentUser.email);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      setPseudo(currentUser.pseudo);
      setEmail(currentUser.email);
      setDescription(currentUser.description);
      setAvatar(currentUser.avatar);
    }
  }, [currentUser]);

  const [updateUser] = useMutation(UPDATE_USER_MUTATION, {
    variables: {
      email: currentUser.email,
      pseudo: pseudo,
      description: description,
      avatar: avatar,
    },
  });

  const [deleteUser] = useMutation(DELETE_USER, {
    variables: {
      deleteUserId: currentUser.id,
    },
    onCompleted() {
      navigate('/');
    },
  });

  return (
    <div className="flex flex-col w-full h-full gap-y-10">
      <div className="flex justify-between items-center">
        {/* AVATAR */}
        <div className="flex items-center gap-x-10">
          <div className="flex items-center">
            <div className="rounded-full border-2 border-black bg-yeahbuddy">
              <Avatar
                avatarBackgroundColor="#cc987a"
                src={avatar || ''}
                className="w-16 h-16 p-0"
              />
            </div>
            <Value className={'text-black ml-5'}>
              {pseudo.charAt(0).toUpperCase() + pseudo.slice(1)}
            </Value>
          </div>

          {/* CHANGE PROFILE BUTTON */}
          <input
            onChange={async (e) => {
              try {
                // const file = (e.target as any).files[0];
                // const img: FileImageData = await getImageFromFile(file)
                // setAvatar(img.base64Data);
                // localStorage.setItem('userImage', img.base64Data);
                if (e.target.files !== null) {
                  const file = e.target.files[0];
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    setAvatar(e.target?.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              } catch (err) {
                console.log(err);
              }
            }}
            accept={'image/*'}
            type={'file'}
          />
        </div>

        {/* DELETE PROFILE */}
        <Button
          className="rounded bg-red-600"
          title={'Effacer le profil'}
          onClick={() => {
            deleteUser();
          }}
        />
      </div>

      <div className="flex flex-col justify-between gap-y-3 w-1/2">
        <Input
          label={'Pseudo'}
          value={pseudo}
          placeholder={'Entrez votre pseudo'}
          onChange={(e) => {
            setPseudo(e.target.value);
          }}
        />
        <Input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          label={'Mail'}
          placeholder={email}
        />
        <Input
          type="textarea"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          label={'Description'}
          placeholder={description}
        />

        <Button
          className="rounded bg-green-500"
          title={'Valider'}
          onClick={() => {
            updateUser();
          }}
        />
      </div>
    </div>
  );
};

export default ProfileManager;
