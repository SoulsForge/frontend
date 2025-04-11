import User from "@/services/users/user";

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type PartialEldenRingCharacter = DeepPartial<EldenRingCharacterDto>;

type Game = {
  id: number;
  name: string;
};

export type BaseCharacter = {
  id: string;
  name: string;
  description: string;
  image_url: string;
  game: Game;
  user: User;
  sliders: EldenRingCharacterDto;
};

export type CreateCharacter = Pick<
  BaseCharacter,
  "name" | "description" | "image_url" | "sliders"
>;

export type RGBColor = {
  r: number;

  g: number;

  b: number;
};

type Base = {
  age: string;

  body_type: string;

  voice: string;
};

type FaceTemplate = {
  structure: number;

  emphasis: number;

  age: number;

  aesthetic: number;
};

type FaceBalance = {
  size: number;

  ratio: number;

  protrusion: number;

  vert: number;

  slant: number;

  horiz: number;
};

type Forehead = {
  depth: number;

  protrusion: number;

  height: number;

  prot1: number;

  prot2: number;

  width: number;
};

type BrowRidge = {
  height: number;

  inner: number;

  outer: number;
};

type Eyes = {
  position: number;

  size: number;

  slant: number;

  spacing: number;
};

type NoseRidge = {
  depth: number;

  length: number;

  position: number;

  tip_height: number;

  protrusion: number;

  height: number;

  slant: number;
};

type Nostrils = {
  slant: number;

  size: number;

  width: number;
};

type Cheeks = {
  height: number;

  depth: number;

  width: number;

  protrusion: number;

  cheeks: number;
};

type Lips = {
  shape: number;

  expression: number;

  fullness: number;

  size: number;

  protrusion: number;

  thickness: number;
};

type Mouth = {
  protrusion: number;

  slant: number;

  occlusion: number;

  position: number;

  width: number;

  distance: number;
};

type Chin = {
  tip: number;

  length: number;

  protrusion: number;

  depth: number;

  size: number;

  height: number;

  width: number;
};

type Jaw = {
  protrusion: number;

  width: number;

  lower: number;

  contour: number;
};

type Hair = {
  hair: number;

  color: RGBColor;

  luster: number;

  roots: number;

  white: number;
};

type Eyebrows = {
  eyebrows: number;

  color: RGBColor;

  white: number;
};

type FacialHair = {
  beard: number;

  color: RGBColor;

  luster: number;

  roots: number;

  white: number;

  stubble: number;
};

type Eyelashes = {
  lashes: number;

  color: RGBColor;
};

type Eye = {
  iris_size: number;

  iris_color: RGBColor;

  clouding_color: RGBColor;

  white_color: RGBColor;

  position: number;

  clouding: number;
};

type SkinFeature = {
  pores: number;

  luster: number;

  dark_circles: number;

  dark_circles_color: RGBColor;
};

type Cosmetics = {
  eyeliner: number;

  eyeliner_color: RGBColor;

  upper: number;

  upper_color: RGBColor;

  lower: number;

  lower_color: RGBColor;

  cheeks: number;

  cheeks_color: RGBColor;

  lipstick: number;

  lipstick_color: RGBColor;
};

type TattooMarkEyepatch = {
  tattoo: number;

  tattoo_color: RGBColor;

  vertical: number;

  horizontal: number;

  angle: number;

  expansion: number;

  flip: boolean;

  eyepatch: number;

  eyepatch_color: RGBColor;
};

type Body = {
  head: number;

  chest: number;

  abdomen: number;

  arms: number;

  legs: number;

  body_hair: number;

  body_hair_color: RGBColor;

  muscle: string;
};

type EldenRingCharacterDto = {
  base: Base;

  skin_color: RGBColor;

  face_template: FaceTemplate;

  face_balance: FaceBalance;

  forehead: Forehead;

  brow_ridge: BrowRidge;

  eyes: Eyes;

  nose_ridge: NoseRidge;

  nostrils: Nostrils;

  cheeks: Cheeks;

  lips: Lips;

  mouth: Mouth;

  chin: Chin;

  jaw: Jaw;

  hair: Hair;

  eyebrows: Eyebrows;
  facial_hair: FacialHair;
  eyelashes: Eyelashes;
  right_eye: Eye;
  left_eye: Eye;
  skin_feature: SkinFeature;
  cosmetics: Cosmetics;
  tattoo_mark_eyepatch: TattooMarkEyepatch;
  body: Body;
};

export { EldenRingCharacterDto };
