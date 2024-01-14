import Link from 'next/link';
import { Card, CardBody, CardHeader, Image } from '@nextui-org/react';
import IBaseCharacter from '@/lib/interfaces/characters/base-character.interface';

const gamesLink = new Map<string, string>([['Elden Ring', 'elden-ring']]);

export default function BaseCharacterCard({
                                            character,
                                          }: {
  character: IBaseCharacter;
}) {
  return (
    <Card className='py-4 max-w-[300px] min-w-[200px] hover:scale-[1.01]'
          shadow='sm'
          as={Link}
          href={`/${gamesLink.get(character.game.name)}/${character.specificCharacterId}`}>
      <CardHeader className='pb-0 pt-2 px-4 flex-col items-start'>
        <small>{character.game.name}</small>
        <h4 className='font-bold text-large'>{character.name}</h4>
      </CardHeader>
      <CardBody className='overflow-visible py-2'>
        <Image
          width='100%'
          alt={character.name}
          className='w-full object-cover h-[140px]'
          src={character.imageUrl}
        />
      </CardBody>
    </Card>
    // <Link
    //   href={`/${gamesLink.get(character.game.name)}/${character.specificCharacterId}`}
    //   className='max-w-[384px] md:max-w-[250px] bg-red-600'
    // >
    //   <div className='bg-content2 hover:scale-105 transition flex flex-col gap-2 p-2'>
    //     <div className='font-bold text-xl mb-2'>{character.name}</div>
    //     <NextImage
    //       src={character.imageUrl}
    //       alt='Placeholder Image'
    //       width={300}
    //       height={200}
    //       className='w-full h-48 rounded-md object-cover'
    //     />
    //     <div>{character.game.name}</div>
    //   </div>
    // </Link>
  );
}
