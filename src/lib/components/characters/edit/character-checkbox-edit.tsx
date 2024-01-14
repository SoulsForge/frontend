import { Checkbox, Divider, Input } from '@nextui-org/react';
import { useState } from 'react';
import { X } from 'lucide-react';

interface Props {
  value: boolean | undefined;
  title: string;
  placeholder?: string;
  onHandleChange: (value: boolean) => void;
}

export default function CharacterCheckboxEdit({
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
      <Checkbox
        isSelected={v}
        className='flex-grow mx-auto'
        classNames={{
          wrapper: 'w-[45px] h-[45px]',
          icon: 'w-[30px] h-[30px]'
        }}
        onValueChange={setV}
        onBlur={() => {
          onHandleChange(v!);
        }}
      />
    </div>
  );
}
