import { useRouter } from 'next/router';
import useAuth from '@/lib/hooks/context/useAuth';
import { useEffect, useState, useTransition } from 'react';
import {
  EldenRingAttributesWithComponent,
  getAttributesWithComponents, getAttributesWithComponentsEdit
} from '@/lib/utilities/characters/elden-ring/utilities';
import { getCharacterById, saveCharacter } from '@/services/elden-ring-service';
import Loader from '@/lib/components/conditionals/loader';
import IEldenRingCharacter from '@/lib/interfaces/characters/elden-ring/elden-ring-character.interface';
import { Button, Divider } from '@nextui-org/react';
import CharacterSectionContainer from '@/lib/components/characters/section-container';
import { wait } from 'next/dist/lib/wait';
import useFormState from '@/lib/hooks/useFormState';
import IEldenRingAttributes from '@/lib/interfaces/characters/elden-ring/elden-ring-attributes.interface';

export default function PageEdit() {
  const { query } = useRouter();
  const characterId = parseInt(query.id as string);
  const { user, token } = useAuth();
  const [character, setCharacter] = useState<IEldenRingCharacter>();
  const [attributes, setAttributes] =
    useState<EldenRingAttributesWithComponent>();
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const router = useRouter();

  const handleSave = async () => {
    setIsSaving(true);

    try {
      const response = await saveCharacter(characterId, character!);
      router.push(`/er/${characterId}`);
    } catch (e) {
      console.error('error saving character', e);
    }

    setIsSaving(false);
  };

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
    if (character) setAttributes(getAttributesWithComponentsEdit(character, handleEditCharacterProperty));
  }, [character]);

  const handleEditCharacterProperty = (property: string, value: any) => {
    // @ts-ignore
    setCharacter((prevState) => {
      const newCharacter = { ...prevState };

      const properties = property.split('.');

      let currentObject = newCharacter;
      for (let i = 0; i < properties.length - 1; i++) {
        const part = properties[i];

        // @ts-ignore
        if (!currentObject[part]) {
          // @ts-ignore
          currentObject[part] = {};
        }

        // @ts-ignore
        currentObject = currentObject[part];
      }

      // @ts-ignore
      currentObject[properties[properties.length - 1]] = value;

      return newCharacter;
    });
  };


  return (
    <Loader loaded={Boolean(character) && Boolean(attributes)}>
      <article className='h-full flex flex-col gap-2 mx-auto my-2 lg:w-3/4'>
        <div className='flex flex-row justify-between p-4'>
          <div className='flex flex-row justify-center items-center gap-3'>
            <h1 className='text-3xl'>Edit</h1>
          </div>

          <div className='flex flex-row gap-4'>
            <Button
              isDisabled={isSaving}
              isLoading={isSaving}
              title='Save'
              color='success'
              onClick={handleSave}
            >
              Save
            </Button>
            <Button isDisabled={isSaving} title='Cancel' color='danger'>
              Cancel
            </Button>
          </div>
        </div>

        <Divider orientation='horizontal'/>

        <section className='h-full flex flex-col gap-4 lg'>
          {attributes?.name}
          {attributes?.description}
          {attributes?.imageUrl}
          <section
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
        </section>
      </article>
    </Loader>
  );
}