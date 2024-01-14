import IBaseCharacter from '@/lib/interfaces/characters/base-character.interface';
import IEldenRingAttributes from '@/lib/interfaces/characters/elden-ring/elden-ring-attributes.interface';

export default interface IEldenRingCharacter {
  character: IBaseCharacter;
  attributes: IEldenRingAttributes;
}
