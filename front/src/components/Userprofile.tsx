import { useEffect, useState } from 'react';
import { Article, FileImageData, User } from '../model/models';
import { getImageFromFile, isNullOrEmpty } from '../services/utils';
import { Avatar } from './static/Avatar';
import { Input } from './static/Input';
import { Label } from './static/Label';
import { GenericModal } from './static/Modal';
import { Value } from './static/Value';

interface UserProfileProps {
  user: User;
  articles?: Article[];
  editMode?: boolean;
  onChange?: (value: any) => void;
  onClickAvatar?: () => void;
}

export const Userprofile = (props: UserProfileProps) => {
  const [pseudo, setPseudo] = useState(props.user.pseudo);
  const [password, setPassword] = useState(props.user.password);
  const [showModal, setShowModal] = useState(false);
  const [avatar, setAvatar] = useState(localStorage.getItem('userImage'));
  const YEAH_BUDDY = new Audio('yeah_buddy.mp3');
  const articles = props.articles && props.articles;
  return (
    <>
      <div className={'userProfileGlobal'} style={{ display: 'flex', flexDirection: 'column' }}>
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
        {props.editMode && (
          <input
            onChange={async (e) => {
              try {
                const file = (e.target as any).files[0];

                const img: FileImageData = await getImageFromFile(file);

                setAvatar(img.base64Data);
                localStorage.setItem('userImage', img.base64Data);
              } catch (err) {
                console.log(err);
              }
            }}
            accept={'image/*'}
            type={'file'}
          />
        )}

        {props.editMode ? (
          <>
            <Input
              label={'Pseudo'}
              value={pseudo}
              placeholder={pseudo}
              onChange={(e) => {
                setPseudo(e.target.value);
              }}
            />
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label={'Password'}
              placeholder={password}
            />
          </>
        ) : (
          <>
            <Label className={'py-2'}>Pseudo: </Label>
            <Value className={'text-slate-300'}>{pseudo}</Value>
            <Label className={'py-2'}>Password: </Label>
            <Value className={'text-slate-300'}>{password}</Value>
          </>
        )}
        {!props.editMode && <Label className={'py-2'}>Vos articles: </Label>}
        {!props.editMode &&
          articles?.map((article, index) => {
            return (
              article.userId === props.user.id && (
                <Label key={index}>
                  <Value className={'text-slate-300'}>{article.label}</Value>
                </Label>
              )
            );
          })}
      </div>
      <GenericModal
        cancelLabel="Fermer"
        isOpen={showModal}
        title={
          <div
            style={{
              flexDirection: 'row',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>{props.user.pseudo}</div>{' '}
            <Avatar onClick={() => setShowModal(true)} src={avatar !== null ? avatar : ''} />
          </div>
        }
        onCancel={() => setShowModal(false)}
      >
        <div>{props.user.description}</div>
      </GenericModal>
    </>
  );
};
