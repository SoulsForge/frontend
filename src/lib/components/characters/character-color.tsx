import { Divider } from '@nextui-org/react';
import IColor from '@/lib/interfaces/color.interface';

interface Props {
  value: IColor;
  title: string;
  placeholder?: string;
}

export default function CharacterColor({
  title,
  value,
  placeholder = 'Match',
}: Props) {
  return (
    <div className="flex flex-col gap-1">
      <h2>{title}</h2>
      <Divider orientation="horizontal" />
      <div className="flex flex-row gap-2">
        <p>{value.r || placeholder}</p>
        <p>{value.g || placeholder}</p>
        <p>{value.b || placeholder}</p>
      </div>
    </div>
  );
}
