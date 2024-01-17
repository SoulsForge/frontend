import { Button, ButtonProps } from '@nextui-org/react';

interface Props extends ButtonProps {
  selected: boolean;
}

export default function LinkButton(props: Props) {
  return (
    <Button
      {...props}
      className={`justify-start border-0 ${props.selected ? `bg-default/75` : ''}`}>
      {props.children}
    </Button>
  );
}