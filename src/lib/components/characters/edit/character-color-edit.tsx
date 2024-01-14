import { Divider, Input } from '@nextui-org/react';
import { useState } from 'react';
import IColor from '@/lib/interfaces/color.interface';

interface Props {
  value: IColor;
  title: string;
  placeholder?: string;
  onHandleChangeR: (value: number) => void;
  onHandleChangeG: (value: number) => void;
  onHandleChangeB: (value: number) => void;

}

export default function CharacterColorEdit({
                                             title,
                                             value,
                                             placeholder,
                                             onHandleChangeR,
                                             onHandleChangeG,
                                             onHandleChangeB

                                           }: Props) {

  const [v, setV] = useState(value);

  return (
    <div className='flex flex-col gap-1'>
      <h2>{title}</h2>
      <Divider orientation='horizontal'/>
      <div className='flex flex-row gap-2'>
        <Input
          classNames={{
            mainWrapper: 'w-[50px]'
          }}
          pattern='\d'
          size='sm'
          maxLength={3}
          placeholder={placeholder}
          value={isNaN(v.r!) ? '' : v.r!.toString()}
          onValueChange={(val: string) => {
            setV(prevState => ({
              ...prevState,
              r: parseInt(val)
            }));
          }}
          onBlur={(e) => {
            onHandleChangeR(v.r!);
          }}
        />

        <Input
          classNames={{
            mainWrapper: 'w-[50px]'
          }}
          pattern='\d'
          size='sm'
          maxLength={3}
          placeholder={placeholder}
          value={isNaN(v.g!) ? '' : v.g!.toString()}
          onValueChange={(val: string) => {
            setV(prevState => ({
              ...prevState,
              g: parseInt(val)
            }));
          }}
          onBlur={(e) => {
            onHandleChangeG(v.g!);
          }}
        />

        <Input
          classNames={{
            mainWrapper: 'w-[50px]'
          }}
          pattern='\d'
          size='sm'
          maxLength={3}
          placeholder={placeholder}
          value={isNaN(v.b!) ? '' : v.b!.toString()}
          onValueChange={(val: string) => {
            setV(prevState => ({
              ...prevState,
              b: parseInt(val)
            }));
          }}
          onBlur={(e) => {
            onHandleChangeB(v.b!);
          }}
        />
      </div>
    </div>
  );
}
