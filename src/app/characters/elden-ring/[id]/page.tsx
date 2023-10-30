'use client';

import { useParams, useRouter } from 'next/navigation';
import { PropsWithChildren, useEffect, useState } from 'react';
import IEldenRingCharacter from '~/lib/interfaces/characters/elden-ring/elden-character.interface';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function EldenRingPage({ children }: PropsWithChildren) {
  const { id } = useParams();

  const [character, setCharacter] = useState<IEldenRingCharacter>();

  useEffect(() => {
    fetch(`${BASE_URL}/elden-ring-character/${id}`)
      .then((res) => res.json())
      .then((json) => {
        console.log({
          atributesDto: json.atributes,
          characterDto: json.baseCharacter
        });

        setCharacter({
          atributesDto: json.atributes,
          characterDto: json.baseCharacter
        });
      });
  }, [id]);

  return (
    <article>
      <section>
        <p>{character?.characterDto.name}</p>
        <p>{character?.characterDto.description}</p>
        {<p>Arms: {character?.atributesDto.right_eye['clouding_b']}</p>}
      </section>
    </article>
  );
}
