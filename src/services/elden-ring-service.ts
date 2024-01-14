import client from '@/services/fetch-client';
import { BACKEND_BASE_URL } from '@/config/env-vars';
import IEldenRingCharacter from '@/lib/interfaces/characters/elden-ring/elden-ring-character.interface';

export async function getCharacterById(characterId: number): Promise<any> {
  const response = await client(`${BACKEND_BASE_URL}/elden-ring-character/${characterId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });


  return await response.json();
}

export async function saveCharacter(characterId: number, character: IEldenRingCharacter): Promise<any> {

  const newChar = {
    characterDto: {
      name: character.character.name,
      description: character.character.description,
      imageUrl: character.character.imageUrl
    },
    attributesDto: {
      body_type: character.attributes.body_type,
      age: character.attributes.age,
      voice: character.attributes.voice,
      skin_color: character.attributes.skin_color,
      face_template: character.attributes.face_template,
      face_balance: character.attributes.face_balance,
      forehead: character.attributes.forehead,
      brow_ridge: character.attributes.brow_ridge,
      eyes: character.attributes.eyes,
      nose_ridge: character.attributes.nose_ridge,
      nostrils: character.attributes.nostrils,
      cheeks: character.attributes.cheeks,
      lips: character.attributes.lips,
      mouth: character.attributes.mouth,
      chin: character.attributes.chin,
      jaw: character.attributes.jaw,
      hair: character.attributes.hair,
      eyebrows: character.attributes.eyebrows,
      facial_hair: character.attributes.facial_hair,
      eyelashes: character.attributes.eyelashes,
      right_eye: character.attributes.right_eye,
      left_eye: character.attributes.left_eye,
      skin_features: character.attributes.skin_features,
      cosmetics: character.attributes.cosmetics,
      tattoo_mark_eyepatch: character.attributes.tattoo_mark_eyepatch,
      body: character.attributes.body,
    }
  };

  const response = await client(`${BACKEND_BASE_URL}/elden-ring-character/${characterId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newChar)
  });

  return await response.json();
}