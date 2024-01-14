import { Divider, Input } from '@nextui-org/react';
import { useState } from 'react';

interface Props {
  value: number | undefined;
  title?: string;
  placeholder?: string;
  onHandleChange: (value: string | null) => void;
}

export default function CharacterNumberEdit({
                                              value,
                                              title,
                                              placeholder = 'Match',
                                              onHandleChange
                                            }: Props) {

  const [v, setV] = useState(value);


  return (
    <div className='flex flex-col gap-1'>
      {
        title && (
          <>
            <h2>{title}</h2>
            <Divider orientation='horizontal'/>
          </>
        )
      }
      <Input
        classNames={{
          mainWrapper: 'w-[50px]'
        }}
        pattern='\d'
        size='sm'
        maxLength={3}
        placeholder={placeholder}
        value={isNaN(parseInt(v!.toString())) ? '' : v!.toString()}
        onValueChange={(val: string) => {
          setV(parseInt(val));
        }}
        onBlur={(e) => {
          onHandleChange(isNaN(v!) ? null : v!.toString());
        }}
      />
    </div>
  );
}
