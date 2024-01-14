export default interface IEldenRingAttributes {
  body_type: BodyType;
  age: Age;
  voice: Voice;
  skin_color: Record<string, string>;
  face_template: Record<string, string>;
  face_balance: Record<string, string>;
  forehead: Record<string, string>;
  brow_ridge: Record<string, string>;
  eyes: Record<string, string>;
  nose_ridge: Record<string, string>;
  nostrils: Record<string, string>;
  cheeks: Record<string, string>;
  lips: Record<string, string>;
  mouth: Record<string, string>;
  chin: Record<string, string>;
  jaw: Record<string, string>;
  hair: Record<string, string>;
  eyebrows: Record<string, string>;
  facial_hair: Record<string, string>;
  eyelashes: Record<string, string>;
  right_eye: Record<string, string>;
  left_eye: Record<string, string>;
  skin_features: Record<string, string>;
  cosmetics: Record<string, string>;
  tattoo_mark_eyepatch: Record<string, string>;
  body: Record<string, string>;
}


export enum BodyType {
  A = 'A', B = 'B'
}

export enum Age {
  Young = 'Young', Mature = 'Mature', Aged = 'Aged'
}

export enum Voice {
  Young1 = 'Young 1', Young2 = 'Young 2', Mature1 = 'Mature 1', Mature2 = 'Mature 2', Aged1 = 'Aged 1', Aged2 = 'Aged 2'
}

export enum Muscle {
  Standard = 'Standard', Muscular = 'Muscular'
}