interface LabelProps {
  children?: any;
  style?: any;
  className?: any;
  onClick?: () => void;
}
export const Label = (props: LabelProps) => {
  return (
    <div onClick={() => props.onClick} className={props.className}>
      {props.children}
    </div>
  );
};
