import classNames from 'classnames';
import { PersonFill } from 'react-bootstrap-icons';
import { isNullOrEmpty } from '../../services/utils';

interface AvatarProps {
  src?: string;
  avatarColor?: string;
  avatarBackgroundColor?: string;
  onClick?: () => void;
}
export const Avatar = (props: AvatarProps) => {
  return (
    <div
      className={classNames('')}
      style={{
        backgroundColor: props.avatarBackgroundColor,
        borderRadius: '100%',
        display: 'flex',
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onClick={props.onClick && props.onClick}
    >
      {props.src !== 'avatar' ? (
        <img
          style={{ borderRadius: '100%', maxWidth: 150, padding: '10px 10px' }}
          src={props.src}
          alt="user avatar"
        />
      ) : (
        <PersonFill color={props.avatarColor || '#808080'} size={50} />
      )}
    </div>
  );
};
