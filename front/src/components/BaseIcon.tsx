import * as icons from 'react-bootstrap-icons';

export const SMALL_ICON_SIZE = 14;
export const NORMAL_ICON_SIZE = 20;
export const ACTION_ICON_SIZE: number = 30;

interface BaseIconProps {
  size?: number;
  disabled?: boolean;
  onPress?: () => void;
  color?: string;
  style?: any;
  sizeFactor?: number;
  iconName: keyof typeof icons;
}

export const BaseIcon = (props: BaseIconProps) => {
  const { size, iconName, ...rest } = props;
  const BootstrapIcon = icons[iconName];

  return <BootstrapIcon size={size || ACTION_ICON_SIZE} {...rest} />;
};

interface ThemeIconProps {
  size?: number;
  disabled?: boolean;
  onClick?: () => void;
  color?: string;
  style?: any;
}

export const EditIcon = (props: ThemeIconProps) => {
  return <BaseIcon iconName={'PencilSquare'} size={NORMAL_ICON_SIZE} {...props} />;
};

export const ChevronLeftIcon = (props: ThemeIconProps) => {
  return <BaseIcon iconName="ChevronLeft" {...props} />;
};

export const ChevronRightIcon = (props: ThemeIconProps) => {
  return <BaseIcon iconName="ChevronRight" {...props} />;
};

interface DeleteIconProps extends ThemeIconProps {
  deleted: boolean;
}
export const DeleteIcon = (props: DeleteIconProps) => {
  return (
    <BaseIcon
      size={props.deleted ? 17 : 16}
      iconName={props.deleted ? 'Trash' : 'TrashFill'}
      {...props}
    />
  );
};

interface LockIconProps extends ThemeIconProps {
  locked: boolean;
}
export const LockIcon = (props: LockIconProps) => {
  const { style, ...rest } = props;
  return (
    <BaseIcon
      size={props.locked ? 20 : 18}
      iconName={props.locked ? 'LockFill' : 'UnlockFill'}
      style={{
        marginBottom: 2,
        ...props.style,
      }}
      {...rest}
    />
  );
};

export const CheckCircleIcon = (props: ThemeIconProps) => {
  return <BaseIcon iconName="CheckCircle" {...props} />;
};
export const CancelCircleIcon = (props: ThemeIconProps) => {
  return <BaseIcon iconName="XCircle" {...props} />;
};

export const EraserIcon = (props: ThemeIconProps) => {
  const { size, disabled, onClick, color, style, ...rest } = props;

  return <BaseIcon iconName="EraserFill" size={size || ACTION_ICON_SIZE} {...rest} />;
};
