import { PersonFill } from 'react-bootstrap-icons';
// import { isNullOrEmpty } from '../../services/utils';

interface AvatarProps {
  src?: string;
  avatarColor?: string;
  avatarBackgroundColor?: string;
  onClick?: () => void;
  className?: string;
}
export const Avatar = (props: AvatarProps) => {
  return (
    <div
      className={`flex justify-center items-center w-10 h-10 p-1 ${props.className} ${props.avatarBackgroundColor}`}
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
