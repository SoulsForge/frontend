import { Divider, Select, SelectItem } from '@nextui-org/react';
import { useState } from 'react';
import { generateOptions } from '@/lib/utilities/generateOptions';

interface Props {
  value?: string | undefined;
  title: string;
  placeholder?: string;
  options: Record<string, string>;
  onHandleChange: (value: any) => void;
}

export default function CharacterSelectEdit({
                                              value,
                                              title,
                                              placeholder = 'Match',
                                              options,
                                              onHandleChange
                                            }: Props) {

  const [v, setV] = useState([value]);
  const o = generateOptions(options);

  return (
    <div className='flex flex-col gap-1'>
      <h2>{title}</h2>
      <Divider orientation='horizontal'/>
      <Select
        placeholder={placeholder}
        aria-label={`select for ${title}`}
        classNames={{
          base: 'w-[125px]'
        }}
        size='sm'
        selectionMode='single'
        // @ts-ignore
        selectedKeys={v}
        // @ts-ignore
        onSelectionChange={(keys: any) => {
          setV(keys);
          onHandleChange(keys.currentKey);
        }}
      >
        {
          o.map(option => <SelectItem key={option} value={option}>{option}</SelectItem>)
        }
      </Select>
    </div>
  );
}
