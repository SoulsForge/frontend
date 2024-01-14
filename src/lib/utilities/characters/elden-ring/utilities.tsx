import IEldenRingCharacter from '@/lib/interfaces/characters/elden-ring/elden-ring-character.interface';
import CharacterLabel from '@/lib/components/characters/character-label';
import CharacterColor from '@/lib/components/characters/character-color';
import CharacterColorEdit from '@/lib/components/characters/edit/character-color-edit';
import CharacterNumberEdit from '@/lib/components/characters/edit/character-number-edit';
import CharacterCheckboxEdit from '@/lib/components/characters/edit/character-checkbox-edit';
import CharacterSelectEdit from '@/lib/components/characters/edit/character-select-edit';
import CharacterTextEdit from '@/lib/components/characters/edit/character-text-edit';
import CharacterLabelEdit from '@/lib/components/characters/edit/character-label-edit';
import { Age, BodyType, Voice } from '@/lib/interfaces/characters/elden-ring/elden-ring-attributes.interface';


export function getAttributesWithComponents(
  eldenRingChar: IEldenRingCharacter,
): EldenRingAttributesWithComponent {
  const attributes = eldenRingChar.attributes;

  return {
    name: <CharacterLabel value={eldenRingChar?.character.name} title='Character Name'/>,
    description: <CharacterLabel value={eldenRingChar?.character.description} title='Description'/>,
    imageUrl: <CharacterLabel value={eldenRingChar?.character.imageUrl} title='Image Url'/>,
    base: [
      <CharacterLabel value={attributes.body_type} title='Body Type' key=''/>,
      <CharacterLabel value={attributes.age} title='Age' key=''/>,
      <CharacterLabel value={attributes.voice} title='Voice' key=''/>,
    ],
    skin: [
      <CharacterColor
        value={{
          r: parseInt(attributes.skin_color['skin_r']),
          g: parseInt(attributes.skin_color['skin_g']),
          b: parseInt(attributes.skin_color['skin_b']),
        }}
        title='Skin RGB'
        key=''
      />,
    ],
    adjustFaceTemplate: [
      <CharacterLabel
        value={attributes.face_template['structure']}
        title='Structure'
        key=''
      />,
      <CharacterLabel
        value={attributes.face_template['emphasis']}
        title='Emphasis'
        key=''
      />,
      <CharacterLabel
        value={attributes.face_template['age']}
        title='Age'
        key=''
      />,
      <CharacterLabel
        value={attributes.face_template['aesthetic']}
        title='Aesthetic'
        key=''
      />,
    ],
    facialBalance: [
      <CharacterLabel
        value={attributes.face_balance['size']}
        title='Size'
        key=''
      />,
      <CharacterLabel
        value={attributes.face_balance['ratio']}
        title='Ratio'
        key=''
      />,
      <CharacterLabel
        value={attributes.face_balance['protrusion']}
        title='Protrusion'
        key=''
      />,
      <CharacterLabel
        value={attributes.face_balance['vert']}
        title='Vert.
'
        key=''
      />,
      <CharacterLabel
        value={attributes.face_balance['slant']}
        title='Slant'
        key=''
      />,
      <CharacterLabel
        value={attributes.face_balance['horiz']}
        title='Horiz.
'
        key=''
      />,
    ],
    forehead: [
      <CharacterLabel
        value={attributes.forehead['depth']}
        title='Depth'
        key=''
      />,
      <CharacterLabel
        value={attributes.forehead['height']}
        title='Height'
        key=''
      />,
      <CharacterLabel
        value={attributes.forehead['prot1']}
        title='Prot1'
        key=''
      />,
      <CharacterLabel
        value={attributes.forehead['prot2']}
        title='Prot2'
        key=''
      />,
      <CharacterLabel
        value={attributes.forehead['protrusion']}
        title='Protrusion'
        key=''
      />,
      <CharacterLabel
        value={attributes.forehead['width']}
        title='Width'
        key=''
      />,
    ],
    brow_ridge: [
      <CharacterLabel
        value={attributes.brow_ridge['inner']}
        title='Inner'
        key=''
      />,
      <CharacterLabel
        value={attributes.brow_ridge['outer']}
        title='Outer'
        key=''
      />,
      <CharacterLabel
        value={attributes.brow_ridge['height']}
        title='Height'
        key=''
      />,
    ],
    eyes: [
      <CharacterLabel value={attributes.eyes['size']} title='Size' key=''/>,
      <CharacterLabel value={attributes.eyes['slant']} title='Slant' key=''/>,
      <CharacterLabel
        value={attributes.eyes['spacing']}
        title='Spacing'
        key=''
      />,
      <CharacterLabel
        value={attributes.eyes['position']}
        title='Position'
        key=''
      />,
    ],
    nose_ridge: [
      <CharacterLabel
        value={attributes.nose_ridge['depth']}
        title='Depth'
        key=''
      />,
      <CharacterLabel
        value={attributes.nose_ridge['slant']}
        title='Slant'
        key=''
      />,
      <CharacterLabel
        value={attributes.nose_ridge['height']}
        title='Height'
        key=''
      />,
      <CharacterLabel
        value={attributes.nose_ridge['length']}
        title='Length'
        key=''
      />,
      <CharacterLabel
        value={attributes.nose_ridge['position']}
        title='Position'
        key=''
      />,
      <CharacterLabel
        value={attributes.nose_ridge['protrusion']}
        title='Protrusion'
        key=''
      />,
      <CharacterLabel
        value={attributes.nose_ridge['tip_height']}
        title='Tip Height'
        key=''
      />,
    ],
    nostrils: [
      <CharacterLabel
        value={attributes.nostrils['size']}
        title='Size'
        key=''
      />,
      <CharacterLabel
        value={attributes.nostrils['slant']}
        title='Slant'
        key=''
      />,
      <CharacterLabel
        value={attributes.nostrils['width']}
        title='Width'
        key=''
      />,
    ],
    cheeks: [
      <CharacterLabel
        value={attributes.cheeks['depth']}
        title='Depth'
        key=''
      />,
      <CharacterLabel
        value={attributes.cheeks['width']}
        title='Width'
        key=''
      />,
      <CharacterLabel
        value={attributes.cheeks['cheeks']}
        title='Cheeks'
        key=''
      />,
      <CharacterLabel
        value={attributes.cheeks['height']}
        title='Height'
        key=''
      />,
      <CharacterLabel
        value={attributes.cheeks['protrusion']}
        title='Protrusion'
        key=''
      />,
    ],
    lips: [
      <CharacterLabel value={attributes.lips['size']} title='Size' key=''/>,
      <CharacterLabel value={attributes.lips['shape']} title='Shape' key=''/>,
      <CharacterLabel
        value={attributes.lips['fullness']}
        title='Fullness'
        key=''
      />,
      <CharacterLabel
        value={attributes.lips['thickness']}
        title='Thickness'
        key=''
      />,
      <CharacterLabel
        value={attributes.lips['expression']}
        title='Expression'
        key=''
      />,
      <CharacterLabel
        value={attributes.lips['protrusion']}
        title='Protrusion'
        key=''
      />,
    ],
    mouth: [
      <CharacterLabel value={attributes.mouth['slant']} title='Slant' key=''/>,
      <CharacterLabel value={attributes.mouth['width']} title='Width' key=''/>,
      <CharacterLabel
        value={attributes.mouth['distance']}
        title='Distance'
        key=''
      />,
      <CharacterLabel
        value={attributes.mouth['position']}
        title='Position'
        key=''
      />,
      <CharacterLabel
        value={attributes.mouth['occlusion']}
        title='Occlusion'
        key=''
      />,
      <CharacterLabel
        value={attributes.mouth['protrusion']}
        title='Protrusion'
        key=''
      />,
    ],
    chin: [
      <CharacterLabel value={attributes.chin['tip']} title='Tip' key=''/>,
      <CharacterLabel value={attributes.chin['size']} title='Size' key=''/>,
      <CharacterLabel value={attributes.chin['depth']} title='Depth' key=''/>,
      <CharacterLabel value={attributes.chin['width']} title='Width' key=''/>,
      <CharacterLabel
        value={attributes.chin['height']}
        title='Height'
        key=''
      />,
      <CharacterLabel
        value={attributes.chin['length']}
        title='Length'
        key=''
      />,
      <CharacterLabel
        value={attributes.chin['protrusion']}
        title='Protrusion'
        key=''
      />,
    ],
    jaw: [
      <CharacterLabel value={attributes.jaw['lower']} title='Lower' key=''/>,
      <CharacterLabel value={attributes.jaw['width']} title='Width' key=''/>,
      <CharacterLabel
        value={attributes.jaw['contour']}
        title='Contour'
        key=''
      />,
      <CharacterLabel
        value={attributes.jaw['protrusion']}
        title='Protrusion'
        key=''
      />,
    ],
    hair: [
      <CharacterLabel value={attributes.hair['hair']} title='Hair' key=''/>,
      <CharacterLabel value={attributes.hair['roots']} title='Roots' key=''/>,
      <CharacterLabel value={attributes.hair['white']} title='White' key=''/>,
      <CharacterColor
        value={{
          r: parseInt(attributes.hair['hair_r']),
          g: parseInt(attributes.hair['hair_g']),
          b: parseInt(attributes.hair['hair_b']),
        }}
        title='Hair RGB'
        key=''
      />,
      <CharacterLabel
        value={attributes.hair['luster']}
        title='Luster'
        key=''
      />,
    ],
    eyebrows: [
      <CharacterLabel
        value={attributes.eyebrows['brow']}
        title='Brow'
        key=''
      />,
      <CharacterLabel
        value={attributes.eyebrows['roots']}
        title='Roots'
        key=''
      />,
      <CharacterLabel
        value={attributes.eyebrows['white']}
        title='White'
        key=''
      />,
      <CharacterColor
        value={{
          r: parseInt(attributes.eyebrows['brow_r']),
          g: parseInt(attributes.eyebrows['brow_g']),
          b: parseInt(attributes.eyebrows['brow_b']),
        }}
        title='Eyebrow RGB'
        key=''
      />,
      <CharacterLabel
        value={attributes.eyebrows['luster']}
        title='Luster'
        key=''
      />,
    ],
    facial_hair: [
      <CharacterLabel
        value={attributes.facial_hair['beard']}
        title='Beard'
        key=''
      />,
      <CharacterLabel
        value={attributes.facial_hair['roots']}
        title='Roots'
        key=''
      />,
      <CharacterLabel
        value={attributes.facial_hair['white']}
        title='White'
        key=''
      />,
      <CharacterLabel
        value={attributes.facial_hair['luster']}
        title='Luster'
        key=''
      />,
      <CharacterColor
        value={{
          r: parseInt(attributes.facial_hair['beard_r']),
          g: parseInt(attributes.facial_hair['beard_g']),
          b: parseInt(attributes.facial_hair['beard_b']),
        }}
        title='Beard RGB'
        key=''
      />,
      <CharacterLabel
        value={attributes.facial_hair['stubble']}
        title='Stubble'
        key=''
      />,
    ],
    eyelashes: [
      <CharacterLabel
        value={attributes.eyelashes['lashes']}
        title='Lashes'
        key=''
      />,
      <CharacterColor
        value={{
          r: parseInt(attributes.eyelashes['lashes_r']),
          g: parseInt(attributes.eyelashes['lashes_g']),
          b: parseInt(attributes.eyelashes['lashes_b']),
        }}
        title='Lashes RGB'
        key=''
      />,
    ],
    right_eye: [
      <CharacterColor
        value={{
          r: parseInt(attributes.right_eye['iris_r']),
          g: parseInt(attributes.right_eye['iris_g']),
          b: parseInt(attributes.right_eye['iris_b']),
        }}
        title='Iris RGB'
        key=''
      />,
      <CharacterColor
        value={{
          r: parseInt(attributes.right_eye['white_r']),
          g: parseInt(attributes.right_eye['white_g']),
          b: parseInt(attributes.right_eye['white_b']),
        }}
        title='White RGB'
        key=''
      />,
      <CharacterLabel
        value={attributes.right_eye['clouding']}
        title='Clouding'
        key=''
      />,
      <CharacterLabel
        value={attributes.right_eye['position']}
        title='Position'
        key=''
      />,
      <CharacterLabel
        value={attributes.right_eye['iris_size']}
        title='Iris Size'
        key=''
      />,
      <CharacterColor
        value={{
          r: parseInt(attributes.right_eye['clouding_r']),
          g: parseInt(attributes.right_eye['clouding_g']),
          b: parseInt(attributes.right_eye['clouding_b']),
        }}
        title='Clouding RGB'
        key=''
      />,
    ],
    left_eye: [
      <CharacterColor
        value={{
          r: parseInt(attributes.left_eye['iris_r']),
          g: parseInt(attributes.left_eye['iris_g']),
          b: parseInt(attributes.left_eye['iris_b']),
        }}
        title='Iris RGB'
        key=''
      />,
      <CharacterColor
        value={{
          r: parseInt(attributes.left_eye['white_r']),
          g: parseInt(attributes.left_eye['white_g']),
          b: parseInt(attributes.left_eye['white_b']),
        }}
        title='White RGB'
        key=''
      />,
      <CharacterLabel
        value={attributes.left_eye['clouding']}
        title='Clouding'
        key=''
      />,
      <CharacterLabel
        value={attributes.left_eye['position']}
        title='Position'
        key=''
      />,
      <CharacterLabel
        value={attributes.left_eye['iris_size']}
        title='Iris Size'
        key=''
      />,
      <CharacterColor
        value={{
          r: parseInt(attributes.left_eye['clouding_r']),
          g: parseInt(attributes.left_eye['clouding_g']),
          b: parseInt(attributes.left_eye['clouding_b']),
        }}
        title='Clouding RGB'
        key=''
      />,
    ],
    skin_features: [
      <CharacterLabel
        value={attributes.skin_features['pores']}
        title='Pores'
        key=''
      />,
      <CharacterLabel
        value={attributes.skin_features['luster']}
        title='Luster'
        key=''
      />,
      <CharacterLabel
        value={attributes.skin_features['dark_circles']}
        title='Dark Circles'
        key=''
      />,
      <CharacterColor
        value={{
          r: parseInt(attributes.skin_features['dark_circles_r']),
          g: parseInt(attributes.skin_features['dark_circles_g']),
          b: parseInt(attributes.skin_features['dark_circles_b']),
        }}
        title='Dark Circles RGB'
        key=''
      />,
    ],
    cosmetics: [
      <CharacterLabel
        value={attributes.cosmetics['eyeliner']}
        title='Eyeliner'
        key=''
      />,
      <CharacterColor
        value={{
          r: parseInt(attributes.cosmetics['eyeliner_r']),
          g: parseInt(attributes.cosmetics['eyeliner_g']),
          b: parseInt(attributes.cosmetics['eyeliner_b']),
        }}
        title='Eyeliner RGB'
        key=''
      />,
      <CharacterLabel
        value={attributes.cosmetics['upper']}
        title='Upper'
        key=''
      />,
      <CharacterColor
        value={{
          r: parseInt(attributes.cosmetics['upper_r']),
          g: parseInt(attributes.cosmetics['upper_g']),
          b: parseInt(attributes.cosmetics['upper_b']),
        }}
        title='Upper RGB'
        key=''
      />,
      <CharacterLabel
        value={attributes.cosmetics['lower']}
        title='Lower'
        key=''
      />,
      <CharacterColor
        value={{
          r: parseInt(attributes.cosmetics['lower_r']),
          g: parseInt(attributes.cosmetics['lower_g']),
          b: parseInt(attributes.cosmetics['lower_b']),
        }}
        title='Lower RGB'
        key=''
      />,
      <CharacterLabel
        value={attributes.cosmetics['cheeks']}
        title='Cheeks'
        key=''
      />,
      <CharacterColor
        value={{
          r: parseInt(attributes.cosmetics['cheeks_r']),
          g: parseInt(attributes.cosmetics['cheeks_g']),
          b: parseInt(attributes.cosmetics['cheeks_b']),
        }}
        title='Cheeks RGB'
        key=''
      />,
      <CharacterLabel
        value={attributes.cosmetics['lipstick']}
        title='Lipstick'
        key=''
      />,
      <CharacterColor
        value={{
          r: parseInt(attributes.cosmetics['lipstick_r']),
          g: parseInt(attributes.cosmetics['lipstick_g']),
          b: parseInt(attributes.cosmetics['lipstick_b']),
        }}
        title='Lipstick RGB'
        key=''
      />,
    ],
    tattoo_mark_eyepatch: [
      <CharacterLabel
        value={attributes.tattoo_mark_eyepatch['flip']}
        title='Flip'
        key=''
      />,
      <CharacterLabel
        value={attributes.tattoo_mark_eyepatch['vert']}
        title='Vert'
        key=''
      />,
      <CharacterLabel
        value={attributes.tattoo_mark_eyepatch['angle']}
        title='Angle'
        key=''
      />,
      <CharacterLabel
        value={attributes.tattoo_mark_eyepatch['horiz']}
        title='Horiz'
        key=''
      />,
      <CharacterLabel
        value={attributes.tattoo_mark_eyepatch['tattoo']}
        title='Tattoo'
        key=''
      />,
      <CharacterLabel
        value={attributes.tattoo_mark_eyepatch['eyepatch']}
        title='Eyepatch'
        key=''
      />,
      <CharacterColor
        value={{
          r: parseInt(attributes.tattoo_mark_eyepatch['tattoo_r']),
          g: parseInt(attributes.tattoo_mark_eyepatch['tattoo_g']),
          b: parseInt(attributes.tattoo_mark_eyepatch['tattoo_b']),
        }}
        title='Tattoo RGB'
        key=''
      />,
      <CharacterLabel
        value={attributes.tattoo_mark_eyepatch['expansion']}
        title='Expansion'
        key=''
      />,
      <CharacterColor
        value={{
          r: parseInt(attributes.tattoo_mark_eyepatch['eyepatch_r']),
          g: parseInt(attributes.tattoo_mark_eyepatch['eyepatch_g']),
          b: parseInt(attributes.tattoo_mark_eyepatch['eyepatch_b']),
        }}
        title='Eyepatch RGB'
        key=''
      />,
    ],
    body: [
      <CharacterLabel value={attributes.body['arms']} title='Arms' key=''/>,
      <CharacterLabel value={attributes.body['head']} title='Head' key=''/>,
      <CharacterLabel value={attributes.body['legs']} title='Legs' key=''/>,
      <CharacterLabel value={attributes.body['chest']} title='Chest' key=''/>,
      <CharacterLabel
        value={attributes.body['muscle']}
        title='Muscle'
        key=''
      />,
      <CharacterLabel
        value={attributes.body['abdomen']}
        title='Abdomen'
        key=''
      />,
      <CharacterLabel
        value={attributes.body['body_hair']}
        title='Body Hair'
        key=''
      />,
      <CharacterColor
        value={{
          r: parseInt(attributes.body['body_hair_r']),
          g: parseInt(attributes.body['body_hair_g']),
          b: parseInt(attributes.body['body_hair_b']),
        }}
        title='Body Hair RGB'
        key=''
      />,
    ],
  };
}


export function getAttributesWithComponentsEdit(
  eldenRingChar: IEldenRingCharacter,
  onValueChange: (property: string, value: any) => void
): EldenRingAttributesWithComponent {
  const attributes = eldenRingChar.attributes;

  return {
    name: <CharacterLabelEdit
      onHandleChange={(value) => {
        onValueChange('character.name', value);
      }}
      value={eldenRingChar?.character.name}
      title='Character Name'/>,
    description: <CharacterTextEdit
      onHandleChange={(value) => {
        onValueChange('character.description', value);
      }}
      value={eldenRingChar?.character.description}
      title='Description'/>,
    imageUrl: <CharacterLabelEdit
      onHandleChange={(value) => {
        onValueChange('character.imageUrl', value);
      }}
      value={eldenRingChar?.character.imageUrl}
      title='Image Url'/>,
    base: [
      <CharacterSelectEdit
        onHandleChange={(value) => {
          onValueChange('attributes.body_type', value);
        }} value={attributes.body_type} options={BodyType} title='Body Type' key=''/>,
      <CharacterSelectEdit
        onHandleChange={(value) => {
          onValueChange('attributes.age', value);
        }} value={attributes.age} options={Age} title='Age' key=''/>,
      <CharacterSelectEdit
        onHandleChange={(value) => {
          onValueChange('attributes.voice', value);
        }} value={attributes.voice} options={Voice} title='Voice' key=''/>,
    ],
    skin: [
      <CharacterColorEdit
        onHandleChangeR={(value) => {
          onValueChange('attributes.skin_color.skin_r', value);
        }}
        onHandleChangeG={(value) => {
          onValueChange('attributes.skin_color.skin_g', value);
        }}
        onHandleChangeB={(value) => {
          onValueChange('attributes.skin_color.skin_b', value);
        }}
        value={{
          r: parseInt(attributes.skin_color!['skin_r']),
          g: parseInt(attributes.skin_color!['skin_g']),
          b: parseInt(attributes.skin_color!['skin_b']),
        }}
        title='Skin RGB'
        key=''
      />,
    ],
    adjustFaceTemplate: [
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.face_template.structure', value);
        }}
        value={parseInt(attributes.face_template!['structure'])}
        title='Structure'
        key=''
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.face_template.emphasis', value);
        }}
        value={parseInt(attributes.face_template!['emphasis'])}
        title='Emphasis'
        key=''
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.face_template.age', value);
        }}
        value={parseInt(attributes.face_template!['age'])}
        title='Age'
        key=''
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.face_template.aesthetic', value);
        }}
        value={parseInt(attributes.face_template!['aesthetic'])}
        title='Aesthetic'
        key=''
      />,
    ],
    facialBalance: [
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.face_balance.size', value);
        }}
        value={parseInt(attributes.face_balance!['size'])}
        title='Size'
        key=''
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.face_balance.ratio', value);
        }}
        value={parseInt(attributes.face_balance!['ratio'])}
        title='Ratio'
        key=''
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.face_balance.protrusion', value);
        }}
        value={parseInt(attributes.face_balance!['protrusion'])}
        title='Protrusion'
        key=''
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.face_balance.vert', value);
        }}
        value={parseInt(attributes.face_balance!['vert'])}
        title='Vert.
'
        key=''
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.face_balance.slant', value);
        }}
        value={parseInt(attributes.face_balance!['slant'])}
        title='Slant'
        key=''
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.face_balance.horiz', value);
        }}
        value={parseInt(attributes.face_balance!['horiz'])}
        title='Horiz.
'
        key=''
      />,
    ],
    forehead: [
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.forehead.depth', value);
        }}
        value={parseInt(attributes.forehead!['depth'])}
        title='Depth'
        key=''
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.forehead.height', value);
        }}
        value={parseInt(attributes.forehead!['height'])}
        title='Height'
        key=''
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.forehead.prot1', value);
        }}
        value={parseInt(attributes.forehead!['prot1'])}
        title='Prot1'
        key=''
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.forehead.prot2', value);
        }}
        value={parseInt(attributes.forehead!['prot2'])}
        title='Prot2'
        key=''
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.forehead.protrusion', value);
        }}
        value={parseInt(attributes.forehead!['protrusion'])}
        title='Protrusion'
        key=''
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.forehead.width', value);
        }}
        value={parseInt(attributes.forehead!['width'])}
        title='Width'
        key=''
      />,
    ],
    brow_ridge: [
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.brow_ridge.inner', value);
        }}
        value={parseInt(attributes.brow_ridge!['inner'])}
        title='Inner'
        key=''
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.brow_ridge.outer', value);
        }}
        value={parseInt(attributes.brow_ridge!['outer'])}
        title='Outer'
        key=''
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.brow_ridge.height', value);
        }}
        value={parseInt(attributes.brow_ridge!['height'])}
        title='Height'
        key=''
      />,
    ],
    eyes: [
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.eyes.size', value);
        }}
        value={parseInt(attributes.eyes!['size'])}
        title='Size'
        key=''/>,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.eyes.slant', value);
        }}
        value={parseInt(attributes.eyes!['slant'])}
        title='Slant'
        key=''/>,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.eyes.spacing', value);
        }}
        value={parseInt(attributes.eyes!['spacing'])}
        title='Spacing'
        key=''
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.eyes.position', value);
        }}
        value={parseInt(attributes.eyes!['position'])}
        title='Position'
        key=''
      />,
    ],
    nose_ridge: [
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.nose_ridge.depth', value);
        }}
        value={parseInt(attributes.nose_ridge!['depth'])}
        title='Depth'
        key=''
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.nose_ridge.slant', value);
        }}
        value={parseInt(attributes.nose_ridge!['slant'])}
        title='Slant'
        key=''
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.nose_ridge.height', value);
        }}
        value={parseInt(attributes.nose_ridge!['height'])}
        title='Height'
        key=''
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.nose_ridge.length', value);
        }}
        value={parseInt(attributes.nose_ridge!['length'])}
        title='Length'
        key=''
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.nose_ridge.position', value);
        }}
        value={parseInt(attributes.nose_ridge!['position'])}
        title='Position'
        key=''
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.nose_ridge.protrusion', value);
        }}
        value={parseInt(attributes.nose_ridge!['protrusion'])}
        title='Protrusion'
        key=''
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.nose_ridge.tip_height', value);
        }}
        value={parseInt(attributes.nose_ridge!['tip_height'])}
        title='Tip Height'
        key=''
      />,
    ],
    nostrils: [
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.nostrils.size', value);
        }}
        value={parseInt(attributes.nostrils!['size'])}
        title='Size'
        key=''
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.nostrils.slant', value);
        }}
        value={parseInt(attributes.nostrils!['slant'])}
        title='Slant'
        key=''
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.nostrils.width', value);
        }}
        value={parseInt(attributes.nostrils!['width'])}
        title='Width'
        key=''
      />,
    ],
    cheeks: [
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.cheeks.depth', value);
        }}
        value={parseInt(attributes.cheeks!['depth'])}
        title='Depth'
        key=''
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.cheeks.width', value);
        }}
        value={parseInt(attributes.cheeks!['width'])}
        title='Width'
        key=''
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.cheeks.cheeks', value);
        }}
        value={parseInt(attributes.cheeks!['cheeks'])}
        title='Cheeks'
        key=''
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.cheeks.height', value);
        }}
        value={parseInt(attributes.cheeks!['height'])}
        title='Height'
        key=''
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.cheeks.protrusion', value);
        }}
        value={parseInt(attributes.cheeks!['protrusion'])}
        title='Protrusion'
        key=''
      />,
    ],
    lips: [
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.lips.size', value);
        }}
        value={parseInt(attributes.lips!['size'])} title='Size' key=''/>,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.lips.shape', value);
        }}
        value={parseInt(attributes.lips!['shape'])} title='Shape' key=''/>,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.lips.fullness', value);
        }}
        value={parseInt(attributes.lips!['fullness'])}
        title='Fullness'
        key=''
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.lips.thickness', value);
        }}
        value={parseInt(attributes.lips!['thickness'])}
        title='Thickness'
        key=''
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.lips.expression', value);
        }}
        value={parseInt(attributes.lips!['expression'])}
        title='Expression'
        key=''
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.lips.protrusion', value);
        }}
        value={parseInt(attributes.lips!['protrusion'])}
        title='Protrusion'
        key=''
      />,
    ],
    mouth: [
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.mouth.slant', value);
        }}
        value={parseInt(attributes.mouth!['slant'])} title='Slant' key=''/>,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.mouth.width', value);
        }}
        value={parseInt(attributes.mouth!['width'])} title='Width' key=''/>,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.mouth.distance', value);
        }}
        value={parseInt(attributes.mouth!['distance'])}
        title='Distance'
        key=''
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.mouth.position', value);
        }}
        value={parseInt(attributes.mouth!['position'])}
        title='Position'
        key=''
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.mouth.occlusion', value);
        }}
        value={parseInt(attributes.mouth!['occlusion'])}
        title='Occlusion'
        key=''
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.mouth.protrusion', value);
        }}
        value={parseInt(attributes.mouth!['protrusion'])}
        title='Protrusion'
        key=''
      />,
    ],
    chin: [
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.chin.tip', value);
        }}
        value={parseInt(attributes.chin!['tip'])} title='Tip' key=''/>,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.chin.size', value);
        }}
        value={parseInt(attributes.chin!['size'])} title='Size' key=''/>,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.chin.depth', value);
        }}
        value={parseInt(attributes.chin!['depth'])} title='Depth' key=''/>,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.chin.width', value);
        }}
        value={parseInt(attributes.chin!['width'])} title='Width' key=''/>,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.chin.height', value);
        }}
        value={parseInt(attributes.chin!['height'])}
        title='Height'
        key=''
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.chin.length', value);
        }}
        value={parseInt(attributes.chin!['length'])}
        title='Length'
        key=''
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.chin.protrusion', value);
        }}
        value={parseInt(attributes.chin!['protrusion'])}
        title='Protrusion'
        key=''
      />,
    ],
    jaw: [
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.jaw.lower', value);
        }}
        value={parseInt(attributes.jaw!['lower'])} title='Lower' key=''/>,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.jaw.width', value);
        }}
        value={parseInt(attributes.jaw!['width'])} title='Width' key=''/>,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.jaw.contour', value);
        }}
        value={parseInt(attributes.jaw!['contour'])}
        title='Contour'
        key=''
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.jaw.protrusion', value);
        }}
        value={parseInt(attributes.jaw!['protrusion'])}
        title='Protrusion'
        key=''
      />,
    ],
    hair: [
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.hair.hair', value);
        }}
        value={parseInt(attributes.hair!['hair'])} title='Hair' key=''/>,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.hair.roots', value);
        }}
        value={parseInt(attributes.hair!['roots'])} title='Roots' key=''/>,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.hair.white', value);
        }}
        value={parseInt(attributes.hair!['white'])} title='White' key=''/>,
      <CharacterColorEdit
        onHandleChangeR={(value) => {
          onValueChange('attributes.hair.hair_r', value);
        }}
        onHandleChangeG={(value) => {
          onValueChange('attributes.hair.hair_g', value);
        }}
        onHandleChangeB={(value) => {
          onValueChange('attributes.hair.hair_b', value);
        }}
        value={{
          r: parseInt(attributes.hair!['hair_r']),
          g: parseInt(attributes.hair!['hair_g']),
          b: parseInt(attributes.hair!['hair_b']),
        }}
        title='Hair RGB'
        key=''
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.hair.luster', value);
        }}
        value={parseInt(attributes.hair!['luster'])}
        title='Luster'
        key=''
      />,
    ],
    eyebrows: [
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.eyebrows.brow', value);
        }}
        value={parseInt(attributes.eyebrows!['brow'])}
        title='Brow'
        key=''
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.eyebrows.roots', value);
        }}
        value={parseInt(attributes.eyebrows!['roots'])}
        title='Roots'
        key=''
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.eyebrows.white', value);
        }}
        value={parseInt(attributes.eyebrows!['white'])}
        title='White'
        key=''
      />,
      <CharacterColorEdit
        onHandleChangeR={(value) => {
          onValueChange('attributes.eyebrows.brow_r', value);
        }}
        onHandleChangeG={(value) => {
          onValueChange('attributes.eyebrows.brow_g', value);
        }}
        onHandleChangeB={(value) => {
          onValueChange('attributes.eyebrows.brow_b', value);
        }}
        value={{
          r: parseInt(attributes.eyebrows!['brow_r']),
          g: parseInt(attributes.eyebrows!['brow_g']),
          b: parseInt(attributes.eyebrows!['brow_b']),
        }}
        title='Eyebrow RGB'
        key=''
        placeholder='Match'
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.eyebrows.luster', value);
        }}
        value={parseInt(attributes.eyebrows!['luster'])}
        title='Luster'
        key=''
      />,
    ],
    facial_hair: [
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.facial_hair.beard', value);
        }}
        value={parseInt(attributes.facial_hair!['beard'])}
        title='Beard'
        key=''
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.facial_hair.roots', value);
        }}
        value={parseInt(attributes.facial_hair!['roots'])}
        title='Roots'
        key=''
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.facial_hair.white', value);
        }}
        value={parseInt(attributes.facial_hair!['white'])}
        title='White'
        key=''
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.facial_hair.luster', value);
        }}
        value={parseInt(attributes.facial_hair!['luster'])}
        title='Luster'
        key=''
      />,
      <CharacterColorEdit
        onHandleChangeR={(value) => {
          onValueChange('attributes.facial_hair.beard_r', value);
        }}
        onHandleChangeG={(value) => {
          onValueChange('attributes.facial_hair.beard_g', value);
        }}
        onHandleChangeB={(value) => {
          onValueChange('attributes.facial_hair.beard_b', value);
        }}
        value={{
          r: parseInt(attributes.facial_hair!['beard_r']),
          g: parseInt(attributes.facial_hair!['beard_g']),
          b: parseInt(attributes.facial_hair!['beard_b']),
        }}
        title='Beard RGB'
        key=''
        placeholder='Match'
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.facial_hair.stubble', value);
        }}
        value={parseInt(attributes.facial_hair!['stubble'])}
        title='Stubble'
        key=''
      />,
    ],
    eyelashes: [
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.eyelashes.lashes', value);
        }}
        value={parseInt(attributes.eyelashes!['lashes'])}
        title='Lashes'
        key=''
      />,
      <CharacterColorEdit
        onHandleChangeR={(value) => {
          onValueChange('attributes.eyelashes.lashes_r', value);
        }}
        onHandleChangeG={(value) => {
          onValueChange('attributes.eyelashes.lashes_g', value);
        }}
        onHandleChangeB={(value) => {
          onValueChange('attributes.eyelashes.lashes_b', value);
        }}
        value={{
          r: parseInt(attributes.eyelashes!['lashes_r']),
          g: parseInt(attributes.eyelashes!['lashes_g']),
          b: parseInt(attributes.eyelashes!['lashes_b']),
        }}
        title='Lashes RGB'
        key=''
        placeholder='Match'
      />,
    ],
    right_eye: [
      <CharacterColorEdit
        onHandleChangeR={(value) => {
          onValueChange('attributes.right_eye.iris_r', value);
        }}
        onHandleChangeG={(value) => {
          onValueChange('attributes.right_eye.iris_g', value);
        }}
        onHandleChangeB={(value) => {
          onValueChange('attributes.right_eye.iris_b', value);
        }}
        value={{
          r: parseInt(attributes.right_eye!['iris_r']),
          g: parseInt(attributes.right_eye!['iris_g']),
          b: parseInt(attributes.right_eye!['iris_b']),
        }}
        title='Iris RGB'
        key=''
      />,
      <CharacterColorEdit
        onHandleChangeR={(value) => {
          onValueChange('attributes.right_eye.white_r', value);
        }}
        onHandleChangeG={(value) => {
          onValueChange('attributes.right_eye.white_g', value);
        }}
        onHandleChangeB={(value) => {
          onValueChange('attributes.right_eye.white_b', value);
        }}
        value={{
          r: parseInt(attributes.right_eye!['white_r']),
          g: parseInt(attributes.right_eye!['white_g']),
          b: parseInt(attributes.right_eye!['white_b']),
        }}
        title='White RGB'
        key=''
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.right_eye.clouding', value);
        }}
        value={parseInt(attributes.right_eye!['clouding'])}
        title='Clouding'
        key=''
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.right_eye.position', value);
        }}
        value={parseInt(attributes.right_eye!['position'])}
        title='Position'
        key=''
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.right_eye.iris_size', value);
        }}
        value={parseInt(attributes.right_eye!['iris_size'])}
        title='Iris Size'
        key=''
      />,
      <CharacterColorEdit
        onHandleChangeR={(value) => {
          onValueChange('attributes.right_eye.clouding_r', value);
        }}
        onHandleChangeG={(value) => {
          onValueChange('attributes.right_eye.clouding_g', value);
        }}
        onHandleChangeB={(value) => {
          onValueChange('attributes.right_eye.clouding_b', value);
        }}
        value={{
          r: parseInt(attributes.right_eye!['clouding_r']),
          g: parseInt(attributes.right_eye!['clouding_g']),
          b: parseInt(attributes.right_eye!['clouding_b']),
        }}
        title='Clouding RGB'
        key=''
      />,
    ],
    left_eye: [
      <CharacterColorEdit
        onHandleChangeR={(value) => {
          onValueChange('attributes.left_eye.iris_r', value);
        }}
        onHandleChangeG={(value) => {
          onValueChange('attributes.left_eye.iris_g', value);
        }}
        onHandleChangeB={(value) => {
          onValueChange('attributes.left_eye.iris_b', value);
        }}
        value={{
          r: parseInt(attributes.left_eye!['iris_r']),
          g: parseInt(attributes.left_eye!['iris_g']),
          b: parseInt(attributes.left_eye!['iris_b']),
        }}
        title='Iris RGB'
        key=''
        placeholder='Match'
      />,
      <CharacterColorEdit
        onHandleChangeR={(value) => {
          onValueChange('attributes.left_eye.white_r', value);
        }}
        onHandleChangeG={(value) => {
          onValueChange('attributes.left_eye.white_g', value);
        }}
        onHandleChangeB={(value) => {
          onValueChange('attributes.left_eye.white_b', value);
        }}
        value={{
          r: parseInt(attributes.left_eye!['white_r']),
          g: parseInt(attributes.left_eye!['white_g']),
          b: parseInt(attributes.left_eye!['white_b']),
        }}
        title='White RGB'
        key=''
        placeholder='Match'
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.left_eye.clouding', value);
        }}
        value={parseInt(attributes.left_eye!['clouding'])}
        title='Clouding'
        key=''
        placeholder='Match'
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.left_eye.position', value);
        }}
        value={parseInt(attributes.left_eye!['position'])}
        title='Position'
        key=''
        placeholder='Match'
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.left_eye.iris_size', value);
        }}
        value={parseInt(attributes.left_eye!['iris_size'])}
        title='Iris Size'
        key=''
        placeholder='Match'
      />,
      <CharacterColorEdit
        onHandleChangeR={(value) => {
          onValueChange('attributes.left_eye.clouding_r', value);
        }}
        onHandleChangeG={(value) => {
          onValueChange('attributes.left_eye.clouding_g', value);
        }}
        onHandleChangeB={(value) => {
          onValueChange('attributes.left_eye.clouding_b', value);
        }}
        value={{
          r: parseInt(attributes.left_eye!['clouding_r']),
          g: parseInt(attributes.left_eye!['clouding_g']),
          b: parseInt(attributes.left_eye!['clouding_b']),
        }}
        title='Clouding RGB'
        key=''
        placeholder='Match'
      />,
    ],
    skin_features: [
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.skin_features.pores', value);
        }}
        value={parseInt(attributes.skin_features!['pores'])}
        title='Pores'
        key=''
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.skin_features.luster', value);
        }}
        value={parseInt(attributes.skin_features!['luster'])}
        title='Luster'
        key=''
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.skin_features.dark_circles', value);
        }}
        value={parseInt(attributes.skin_features!['dark_circles'])}
        title='Dark Circles'
        key=''
      />,
      <CharacterColorEdit
        onHandleChangeR={(value) => {
          onValueChange('attributes.skin_features.dark_circles_r', value);
        }}
        onHandleChangeG={(value) => {
          onValueChange('attributes.skin_features.dark_circles_g', value);
        }}
        onHandleChangeB={(value) => {
          onValueChange('attributes.skin_features.dark_circles_b', value);
        }}
        value={{
          r: parseInt(attributes.skin_features!['dark_circles_r']),
          g: parseInt(attributes.skin_features!['dark_circles_g']),
          b: parseInt(attributes.skin_features!['dark_circles_b']),
        }}
        title='Dark Circles RGB'
        key=''
      />,
    ],
    cosmetics: [
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.cosmetics.eyeliner', value);
        }}
        value={parseInt(attributes.cosmetics!['eyeliner'])}
        title='Eyeliner'
        key=''
      />,
      <CharacterColorEdit
        onHandleChangeR={(value) => {
          onValueChange('attributes.cosmetics.eyeliner_r', value);
        }}
        onHandleChangeG={(value) => {
          onValueChange('attributes.cosmetics.eyeliner_g', value);
        }}
        onHandleChangeB={(value) => {
          onValueChange('attributes.cosmetics.eyeliner_b', value);
        }}
        value={{
          r: parseInt(attributes.cosmetics!['eyeliner_r']),
          g: parseInt(attributes.cosmetics!['eyeliner_g']),
          b: parseInt(attributes.cosmetics!['eyeliner_b']),
        }}
        title='Eyeliner RGB'
        key=''
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.cosmetics.upper', value);
        }}
        value={parseInt(attributes.cosmetics!['upper'])}
        title='Upper'
        key=''
      />,
      <CharacterColorEdit
        onHandleChangeR={(value) => {
          onValueChange('attributes.cosmetics.upper_r', value);
        }}
        onHandleChangeG={(value) => {
          onValueChange('attributes.cosmetics.upper_g', value);
        }}
        onHandleChangeB={(value) => {
          onValueChange('attributes.cosmetics.upper_b', value);
        }}
        value={{
          r: parseInt(attributes.cosmetics!['upper_r']),
          g: parseInt(attributes.cosmetics!['upper_g']),
          b: parseInt(attributes.cosmetics!['upper_b']),
        }}
        title='Upper RGB'
        key=''
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.cosmetics.lower', value);
        }}
        value={parseInt(attributes.cosmetics!['lower'])}
        title='Lower'
        key=''
      />,
      <CharacterColorEdit
        onHandleChangeR={(value) => {
          onValueChange('attributes.cosmetics.lower_r', value);
        }}
        onHandleChangeG={(value) => {
          onValueChange('attributes.cosmetics.lower_g', value);
        }}
        onHandleChangeB={(value) => {
          onValueChange('attributes.cosmetics.lower_b', value);
        }}
        value={{
          r: parseInt(attributes.cosmetics!['lower_r']),
          g: parseInt(attributes.cosmetics!['lower_g']),
          b: parseInt(attributes.cosmetics!['lower_b']),
        }}
        title='Lower RGB'
        key=''
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.cosmetics.cheeks', value);
        }}
        value={parseInt(attributes.cosmetics!['cheeks'])}
        title='Cheeks'
        key=''
      />,
      <CharacterColorEdit
        onHandleChangeR={(value) => {
          onValueChange('attributes.cosmetics.cheeks_r', value);
        }}
        onHandleChangeG={(value) => {
          onValueChange('attributes.cosmetics.cheeks_g', value);
        }}
        onHandleChangeB={(value) => {
          onValueChange('attributes.cosmetics.cheeks_b', value);
        }}
        value={{
          r: parseInt(attributes.cosmetics!['cheeks_r']),
          g: parseInt(attributes.cosmetics!['cheeks_g']),
          b: parseInt(attributes.cosmetics!['cheeks_b']),
        }}
        title='Cheeks RGB'
        key=''
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.cosmetics.lipstick', value);
        }}
        value={parseInt(attributes.cosmetics!['lipstick'])}
        title='Lipstick'
        key=''
      />,
      <CharacterColorEdit
        onHandleChangeR={(value) => {
          onValueChange('attributes.cosmetics.lipstick_r', value);
        }}
        onHandleChangeG={(value) => {
          onValueChange('attributes.cosmetics.lipstick_g', value);
        }}
        onHandleChangeB={(value) => {
          onValueChange('attributes.cosmetics.lipstick_b', value);
        }}
        value={{
          r: parseInt(attributes.cosmetics!['lipstick_r']),
          g: parseInt(attributes.cosmetics!['lipstick_g']),
          b: parseInt(attributes.cosmetics!['lipstick_b']),
        }}
        title='Lipstick RGB'
        key=''
      />,
    ],
    tattoo_mark_eyepatch: [
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.tattoo_mark_eyepatch.vert', value);
        }}
        value={parseInt(attributes.tattoo_mark_eyepatch!['vert'])}
        title='Vert'
        key=''
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.tattoo_mark_eyepatch.angle', value);
        }}
        value={parseInt(attributes.tattoo_mark_eyepatch!['angle'])}
        title='Angle'
        key=''
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.tattoo_mark_eyepatch.horiz', value);
        }}
        value={parseInt(attributes.tattoo_mark_eyepatch!['horiz'])}
        title='Horiz'
        key=''
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.tattoo_mark_eyepatch.tattoo', value);
        }}
        value={parseInt(attributes.tattoo_mark_eyepatch!['tattoo'])}
        title='Tattoo'
        key=''
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.tattoo_mark_eyepatch.eyepatch', value);
        }}
        value={parseInt(attributes.tattoo_mark_eyepatch!['eyepatch'])}
        title='Eyepatch'
        key=''
      />,
      <CharacterColorEdit
        onHandleChangeR={(value) => {
          onValueChange('attributes.tattoo_mark_eyepatch.tattoo_r', value);
        }}
        onHandleChangeG={(value) => {
          onValueChange('attributes.tattoo_mark_eyepatch.tattoo_g', value);
        }}
        onHandleChangeB={(value) => {
          onValueChange('attributes.tattoo_mark_eyepatch.tattoo_b', value);
        }}
        value={{
          r: parseInt(attributes.tattoo_mark_eyepatch!['tattoo_r']),
          g: parseInt(attributes.tattoo_mark_eyepatch!['tattoo_g']),
          b: parseInt(attributes.tattoo_mark_eyepatch!['tattoo_b']),
        }}
        title='Tattoo RGB'
        key=''
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.tattoo_mark_eyepatch.expansion', value);
        }}
        value={parseInt(attributes.tattoo_mark_eyepatch!['expansion'])}
        title='Expansion'
        key=''
      />,
      <CharacterCheckboxEdit
        onHandleChange={(value) => {
          onValueChange('attributes.tattoo_mark_eyepatch.flip', value);
        }}
        value={Boolean(attributes.tattoo_mark_eyepatch!['flip'])}
        title='Flip'
        key=''
      />,
      <CharacterColorEdit
        onHandleChangeR={(value) => {
          onValueChange('attributes.tattoo_mark_eyepatch.eyepatch_r', value);
        }}
        onHandleChangeG={(value) => {
          onValueChange('attributes.tattoo_mark_eyepatch.eyepatch_g', value);
        }}
        onHandleChangeB={(value) => {
          onValueChange('attributes.tattoo_mark_eyepatch.eyepatch_b', value);
        }}
        value={{
          r: parseInt(attributes.tattoo_mark_eyepatch!['eyepatch_r']),
          g: parseInt(attributes.tattoo_mark_eyepatch!['eyepatch_g']),
          b: parseInt(attributes.tattoo_mark_eyepatch!['eyepatch_b']),
        }}
        title='Eyepatch RGB'
        key=''
      />,
    ],
    body: [
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.body.arms', value);
        }}
        value={parseInt(attributes.body!['arms'])} title='Arms' key=''/>,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.body.head', value);
        }}
        value={parseInt(attributes.body!['head'])} title='Head' key=''/>,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.body.legs', value);
        }}
        value={parseInt(attributes.body!['legs'])} title='Legs' key=''/>,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.body.chest', value);
        }}
        value={parseInt(attributes.body!['chest'])} title='Chest' key=''/>,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.body.muscle', value);
        }}
        value={parseInt(attributes.body!['muscle'])}
        title='Muscle'
        key=''
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.body.abdomen', value);
        }}
        value={parseInt(attributes.body!['abdomen'])}
        title='Abdomen'
        key=''
      />,
      <CharacterNumberEdit
        onHandleChange={(value) => {
          onValueChange('attributes.body.body_hair', value);
        }}
        value={parseInt(attributes.body!['body_hair'])}
        title='Body Hair'
        key=''
      />,
      <CharacterColorEdit
        onHandleChangeR={(value) => {
          onValueChange('attributes.body.body_hair_r', value);
        }}
        onHandleChangeG={(value) => {
          onValueChange('attributes.body.body_hair_g', value);
        }}
        onHandleChangeB={(value) => {
          onValueChange('attributes.body.body_hair_b', value);
        }}
        value={{
          r: parseInt(attributes.body!['body_hair_r']),
          g: parseInt(attributes.body!['body_hair_g']),
          b: parseInt(attributes.body!['body_hair_b']),
        }}
        title='Body Hair RGB'
        key=''
        placeholder='Match'
      />,
    ],
  };
}

export interface EldenRingAttributesWithComponent {
  name: React.ReactNode,
  description: React.ReactNode,
  imageUrl: React.ReactNode,
  base: React.ReactNode[];
  skin: React.ReactNode[];
  adjustFaceTemplate: React.ReactNode[];
  facialBalance: React.ReactNode[];
  forehead: React.ReactNode[];
  brow_ridge: React.ReactNode[];
  eyes: React.ReactNode[];
  nose_ridge: React.ReactNode[];
  nostrils: React.ReactNode[];
  cheeks: React.ReactNode[];
  lips: React.ReactNode[];
  mouth: React.ReactNode[];
  chin: React.ReactNode[];
  jaw: React.ReactNode[];
  hair: React.ReactNode[];
  eyebrows: React.ReactNode[];
  facial_hair: React.ReactNode[];
  eyelashes: React.ReactNode[];
  right_eye: React.ReactNode[];
  left_eye: React.ReactNode[];
  skin_features: React.ReactNode[];
  cosmetics: React.ReactNode[];
  tattoo_mark_eyepatch: React.ReactNode[];
  body: React.ReactNode[];
}
