import { gql, useMutation } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';
import userContext from '../contexts/UserContext';
import { Article, FileImageData, User } from '../model/models';
import { getImageFromFile, isNullOrEmpty } from '../services/utils';
import { Avatar } from './static/Avatar';
import { Button } from './static/Button';
import { Input } from './static/Input';
import { Label } from './static/Label';
import { GenericModal } from './static/Modal';
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
interface UserProfileProps {
  user?: User;
  articles?: Article[];
  editMode?: boolean;
  onChange?: (value: any) => void;
  onClickAvatar?: () => void;
}

export const Userprofile = (props: UserProfileProps) => {
  const currentUser = useContext(userContext).user;
  const [pseudo, setPseudo] = useState(currentUser.pseudo);
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState(currentUser.password);
  const [description, setDescription] = useState(currentUser.description);
  const [showModal, setShowModal] = useState(false);
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const YEAH_BUDDY = new Audio('yeah_buddy.mp3');
  const [editMode, setEditMode] = useState(false);
  const articles = props.articles && props.articles;

  const [updateUser] = useMutation(UPDATE_USER_MUTATION, {
    variables: {
      email: currentUser.email,
      pseudo: pseudo,
      description: description,
      avatar: avatar,
    },
  });
  useEffect(() => {
    if (currentUser) {
      setPseudo(currentUser.pseudo);
      setEmail(currentUser.email);
      setDescription(currentUser.description);
      setAvatar(currentUser.avatar);
      setEditMode(false);
    }
  }, [currentUser]);

  return (
    <>
      <div
        className={'userProfileGlobal'}
        style={{ display: 'flex', flexDirection: 'column', padding: '40px', height: '70%' }}
      >
        <div
          style={{
            position: 'absolute',
            backgroundColor: 'white',
            borderRadius: '100%',
            display: 'flex',
            width: 150,
            height: 150,
            top: -20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Avatar
            avatarBackgroundColor="#cc987a"
            onClick={() => {
              setShowModal(true);
              YEAH_BUDDY.play();
              YEAH_BUDDY.onended = () => {
                YEAH_BUDDY.pause();
              };
            }}
            src={avatar || ''}
          />
        </div>

        <>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              minWidth: '100%',
              justifyContent: 'space-between',
              position: 'relative',
              top: 100,
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Label className={'py-2'}>Pseudo: </Label>
              <Value className={'text-slate-300'}>{pseudo}</Value>
              <Label className={'py-2'}>Email: </Label>
              <Value className={'text-slate-300'}>{email}</Value>
              <div>
                <Label className={'py-2'}>Vos articles: </Label>

                {articles?.map((article, index) => {
                  return (
                    // article.userId === props.user.id && (
                    <Label key={index}>
                      <Value className={'text-slate-300'}>{article.label}</Value>
                    </Label>
                    // )
                  );
                })}
              </div>
              <Button
                style={{ borderRadius: '3px' }}
                title={'Editer'}
                onClick={() => {
                  setShowModal(true);
                  YEAH_BUDDY.play();
                  YEAH_BUDDY.onended = () => {
                    YEAH_BUDDY.pause();
                  };
                }}
              />
            </div>

            {/* <Label className={'py-2'}>Description: </Label> */}
            <figure style={{ width: '100%', textAlign: 'center' }}>
              <blockquote>
                <p className="citation">
                  {description === 'Description'
                    ? '"L\'inspiration vient de l\'intérieur. Malheureusement, je suis vide..!!!"'
                    : '"' + description}
                </p>
              </blockquote>
              <figcaption className="citationUser">
                {`_${pseudo},`} <cite className="citationOrigin">YeahBuddy.com</cite>
              </figcaption>
            </figure>
          </div>
        </>
        {/* )} */}
      </div>
      <GenericModal
        cancelLabel="Fermer"
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        title={
          <div
            style={{
              flexDirection: 'row',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              padding: '40px',
            }}
          >
            <div
              style={{
                flexDirection: 'column',
                display: 'flex',
                height: '100%',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '40px',
              }}
            >
              <div>{currentUser.pseudo}</div>
              <Avatar
                onClick={() => {
                  setShowModal(true);
                  YEAH_BUDDY.play();
                  YEAH_BUDDY.onended = () => {
                    YEAH_BUDDY.pause();
                  };
                }}
                src={avatar !== null ? avatar : ''}
              />
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

            <div
              style={{
                flexDirection: 'column',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
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
                label={'description'}
                placeholder={description}
              />

              <Button
                style={{ borderRadius: '3px' }}
                title={'Valider'}
                onClick={
                  () => {
                    updateUser();
                    YEAH_BUDDY.play();
                    YEAH_BUDDY.onended = () => {
                      YEAH_BUDDY.pause();
                    };
                    setShowModal(false);
                  }

                  //DO SOMETHING ELSE WITH BDD
                }
              />
            </div>
          </div>
        }
      ></GenericModal>
    </>
  );
};
