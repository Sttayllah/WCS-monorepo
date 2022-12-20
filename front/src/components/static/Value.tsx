import { isNullOrEmpty } from '../../services/utils';
import { CustomText } from './Customtext';
import { NullValue } from './NullValue';

interface ValueProps {
  style?: any;
  children?: any;
  replaceUndefined?: boolean;
  className?: any;
}

export const Value = (props: ValueProps) => {
  return (
    <div className={props.className}>
      <CustomText style={props.style} className={''}>
        {props.replaceUndefined ? (
          !isNullOrEmpty(props.children) ? (
            props.children
          ) : (
            <NullValue />
          )
        ) : (
          props.children
        )}
      </CustomText>
    </div>
  );
};
