import { useRouter } from 'next/router';
import { Suspense, useEffect, useState } from 'react';
import { getProfile } from '@/services/user-service';
import IUserWithCharacters from '@/lib/interfaces/user/user-characters.interface';
import { Divider, Image } from '@nextui-org/react';
import IBaseCharacter from '@/lib/interfaces/characters/base-character.interface';
import BaseCharacterCard from '@/lib/components/characters/base-character-card';
import NextImage from 'next/image';
import Loader from '@/lib/components/conditionals/loader';
import useHead from '@/lib/hooks/context/useHead';

export default function ProfilePage() {
  const { query } = useRouter();
  const username = query.username as string;

  const [user, setUser] = useState<IUserWithCharacters>();

  useHead(username);

  useEffect(() => {
    getProfile(username)
      .then((data) => {
        setUser(data);
      });
  }, [username]);

  return (
    <Suspense fallback={<Loader loaded={false}/>}>
      <article className='w-full h-full flex flex-col md:flex-row px-4 gap-2'>
        <aside className='justify-self-start flex flex-row md:flex-col gap-3 md:w-[300px] p-2'>
          <Image
            width={300}
            height={200}
            alt='NextUI hero Image with delay'
            src={user?.imageUrl}
          />

          <div className='w-full justify-self-stretch'>
            <h4 className='text-3xl'>{user?.username}</h4>
            <em>Created: {new Date(user?.createdAt || '').toDateString()}</em>
          </div>
        </aside>

        <Divider orientation='vertical' className='md:block hidden'/>
        <Divider orientation='horizontal' className='block md:hidden'/>

        <div className='p-2 w-full'>
          <div
            className='grid gap-3'
            style={{
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr)',
            }}
          >
            {user?.BaseCharacter !== undefined ? (
              user?.BaseCharacter.map((char: IBaseCharacter) => {
                return <BaseCharacterCard key={char.id} character={char}/>;
              })
            ) : (
              <h1>No Characters :(</h1>
            )}
          </div>
        </div>
      </article>
    </Suspense>
  );
}