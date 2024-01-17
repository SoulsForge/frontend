import { useRouter } from 'next/router';
import CharacterSectionContainer from '@/lib/components/characters/section-container';
import { Suspense, useEffect, useState } from 'react';
import IEldenRingCharacter from '@/lib/interfaces/characters/elden-ring/elden-ring-character.interface';
import {
  EldenRingAttributesWithComponent,
  getAttributesWithComponents
} from '@/lib/utilities/characters/elden-ring/utilities';
import { getCharacterById } from '@/services/elden-ring-service';
import Loader from '@/lib/components/conditionals/loader';
import NextImage from 'next/image';
import useMediaQuery from '@/lib/hooks/useMediaQuery';
import { Button, Image } from '@nextui-org/react';
import useAuth from '@/lib/hooks/context/useAuth';
import NextLink from 'next/link';
import useHead from '@/lib/hooks/context/useHead';

export default function EldenRingCharacterPage() {
  const { query } = useRouter();
  const characterId = parseInt(query.id as string);
  const { user } = useAuth();
  const isLargeViewport = useMediaQuery('(min-width: 1024px)');
  const [character, setCharacter] = useState<IEldenRingCharacter>();
  const [attributes, setAttributes] =
    useState<EldenRingAttributesWithComponent>();

  const { setCustomTitle } = useHead(character?.character.name);

  useEffect(() => {
    if (!characterId)
      return;

    getCharacterById(characterId)
      .then(data => {
        setCharacter({
          attributes: data.attributes,
          character: data.baseCharacter,
        });

      });
  }, [characterId]);

  useEffect(() => {
    if (character) {
      setAttributes(getAttributesWithComponents(character));
    }
  }, [character]);

  if (!character) {
    return <Loader loaded={Boolean(character) && Boolean(attributes)} className='flex-grow'/>;
  }

  return (
    <>
      <article className='h-full flex flex-col gap-2 mx-auto my-2 lg:w-3/4'>

        {user?.id === character?.character.user.id && (

          <section className='flex flex-row gap-4 justify-end'>

            <Button as={NextLink} href={`/er/${character?.character.id}/edit`} title='Save'
                    color='success'>Edit</Button>
            <Button title='Delete' color='danger'>Delete</Button>

          </section>
        )}

        <section className='h-full flex flex-col gap-4 lg'>
          {isLargeViewport ? (
            <>
              <p className='text-4xl text-center'>
                {character?.character.name}
              </p>
              <div className='flex flex-row'>
                <p className='flex-grow'>{character?.character.description}</p>
                <Image
                  as={NextImage}
                  src={character?.character.imageUrl}
                  alt=''
                  width={300}
                  height={200}
                />
              </div>
            </>
          ) : (
            <>
              <p className='text-4xl text-center'>
                {character?.character.name}
              </p>
              <p>{character?.character.description}</p>
              <Image
                as={NextImage}
                src={character?.character.imageUrl}
                alt=''
                width={300}
                height={200}
              />
            </>
          )}
        </section>


        <section
          // className={`flex ${settings!.rowVisualization ? 'flex-row' : 'flex-col'} flex-wrap ${!settings!.compactVisualization && 'gap-4'}`}
          className={`flex flex-row flex-wrap gap-4`}
        >
          {/* BASE SECTION */}
          <CharacterSectionContainer
            sectionTitle='Base'
            child={attributes?.base}
          />

          {/*  SKIN COLOR*/}
          <CharacterSectionContainer
            sectionTitle='Skin'
            child={attributes?.skin}
          />

          {/*  ADJUST FACE TEMPLATE*/}
          <CharacterSectionContainer
            sectionTitle='Adjust Face Template'
            child={attributes?.adjustFaceTemplate}
          />

          {/*  FACIAL BALANCE */}
          <CharacterSectionContainer
            sectionTitle='Facial Balance'
            child={attributes?.facialBalance}
          />

          {/*  FOREHEAD */}
          <CharacterSectionContainer
            sectionTitle='Forehead/Glabella'
            child={attributes?.forehead}
          />

          {/*  BROWS RIDGE */}
          <CharacterSectionContainer
            sectionTitle='Brows Ridge'
            child={attributes?.brow_ridge}
          />

          {/*  EYES */}
          <CharacterSectionContainer
            sectionTitle='Eyes'
            child={attributes?.eyes}
          />

          {/*  NOSE RIDGE */}
          <CharacterSectionContainer
            sectionTitle='Nose Ridge'
            child={attributes?.nose_ridge}
          />

          {/*  Nostrils */}
          <CharacterSectionContainer
            sectionTitle='Nostrils'
            child={attributes?.nostrils}
          />

          {/*  Cheeks */}
          <CharacterSectionContainer
            sectionTitle='Cheeks'
            child={attributes?.cheeks}
          />

          {/*  Lips */}
          <CharacterSectionContainer
            sectionTitle='Lips'
            child={attributes?.lips}
          />

          {/*  Mouth */}
          <CharacterSectionContainer
            sectionTitle='Mouth'
            child={attributes?.mouth}
          />

          {/*  Chin */}
          <CharacterSectionContainer
            sectionTitle='Chin'
            child={attributes?.chin}
          />

          {/*  Jaw */}
          <CharacterSectionContainer
            sectionTitle='Jaw'
            child={attributes?.jaw}
          />

          {/*  Hair */}
          <CharacterSectionContainer
            sectionTitle='Hair'
            child={attributes?.hair}
          />

          {/*  Eyebrows */}
          <CharacterSectionContainer
            sectionTitle='Eyebrows'
            child={attributes?.eyebrows}
          />

          {/*  Facial Hair */}
          <CharacterSectionContainer
            sectionTitle='Facial Hair'
            child={attributes?.facial_hair}
          />

          {/*  Eyelashes */}
          <CharacterSectionContainer
            sectionTitle='Eyelashes'
            child={attributes?.eyelashes}
          />

          {/* Right Eye */}
          <CharacterSectionContainer
            sectionTitle='Right Eye'
            child={attributes?.right_eye}
          />

          {/* Left Eye */}
          <CharacterSectionContainer
            sectionTitle='Left Eye'
            child={attributes?.left_eye}
          />

          {/* Skin Feature */}
          <CharacterSectionContainer
            sectionTitle='Skin Feature'
            child={attributes?.skin_features}
          />

          {/* Cosmetics */}
          <CharacterSectionContainer
            sectionTitle='Cosmetics'
            child={attributes?.cosmetics}
          />

          {/* Tattoo/Mark/Eyepatch */}
          <CharacterSectionContainer
            sectionTitle='Tattoo/Mark/Eyepatch'
            child={attributes?.tattoo_mark_eyepatch}
          />

          {/* Body */}
          <CharacterSectionContainer
            sectionTitle='Body'
            child={attributes?.body}
          />
        </section>
      </article>
    </>
  );
}