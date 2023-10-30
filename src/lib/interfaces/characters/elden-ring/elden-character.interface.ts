import IBaseCharacter from '../base-character.interface';
import IEldenRingAtributes from './elden-atributes.interface';

export default interface IEldenRingCharacter {
  characterDto: IBaseCharacter;
  atributesDto: IEldenRingAtributes;
}
