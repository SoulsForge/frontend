import { Divider, Textarea } from '@nextui-org/react';
import { useState } from 'react';

interface Props {
  value: string | undefined;
  title: string;
  placeholder?: string;
  onHandleChange: (value: string) => void;
}

export default function CharacterTextEdit({
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
      <Textarea
        placeholder={placeholder}
        value={v}
        maxRows={3}
        maxLength={255}
        onValueChange={setV}
        onBlur={() => {
          onHandleChange(v!);
        }}
      />
      <small>{v?.length}/255</small>
    </div>
  );
}
