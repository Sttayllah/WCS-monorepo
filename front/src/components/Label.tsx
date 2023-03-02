interface LabelProps {
  children?: any;
  style?: any;
  className?: any;
}

export const Label = (props: LabelProps) => {
  return (
    <div className={props.className ? props.className : 'label'} style={props.style}>
      {props.children}
    </div>
  );
};
