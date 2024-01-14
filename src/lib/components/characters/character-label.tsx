import { Divider } from '@nextui-org/react';

interface Props {
  value: number | string | undefined;
  title: string;
  placeholder?: string;
}

export default function CharacterLabel({
  value,
  title,
  placeholder = 'Match',
}: Props) {
  return (
    <div className="flex flex-col gap-1">
      <h2>{title}</h2>
      <Divider orientation="horizontal" />
      <p className={`${!value && 'font-extralight'}`}>{value || placeholder}</p>
    </div>
  );
}
