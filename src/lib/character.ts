import { CreateCharacter } from "./types";

export function mapToCreateCharacter(data: any): CreateCharacter {
  if (!data || typeof data !== "object") {
    throw new Error("Invalid input: data must be an object");
  }

  const createCharacter: CreateCharacter = {
    name: validateString(data.name, "name"),
    description: validateString(data.description, "description"),
    image_url: validateString(data.image_url, "image_url"),
    sliders: mapSliders(data.sliders),
  };

  return createCharacter;
}

function validateString(value: any, fieldName: string): string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(
      `Invalid value for ${fieldName}: must be a non-empty string`,
    );
  }
  return value.trim();
}

function mapSliders(sliders: any): CreateCharacter["sliders"] {
  if (!sliders || typeof sliders !== "object") {
    throw new Error("Invalid sliders: must be an object");
  }

  return {
    base: {
      age: validateEnum(
        sliders.base?.age,
        ["Young", "Mature", "Aged"],
        "base.age",
      ),
      voice: validateEnum(
        sliders.base?.voice,
        ["Young 1", "Young 2", "Mature 1", "Mature 2", "Aged 1", "Aged 2"],
        "base.voice",
      ),
      body_type: validateEnum(
        sliders.base?.body_type,
        ["A", "B"],
        "base.body_type",
      ),
    },
    body: {
      arms: validateNumber(parseInt(sliders.body?.arms), "body.arms"),
      head: validateNumber(parseInt(sliders.body?.head), "body.head"),
      legs: validateNumber(parseInt(sliders.body?.legs), "body.legs"),
      chest: validateNumber(parseInt(sliders.body?.chest), "body.chest"),
      muscle: validateEnum(
        sliders.body?.muscle,
        ["Standard", "Muscular"],
        "body.muscle",
      ),
      abdomen: validateNumber(parseInt(sliders.body?.abdomen), "body.abdomen"),
      body_hair: validateNumber(
        parseInt(sliders.body?.body_hair),
        "body.body_hair",
      ),
      body_hair_color: validateColor(
        sliders.body?.body_hair_color,
        "body.body_hair_color",
      ),
    },
    chin: mapNumericSliders(sliders.chin, "chin", [
      "tip",
      "size",
      "depth",
      "width",
      "height",
      "length",
      "protrusion",
    ]),
    eyes: mapNumericSliders(sliders.eyes, "eyes", [
      "size",
      "slant",
      "spacing",
      "position",
    ]),
    hair: {
      hair: validateNumber(parseInt(sliders.hair?.hair), "hair.hair"),
      color: validateColor(sliders.hair?.color, "hair.color"),
      roots: validateNumber(parseInt(sliders.hair?.roots), "hair.roots"),
      white: validateNumber(parseInt(sliders.hair?.white), "hair.white"),
      luster: validateNumber(parseInt(sliders.hair?.luster), "hair.luster"),
    },
    lips: mapNumericSliders(sliders.lips, "lips", [
      "size",
      "shape",
      "fullness",
      "thickness",
      "expression",
      "protrusion",
    ]),
    mouth: mapNumericSliders(sliders.mouth, "mouth", [
      "slant",
      "width",
      "distance",
      "position",
      "occlusion",
      "protrusion",
    ]),
    cheeks: mapNumericSliders(sliders.cheeks, "cheeks", [
      "depth",
      "width",
      "cheeks",
      "height",
      "protrusion",
    ]),
    eyebrows: {
      color: validateColor(sliders.eyebrows?.color, "eyebrows.color"),
      white: validateNumber(
        parseInt(sliders.eyebrows?.white),
        "eyebrows.white",
      ),
      eyebrows: validateNumber(
        parseInt(sliders.eyebrows?.eyebrows),
        "eyebrows.eyebrows",
      ),
    },
    forehead: mapNumericSliders(sliders.forehead, "forehead", [
      "depth",
      "prot1",
      "prot2",
      "width",
      "height",
      "protrusion",
    ]),
    left_eye: mapEye(sliders.left_eye, "left_eye"),
    right_eye: mapEye(sliders.right_eye, "right_eye"),
    nostrils: mapNumericSliders(sliders.nostrils, "nostrils", [
      "size",
      "slant",
      "width",
    ]),
    cosmetics: {
      lower: validateNumber(
        parseInt(sliders.cosmetics?.lower),
        "cosmetics.lower",
      ),
      upper: validateNumber(
        parseInt(sliders.cosmetics?.upper),
        "cosmetics.upper",
      ),
      cheeks: validateNumber(
        parseInt(sliders.cosmetics?.cheeks),
        "cosmetics.cheeks",
      ),
      eyeliner: validateNumber(
        parseInt(sliders.cosmetics?.eyeliner),
        "cosmetics.eyeliner",
      ),
      lipstick: validateNumber(
        parseInt(sliders.cosmetics?.lipstick),
        "cosmetics.lipstick",
      ),
      lower_color: validateColor(
        sliders.cosmetics?.lower_color,
        "cosmetics.lower_color",
      ),
      upper_color: validateColor(
        sliders.cosmetics?.upper_color,
        "cosmetics.upper_color",
      ),
      cheeks_color: validateColor(
        sliders.cosmetics?.cheeks_color,
        "cosmetics.cheeks_color",
      ),
      eyeliner_color: validateColor(
        sliders.cosmetics?.eyeliner_color,
        "cosmetics.eyeliner_color",
      ),
      lipstick_color: validateColor(
        sliders.cosmetics?.lipstick_color,
        "cosmetics.lipstick_color",
      ),
    },
    brow_ridge: mapNumericSliders(sliders.brow_ridge, "brow_ridge", [
      "inner",
      "outer",
      "height",
    ]),
    nose_ridge: mapNumericSliders(sliders.nose_ridge, "nose_ridge", [
      "depth",
      "slant",
      "height",
      "length",
      "position",
      "protrusion",
      "tip_height",
    ]),
    skin_color: validateColor(sliders.skin_color, "skin_color"),
    facial_hair: {
      beard: validateNumber(
        parseInt(sliders.facial_hair?.beard),
        "facial_hair.beard",
      ),
      color: validateColor(sliders.facial_hair?.color, "facial_hair.color"),
      roots: validateNumber(
        parseInt(sliders.facial_hair?.roots),
        "facial_hair.roots",
      ),
      white: validateNumber(
        parseInt(sliders.facial_hair?.white),
        "facial_hair.white",
      ),
      luster: validateNumber(
        parseInt(sliders.facial_hair?.luster),
        "facial_hair.luster",
      ),
      stubble: validateNumber(
        parseInt(sliders.facial_hair?.stubble),
        "facial_hair.stubble",
      ),
    },
    face_balance: mapNumericSliders(sliders.face_balance, "face_balance", [
      "size",
      "vert",
      "horiz",
      "ratio",
      "slant",
      "protrusion",
    ]),
    skin_feature: {
      pores: validateNumber(
        parseInt(sliders.skin_feature?.pores),
        "skin_feature.pores",
      ),
      luster: validateNumber(
        parseInt(sliders.skin_feature?.luster),
        "skin_feature.luster",
      ),
      dark_circles: validateNumber(
        parseInt(sliders.skin_feature?.dark_circles),
        "skin_feature.dark_circles",
      ),
      dark_circles_color: validateColor(
        sliders.skin_feature?.dark_circles_color,
        "skin_feature.dark_circles_color",
      ),
    },
    face_template: mapNumericSliders(sliders.face_template, "face_template", [
      "age",
      "emphasis",
      "aesthetic",
      "structure",
    ]),
    tattoo_mark_eyepatch: {
      flip: validateBoolean(
        sliders.tattoo_mark_eyepatch?.flip,
        "tattoo_mark_eyepatch.flip",
      ),
      angle: validateNumber(
        parseInt(sliders.tattoo_mark_eyepatch?.angle),
        "tattoo_mark_eyepatch.angle",
      ),
      tattoo: validateNumber(
        parseInt(sliders.tattoo_mark_eyepatch?.tattoo),
        "tattoo_mark_eyepatch.tattoo",
      ),
      eyepatch: validateNumber(
        parseInt(sliders.tattoo_mark_eyepatch?.eyepatch),
        "tattoo_mark_eyepatch.eyepatch",
      ),
      vertical: validateNumber(
        parseInt(sliders.tattoo_mark_eyepatch?.vertical),
        "tattoo_mark_eyepatch.vertical",
      ),
      expansion: validateNumber(
        parseInt(sliders.tattoo_mark_eyepatch?.expansion),
        "tattoo_mark_eyepatch.expansion",
      ),
      horizontal: validateNumber(
        parseInt(sliders.tattoo_mark_eyepatch?.horizontal),
        "tattoo_mark_eyepatch.horizontal",
      ),
      tattoo_color: validateColor(
        sliders.tattoo_mark_eyepatch?.tattoo_color,
        "tattoo_mark_eyepatch.tattoo_color",
      ),
      eyepatch_color: validateColor(
        sliders.tattoo_mark_eyepatch?.eyepatch_color,
        "tattoo_mark_eyepatch.eyepatch_color",
      ),
    },
  };
}

function validateNumber(
  value: any,
  fieldName: string,
  defaultValue?: number,
): number {
  if ((typeof value !== "number" || isNaN(value)) && defaultValue === null) {
    throw new Error(`Invalid value for ${fieldName}: must be a number`);
  }
  return typeof value !== "number" || isNaN(value) ? defaultValue! : value;
}

function validateBoolean(value: any, fieldName: string): boolean {
  if (typeof value !== "boolean") {
    throw new Error(`Invalid value for ${fieldName}: must be a boolean`);
  }
  return value;
}

function validateColor(
  value: any,
  fieldName: string,
): { r: number; g: number; b: number } {
  if (
    !value ||
    typeof value !== "object" ||
    typeof value.r !== "number" ||
    typeof value.g !== "number" ||
    typeof value.b !== "number"
  ) {
    throw new Error(
      `Invalid value for ${fieldName}: must be an object with r, g, and b numbers`,
    );
  }
  return { r: value.r, g: value.g, b: value.b };
}

function validateEnum(
  value: any,
  allowedValues: any[],
  fieldName: string,
): any {
  if (!allowedValues.includes(value)) {
    throw new Error(
      `Invalid value for ${fieldName}: must be one of ${allowedValues.join(", ")}`,
    );
  }
  return value;
}

function mapNumericSliders(
  slider: any,
  sliderName: string,
  fields: string[],
): Record<string, number> {
  const result: Record<string, number> = {};
  fields.forEach((field) => {
    result[field] = validateNumber(
      parseInt(slider?.[field]),
      `${sliderName}.${field}`,
    );
  });
  return result;
}

function mapEye(eye: any, eyeName: string): any {
  return {
    position: validateNumber(eye?.position, `${eyeName}.position`),
    iris_size: validateNumber(eye?.iris_size, `${eyeName}.iris_size`),
    iris_color: validateColor(eye?.iris_color, `${eyeName}.iris_color`),
    white_color: validateColor(eye?.white_color, `${eyeName}.white_color`),
    clouding_color: validateColor(
      eye?.clouding_color,
      `${eyeName}.clouding_color`,
    ),
    clouding: validateNumber(eye?.clouding, `${eyeName}.clouding`),
  };
}

export function mapFromEldenBling(data: any): CreateCharacter {
  if (!data || typeof data !== "object") {
    throw new Error("Invalid input: data must be an object");
  }

  const character: CreateCharacter = {
    name: validateString(data.base?.name, "base.name"),
    description: "",
    image_url: "",
    sliders: {
      base: {
        body_type: validateEnum(
          data.base?.body_type,
          ["A", "B"],
          "base.body_type",
        ),
        age: validateEnum(
          data.base?.age,
          ["Young", "Mature", "Aged"],
          "base.age",
        ),
        voice: validateString(data.base?.voice, "base.voice"),
      },
      skin_color: {
        r: parseInt(data.skin_color?.skin_r),
        g: parseInt(data.skin_color?.skin_g),
        b: parseInt(data.skin_color?.skin_b),
      },
      face_template: mapNumericSliders(data.face_template, "face_template", [
        "structure",
        "emphasis",
        "age",
        "aesthetic",
      ]),
      face_balance: mapNumericSliders(data.face_balance, "face_balance", [
        "size",
        "ratio",
        "protrusion",
        "vert",
        "slant",
        "horiz",
      ]),
      forehead: mapNumericSliders(data.forehead, "forehead", [
        "depth",
        "protrusion",
        "height",
        "prot1",
        "prot2",
        "width",
      ]),
      brow_ridge: mapNumericSliders(data.brow_ridge, "brow_ridge", [
        "height",
        "inner",
        "outer",
      ]),
      eyes: mapNumericSliders(data.eyes, "eyes", [
        "position",
        "size",
        "slant",
        "spacing",
      ]),
      nose_ridge: mapNumericSliders(data.nose_ridge, "nose_ridge", [
        "depth",
        "length",
        "position",
        "tip_height",
        "protrusion",
        "height",
        "slant",
      ]),
      nostrils: mapNumericSliders(data.nostrils, "nostrils", [
        "slant",
        "size",
        "width",
      ]),
      cheeks: mapNumericSliders(data.cheeks, "cheeks", [
        "height",
        "depth",
        "width",
        "protrusion",
        "cheeks",
      ]),
      lips: mapNumericSliders(data.lips, "lips", [
        "shape",
        "expression",
        "fullness",
        "size",
        "protrusion",
        "thickness",
      ]),
      mouth: mapNumericSliders(data.mouth, "mouth", [
        "protrusion",
        "slant",
        "occlusion",
        "position",
        "width",
        "distance",
      ]),
      chin: mapNumericSliders(data.chin, "chin", [
        "tip",
        "length",
        "protrusion",
        "depth",
        "size",
        "height",
        "width",
      ]),
      jaw: mapNumericSliders(data.jaw, "jaw", [
        "protrusion",
        "width",
        "lower",
        "contour",
      ]),
      hair: {
        hair: validateNumber(parseInt(data.hair?.hair), "hair.hair"),
        color: {
          r: validateNumber(parseInt(data.hair?.hair_r), "hair.hair_r"),
          g: validateNumber(parseInt(data.hair?.hair_g), "hair.hair_g"),
          b: validateNumber(parseInt(data.hair?.hair_b), "hair.hair_b"),
        },
        luster: validateNumber(parseInt(data.hair?.luster), "hair.luster"),
        roots: validateNumber(parseInt(data.hair?.roots), "hair.roots"),
        white: validateNumber(parseInt(data.hair?.white), "hair.white"),
      },
      eyebrows: {
        eyebrows: validateNumber(
          parseInt(data.eyebrows?.brow),
          "eyebrows.brow",
        ),
        color: {
          r: validateNumber(parseInt(data.eyebrows?.brow_r), "eyebrows.brow_r"),
          g: validateNumber(parseInt(data.eyebrows?.brow_g), "eyebrows.brow_g"),
          b: validateNumber(parseInt(data.eyebrows?.brow_b), "eyebrows.brow_b"),
        },
      },
      facial_hair: {
        beard: validateNumber(
          parseInt(data.facial_hair?.beard),
          "facial_hair.beard",
        ),
        stubble: validateNumber(
          parseInt(data.facial_hair?.stubble),
          "facial_hair.stubble",
        ),
      },
      eyelashes: {
        lashes: validateNumber(
          parseInt(data.eyelashes?.lashes),
          "eyelashes.lashes",
        ),
        color: {
          r: validateNumber(
            parseInt(data.eyelashes?.lashes_r),
            "eyelashes.lashes_r",
          ),
          g: validateNumber(
            parseInt(data.eyelashes?.lashes_g),
            "eyelashes.lashes_g",
          ),
          b: validateNumber(
            parseInt(data.eyelashes?.lashes_b),
            "eyelashes.lashes_b",
          ),
        },
      },
      right_eye: {
        iris_size: validateNumber(
          parseInt(data.right_eye?.iris_size),
          "right_eye.iris_size",
        ),
        iris_color: {
          r: validateNumber(
            parseInt(data.right_eye?.iris_r),
            "right_eye.iris_r",
          ),
          g: validateNumber(
            parseInt(data.right_eye?.iris_g),
            "right_eye.iris_g",
          ),
          b: validateNumber(
            parseInt(data.right_eye?.iris_b),
            "right_eye.iris_b",
          ),
        },
        clouding: validateNumber(
          parseInt(data.right_eye?.clouding),
          "right_eye.clouding",
        ),
        clouding_color: {
          r: validateNumber(
            parseInt(data.right_eye?.clouding_r),
            "right_eye.clouding_r",
          ),
          g: validateNumber(
            parseInt(data.right_eye?.clouding_g),
            "right_eye.clouding_g",
          ),
          b: validateNumber(
            parseInt(data.right_eye?.clouding_b),
            "right_eye.clouding_b",
          ),
        },
        white_color: {
          r: validateNumber(
            parseInt(data.right_eye?.white_r),
            "right_eye.white_r",
          ),
          g: validateNumber(
            parseInt(data.right_eye?.white_g),
            "right_eye.white_g",
          ),
          b: validateNumber(
            parseInt(data.right_eye?.white_b),
            "right_eye.white_b",
          ),
        },
        position: validateNumber(
          parseInt(data.right_eye?.position),
          "right_eye.position",
        ),
      },
      left_eye: {
        iris_size: validateNumber(
          parseInt(data.left_eye?.iris_size),
          "left_eye.iris_size",
          0,
        ),
        iris_color: {
          r: validateNumber(
            parseInt(data.left_eye?.iris_r),
            "left_eye.iris_r",
            0,
          ),
          g: validateNumber(
            parseInt(data.left_eye?.iris_g),
            "left_eye.iris_g",
            0,
          ),
          b: validateNumber(
            parseInt(data.left_eye?.iris_b),
            "left_eye.iris_b",
            0,
          ),
        },
        clouding: validateNumber(
          parseInt(data.left_eye?.clouding),
          "left_eye.clouding",
          0,
        ),
        clouding_color: {
          r: validateNumber(
            parseInt(data.left_eye?.clouding_r),
            "left_eye.clouding_r",
            0,
          ),
          g: validateNumber(
            parseInt(data.left_eye?.clouding_g),
            "left_eye.clouding_g",
            0,
          ),
          b: validateNumber(
            parseInt(data.left_eye?.clouding_b),
            "left_eye.clouding_b",
            0,
          ),
        },
        white_color: {
          r: validateNumber(
            parseInt(data.left_eye?.white_r),
            "left_eye.white_r",
            0,
          ),
          g: validateNumber(
            parseInt(data.left_eye?.white_g),
            "left_eye.white_g",
            0,
          ),
          b: validateNumber(
            parseInt(data.left_eye?.white_b),
            "left_eye.white_b",
            0,
          ),
        },
        position: validateNumber(
          parseInt(data.left_eye?.position),
          "left_eye.position",
          0,
        ),
      },
      skin_feature: {
        pores: validateNumber(
          parseInt(data.skin_features?.pores),
          "skin_features.pores",
        ),
        luster: validateNumber(
          parseInt(data.skin_features?.luster),
          "skin_features.luster",
        ),
        dark_circles: validateNumber(
          parseInt(data.skin_features?.dark_circles),
          "skin_features.dark_circles",
        ),
        dark_circles_color: {
          r: validateNumber(
            parseInt(data.skin_features?.dark_circles_r),
            "skin_features.dark_circles_r",
          ),
          g: validateNumber(
            parseInt(data.skin_features?.dark_circles_g),
            "skin_features.dark_circles_g",
          ),
          b: validateNumber(
            parseInt(data.skin_features?.dark_circles_b),
            "skin_features.dark_circles_b",
          ),
        },
      },
      cosmetics: {
        eyeliner: validateNumber(
          parseInt(data.cosmetics?.eyeliner),
          "cosmetics.eyeliner",
        ),
        eyeliner_color: {
          r: validateNumber(
            parseInt(data.cosmetics?.eyeliner_r),
            "cosmetics.eyeliner_r",
          ),
          g: validateNumber(
            parseInt(data.cosmetics?.eyeliner_g),
            "cosmetics.eyeliner_g",
          ),
          b: validateNumber(
            parseInt(data.cosmetics?.eyeliner_b),
            "cosmetics.eyeliner_b",
          ),
        },
        upper: validateNumber(
          parseInt(data.cosmetics?.upper),
          "cosmetics.upper",
        ),
        upper_color: {
          r: validateNumber(
            parseInt(data.cosmetics?.upper_r),
            "cosmetics.upper_r",
          ),
          g: validateNumber(
            parseInt(data.cosmetics?.upper_g),
            "cosmetics.upper_g",
          ),
          b: validateNumber(
            parseInt(data.cosmetics?.upper_b),
            "cosmetics.upper_b",
          ),
        },
        lower: validateNumber(
          parseInt(data.cosmetics?.lower),
          "cosmetics.lower",
        ),
        lower_color: {
          r: validateNumber(
            parseInt(data.cosmetics?.lower_r),
            "cosmetics.lower_r",
          ),
          g: validateNumber(
            parseInt(data.cosmetics?.lower_g),
            "cosmetics.lower_g",
          ),
          b: validateNumber(
            parseInt(data.cosmetics?.lower_b),
            "cosmetics.lower_b",
          ),
        },
        cheeks: validateNumber(
          parseInt(data.cosmetics?.cheeks),
          "cosmetics.cheeks",
        ),
        cheeks_color: {
          r: validateNumber(
            parseInt(data.cosmetics?.cheeks_r),
            "cosmetics.cheeks_r",
          ),
          g: validateNumber(
            parseInt(data.cosmetics?.cheeks_g),
            "cosmetics.cheeks_g",
          ),
          b: validateNumber(
            parseInt(data.cosmetics?.cheeks_b),
            "cosmetics.cheeks_b",
          ),
        },
        lipstick: validateNumber(
          parseInt(data.cosmetics?.lipstick),
          "cosmetics.lipstick",
        ),
        lipstick_color: {
          r: validateNumber(
            parseInt(data.cosmetics?.lipstick_r),
            "cosmetics.lipstick_r",
          ),
          g: validateNumber(
            parseInt(data.cosmetics?.lipstick_g),
            "cosmetics.lipstick_g",
          ),
          b: validateNumber(
            parseInt(data.cosmetics?.lipstick_b),
            "cosmetics.lipstick_b",
          ),
        },
      },
      tattoo_mark_eyepatch: {
        tattoo: validateNumber(
          parseInt(data.tattoo_mark_eyepatch?.tattoo),
          "tattoo_mark_eyepatch.tattoo",
        ),
        flip:
          validateEnum(
            data.tattoo_mark_eyepatch?.flip,
            ["ON", "OFF"],
            "tattoo_mark_eyepatch.flip",
          ) === "ON",
        eyepatch: validateNumber(
          parseInt(data.tattoo_mark_eyepatch?.eyepatch),
          "tattoo_mark_eyepatch.eyepatch",
        ),
      },
      body: {
        head: validateNumber(parseInt(data.body?.head), "body.head"),
        chest: validateNumber(parseInt(data.body?.chest), "body.chest"),
        abdomen: validateNumber(parseInt(data.body?.abdomen), "body.abdomen"),
        arms: validateNumber(parseInt(data.body?.arms), "body.arms"),
        legs: validateNumber(parseInt(data.body?.legs), "body.legs"),
        body_hair: validateNumber(
          parseInt(data.body?.body_hair),
          "body.body_hair",
        ),
        muscle: validateEnum(
          data.body?.muscle,
          ["Standard", "Muscular"],
          "body.muscle",
        ),
      },
    },
  };

  return character;
}
