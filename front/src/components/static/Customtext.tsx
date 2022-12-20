interface CustomTextProps {
  children?: any;
  className?: any;
  style?: any;
}

export const CustomText = (props: CustomTextProps) => {
  if (props.children) {
    return <span className={''}>{props.children}</span>;
  } else {
    return null;
  }
};
