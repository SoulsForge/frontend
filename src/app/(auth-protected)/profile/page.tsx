'use client';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useAuth from '~/hooks/useAuth';
import IUserWithCharacters from '~/lib/interfaces/auth/user-with-characters.interface';
import IBaseCharacter from '~/lib/interfaces/characters/base-character.interface';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL + '/auth';

export default function ProfilePage() {
  const { user, token } = useAuth();

  const [profile, setProfile] = useState<IUserWithCharacters>();

  useEffect(() => {
    // Get profile

    console.log(token);

    fetch(`${BASE_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((json) => {
        setProfile(json);
      });
  }, [token]);

  return (
    <section>
      <p>{user?.id}</p>
      <p>{user?.username}</p>
      <p>{user?.email}</p>
      <p>{user?.createdAt}</p>
      <p>{user?.updatedAt}</p>
      <section className='flex flex-row flex-wrap gap-4'>
        {profile?.BaseCharacter.map((c: IBaseCharacter) => (
          <Card
            key={c.id}
            className='max-w-md'
            as={Link}
            href={`characters/elden-ring/${c.id}`}
          >
            <CardHeader>
              <p>{c.name}</p>
            </CardHeader>
            <CardBody>
              <p>{c.description}</p>
            </CardBody>
            <CardFooter>
              <p>created: {c.createdAt.toString()}</p>
            </CardFooter>
          </Card>
        ))}
      </section>
    </section>
  );
}
