import { Divider, Input } from '@nextui-org/react';
import { useState } from 'react';

interface Props {
  value: string | undefined;
  title: string;
  placeholder?: string;
  onHandleChange: (value: string) => void;
}

export default function CharacterLabelEdit({
                                             value,
                                             title,
                                             placeholder = 'Match',
                                             onHandleChange
                                           }: Props) {

  const [v, setV] = useState(value);

  return (
    <div className='flex flex-col gap-1'>
      <h2>{title}</h2>
      <Divider orientation='horizontal'/>
      <Input
        size='sm'
        placeholder={placeholder}
        value={v}
        onValueChange={setV}
        onBlur={() => {
          onHandleChange(v!);
        }}
      />
    </div>
  );
}
