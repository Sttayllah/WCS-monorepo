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
      style={{ backgroundColor: props.avatarBackgroundColor, borderRadius: '100%' }}
      onClick={props.onClick && props.onClick}
    >
      {!isNullOrEmpty(props.src) ? (
        <img
          style={{ borderRadius: '100%', maxWidth: 100, padding: '10px 10px' }}
          src={props.src}
          alt="user avatar"
        />
      ) : (
        <PersonFill color={props.avatarColor} size={40} />
      )}
    </div>
  );
};
