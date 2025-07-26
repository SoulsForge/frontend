import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { BaseCharacter } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { CharacterLimitInput } from "@/components/ui/input-limit";
import CharacterSection from "@/components/characters/character-section";
import CharacterSubsectionEdit from "@/components/characters/edit/character-subsection-edit";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ReactNode } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import usePartialState from "@/hooks/use-partial-state";

// Since BaseCharacter extends object, this should work fine
type UsePartialStateReturn<T extends object> = ReturnType<
  typeof usePartialState<T>
>;

type CharacterFormProps<T extends BaseCharacter> = {
  character: T;
  partialStateHook: UsePartialStateReturn<T>;
  loading: boolean;
  onSave: () => Promise<void>;
  onCancel: () => void;
  onReset: () => void;
  title?: string;
  headerContent?: ReactNode;
};

export default function CharacterForm<T extends BaseCharacter>({
  character,
  partialStateHook,
  loading,
  onSave,
  onCancel,
  onReset,
  title,
  headerContent,
}: CharacterFormProps<T>) {
  const { updateState, getCurrentValue, resetState, hasChanges } =
    partialStateHook;
  const [confirmResetOpenDialog, setConfirmResetOpenDialog] =
    useState<boolean>(false);

  return (
    <>
      <AlertDialog open={confirmResetOpenDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to reset the character?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setConfirmResetOpenDialog(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                resetState();
                setConfirmResetOpenDialog(false);
                onReset();
              }}
            >
              Reset
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <article className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-8">
        <section className="sticky top-0 z-10 flex w-full items-center justify-between space-x-2 px-4 py-2">
          {headerContent && <div>{headerContent}</div>}
          <div className="flex space-x-2">
            <Button
              className="cursor-pointer"
              variant="destructive"
              disabled={loading}
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              className="cursor-pointer"
              variant="default"
              disabled={!hasChanges || loading}
              onClick={() => setConfirmResetOpenDialog(true)}
            >
              Reset
            </Button>
            <Button
              disabled={loading || (!hasChanges && !title?.includes("Create"))}
              className="cursor-pointer"
              variant="default"
              onClick={onSave}
            >
              {title?.includes("Create") ? "Create" : "Save"}
            </Button>
          </div>
        </section>

        <section className="mt-8 flex w-full flex-row items-start justify-around">
          <div className="flex w-full flex-col items-start justify-start">
            <Label className="mt-4 text-lg font-bold" htmlFor="name">
              Character Name
            </Label>
            <CharacterLimitInput
              required
              containerClassName="w-full"
              id="name"
              placeholder="Character Name"
              value={getCurrentValue("name", character)}
              onChange={(e) => {
                updateState("name", e.target.value);
              }}
              disabled={loading}
            />
          </div>
        </section>
        <section className="flex w-full flex-col">
          <Label className="mt-4 text-lg font-bold" htmlFor="image_url">
            Image URL
          </Label>

          <Input
            className="w-full"
            id="image_url"
            type="url"
            value={getCurrentValue("image_url", character)}
            onChange={(e) => {
              updateState("image_url", e.target.value);
            }}
            disabled={loading}
            placeholder="Image URL"
            required
          />
        </section>

        <section className="mt-8 flex w-full flex-col items-start">
          <Label className="mt-4 text-lg font-bold" htmlFor="description">
            Description
          </Label>
          <Textarea
            value={getCurrentValue("description", character)}
            placeholder="Character description"
            className="h-32 w-full"
            id="description"
            onChange={(e) => {
              updateState("description", e.target.value);
            }}
            required
            disabled={loading}
          />
        </section>

        <section className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-0.5 gap-y-2 lg:flex lg:flex-wrap">
          <CharacterSection title="Base">
            <CharacterSubsectionEdit
              disabled={loading}
              title="Age"
              value={getCurrentValue("sliders.base.age", character)}
              values={["Young", "Mature", "Aged"]}
              onChange={(value) => {
                updateState("sliders.base.age", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Voice"
              value={getCurrentValue("sliders.base.voice", character)}
              values={[
                "Young 1",
                "Young 2",
                "Mature 1",
                "Mature 2",
                "Aged 1",
                "Aged 2",
              ]}
              onChange={(value) => {
                updateState("sliders.base.voice", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Type"
              value={getCurrentValue("sliders.base.body_type", character)}
              values={["A", "B"]}
              onChange={(value) => {
                updateState("sliders.base.body_type", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Skin Color"
              value={getCurrentValue("sliders.skin_color", character)}
              onChange={(value) => {
                updateState("sliders.skin_color", value);
              }}
            />
          </CharacterSection>

          <CharacterSection title="Face Template">
            <CharacterSubsectionEdit
              disabled={loading}
              title="Age"
              value={getCurrentValue("sliders.face_template.age", character)}
              onChange={(value) => {
                updateState("sliders.face_template.age", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Emphasis"
              value={getCurrentValue(
                "sliders.face_template.emphasis",
                character,
              )}
              onChange={(value) => {
                updateState("sliders.face_template.emphasis", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Aesthetic"
              value={getCurrentValue(
                "sliders.face_template.aesthetic",
                character,
              )}
              onChange={(value) => {
                updateState("sliders.face_template.aesthetic", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Structure"
              value={getCurrentValue(
                "sliders.face_template.structure",
                character,
              )}
              onChange={(value) => {
                updateState("sliders.face_template.structure", value);
              }}
            />
          </CharacterSection>

          {/* All the rest of the character sections follow the same pattern */}
          {/* Face Balance */}
          <CharacterSection title="Face Balance">
            <CharacterSubsectionEdit
              disabled={loading}
              title="Size"
              value={getCurrentValue("sliders.face_balance.size", character)}
              onChange={(value) => {
                updateState("sliders.face_balance.size", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Vertical"
              value={getCurrentValue("sliders.face_balance.vert", character)}
              onChange={(value) => {
                updateState("sliders.face_balance.vert", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Horizontal"
              value={getCurrentValue("sliders.face_balance.horiz", character)}
              onChange={(value) => {
                updateState("sliders.face_balance.horiz", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Ratio"
              value={getCurrentValue("sliders.face_balance.ratio", character)}
              onChange={(value) => {
                updateState("sliders.face_balance.ratio", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Slant"
              value={getCurrentValue("sliders.face_balance.slant", character)}
              onChange={(value) => {
                updateState("sliders.face_balance.slant", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Protrusion"
              value={getCurrentValue(
                "sliders.face_balance.protrusion",
                character,
              )}
              onChange={(value) => {
                updateState("sliders.face_balance.protrusion", value);
              }}
            />
          </CharacterSection>

          {/* Forehead */}
          <CharacterSection title="Forehead">
            <CharacterSubsectionEdit
              disabled={loading}
              title="Depth"
              value={getCurrentValue("sliders.forehead.depth", character)}
              onChange={(value) => {
                updateState("sliders.forehead.depth", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Prot1"
              value={getCurrentValue("sliders.forehead.prot1", character)}
              onChange={(value) => {
                updateState("sliders.forehead.prot1", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Prot2"
              value={getCurrentValue("sliders.forehead.prot2", character)}
              onChange={(value) => {
                updateState("sliders.forehead.prot2", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Width"
              value={getCurrentValue("sliders.forehead.width", character)}
              onChange={(value) => {
                updateState("sliders.forehead.width", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Height"
              value={getCurrentValue("sliders.forehead.height", character)}
              onChange={(value) => {
                updateState("sliders.forehead.height", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Protrusion"
              value={getCurrentValue("sliders.forehead.protrusion", character)}
              onChange={(value) => {
                updateState("sliders.forehead.protrusion", value);
              }}
            />
          </CharacterSection>

          <CharacterSection title="Brow Ridge">
            <CharacterSubsectionEdit
              disabled={loading}
              title="Inner"
              value={getCurrentValue("sliders.brow_ridge.inner", character)}
              onChange={(value) => {
                updateState("sliders.brow_ridge.inner", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Outer"
              value={getCurrentValue("sliders.brow_ridge.outer", character)}
              onChange={(value) => {
                updateState("sliders.brow_ridge.outer", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Height"
              value={getCurrentValue("sliders.brow_ridge.height", character)}
              onChange={(value) => {
                updateState("sliders.brow_ridge.height", value);
              }}
            />
          </CharacterSection>

          <CharacterSection title="Eyes">
            <CharacterSubsectionEdit
              disabled={loading}
              title="Size"
              value={getCurrentValue("sliders.eyes.size", character)}
              onChange={(value) => {
                updateState("sliders.eyes.size", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Slant"
              value={getCurrentValue("sliders.eyes.slant", character)}
              onChange={(value) => {
                updateState("sliders.eyes.slant", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Spacing"
              value={getCurrentValue("sliders.eyes.spacing", character)}
              onChange={(value) => {
                updateState("sliders.eyes.spacing", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Position"
              value={getCurrentValue("sliders.eyes.position", character)}
              onChange={(value) => {
                updateState("sliders.eyes.position", value);
              }}
            />
          </CharacterSection>

          <CharacterSection title="Nose Ridge">
            <CharacterSubsectionEdit
              disabled={loading}
              title="Depth"
              value={getCurrentValue("sliders.nose_ridge.depth", character)}
              onChange={(value) => {
                updateState("sliders.nose_ridge.depth", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Slant"
              value={getCurrentValue("sliders.nose_ridge.slant", character)}
              onChange={(value) => {
                updateState("sliders.nose_ridge.slant", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Height"
              value={getCurrentValue("sliders.nose_ridge.height", character)}
              onChange={(value) => {
                updateState("sliders.nose_ridge.height", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Length"
              value={getCurrentValue("sliders.nose_ridge.length", character)}
              onChange={(value) => {
                updateState("sliders.nose_ridge.length", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Position"
              value={getCurrentValue("sliders.nose_ridge.position", character)}
              onChange={(value) => {
                updateState("sliders.nose_ridge.position", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Protrusion"
              value={getCurrentValue(
                "sliders.nose_ridge.protrusion",
                character,
              )}
              onChange={(value) => {
                updateState("sliders.nose_ridge.protrusion", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Tip Height"
              value={getCurrentValue(
                "sliders.nose_ridge.tip_height",
                character,
              )}
              onChange={(value) => {
                updateState("sliders.nose_ridge.tip_height", value);
              }}
            />
          </CharacterSection>

          <CharacterSection title="Nostrils">
            <CharacterSubsectionEdit
              disabled={loading}
              title="Size"
              value={getCurrentValue("sliders.nostrils.size", character)}
              onChange={(value) => {
                updateState("sliders.nostrils.size", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Slant"
              value={getCurrentValue("sliders.nostrils.slant", character)}
              onChange={(value) => {
                updateState("sliders.nostrils.slant", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Width"
              value={getCurrentValue("sliders.nostrils.width", character)}
              onChange={(value) => {
                updateState("sliders.nostrils.width", value);
              }}
            />
          </CharacterSection>

          <CharacterSection title="Cheeks">
            <CharacterSubsectionEdit
              disabled={loading}
              title="Depth"
              value={getCurrentValue("sliders.cheeks.depth", character)}
              onChange={(value) => {
                updateState("sliders.cheeks.depth", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Width"
              value={getCurrentValue("sliders.cheeks.width", character)}
              onChange={(value) => {
                updateState("sliders.cheeks.width", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Cheeks"
              value={getCurrentValue("sliders.cheeks.cheeks", character)}
              onChange={(value) => {
                updateState("sliders.cheeks.cheeks", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Height"
              value={getCurrentValue("sliders.cheeks.height", character)}
              onChange={(value) => {
                updateState("sliders.cheeks.height", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Protrusion"
              value={getCurrentValue("sliders.cheeks.protrusion", character)}
              onChange={(value) => {
                updateState("sliders.cheeks.protrusion", value);
              }}
            />
          </CharacterSection>

          <CharacterSection title="Lips">
            <CharacterSubsectionEdit
              disabled={loading}
              title="Size"
              value={getCurrentValue("sliders.lips.size", character)}
              onChange={(value) => {
                updateState("sliders.lips.size", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Shape"
              value={getCurrentValue("sliders.lips.shape", character)}
              onChange={(value) => {
                updateState("sliders.lips.shape", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Fullness"
              value={getCurrentValue("sliders.lips.fullness", character)}
              onChange={(value) => {
                updateState("sliders.lips.fullness", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Thickness"
              value={getCurrentValue("sliders.lips.thickness", character)}
              onChange={(value) => {
                updateState("sliders.lips.thickness", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Expression"
              value={getCurrentValue("sliders.lips.expression", character)}
              onChange={(value) => {
                updateState("sliders.lips.expression", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Protrusion"
              value={getCurrentValue("sliders.lips.protrusion", character)}
              onChange={(value) => {
                updateState("sliders.lips.protrusion", value);
              }}
            />
          </CharacterSection>

          <CharacterSection title="Mouth">
            <CharacterSubsectionEdit
              disabled={loading}
              title="Slant"
              value={getCurrentValue("sliders.mouth.slant", character)}
              onChange={(value) => {
                updateState("sliders.mouth.slant", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Width"
              value={getCurrentValue("sliders.mouth.width", character)}
              onChange={(value) => {
                updateState("sliders.mouth.width", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Distance"
              value={getCurrentValue("sliders.mouth.distance", character)}
              onChange={(value) => {
                updateState("sliders.mouth.distance", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Position"
              value={getCurrentValue("sliders.mouth.position", character)}
              onChange={(value) => {
                updateState("sliders.mouth.position", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Occlusion"
              value={getCurrentValue("sliders.mouth.occlusion", character)}
              onChange={(value) => {
                updateState("sliders.mouth.occlusion", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Protrusion"
              value={getCurrentValue("sliders.mouth.protrusion", character)}
              onChange={(value) => {
                updateState("sliders.mouth.protrusion", value);
              }}
            />
          </CharacterSection>

          <CharacterSection title="Chin">
            <CharacterSubsectionEdit
              disabled={loading}
              title="Tip"
              value={getCurrentValue("sliders.chin.tip", character)}
              onChange={(value) => {
                updateState("sliders.chin.tip", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Size"
              value={getCurrentValue("sliders.chin.size", character)}
              onChange={(value) => {
                updateState("sliders.chin.size", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Depth"
              value={getCurrentValue("sliders.chin.depth", character)}
              onChange={(value) => {
                updateState("sliders.chin.depth", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Width"
              value={getCurrentValue("sliders.chin.width", character)}
              onChange={(value) => {
                updateState("sliders.chin.width", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Height"
              value={getCurrentValue("sliders.chin.height", character)}
              onChange={(value) => {
                updateState("sliders.chin.height", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Length"
              value={getCurrentValue("sliders.chin.length", character)}
              onChange={(value) => {
                updateState("sliders.chin.length", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Protrusion"
              value={getCurrentValue("sliders.chin.protrusion", character)}
              onChange={(value) => {
                updateState("sliders.chin.protrusion", value);
              }}
            />
          </CharacterSection>

          <CharacterSection title="Jaw">
            <CharacterSubsectionEdit
              disabled={loading}
              title="Lower"
              value={getCurrentValue("sliders.jaw.lower", character)}
              onChange={(value) => {
                updateState("sliders.jaw.lower", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Width"
              value={getCurrentValue("sliders.jaw.width", character)}
              onChange={(value) => {
                updateState("sliders.jaw.width", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Contour"
              value={getCurrentValue("sliders.jaw.contour", character)}
              onChange={(value) => {
                updateState("sliders.jaw.contour", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Protrusion"
              value={getCurrentValue("sliders.jaw.protrusion", character)}
              onChange={(value) => {
                updateState("sliders.jaw.protrusion", value);
              }}
            />
          </CharacterSection>

          <CharacterSection title="Eyebrows">
            <CharacterSubsectionEdit
              disabled={loading}
              title="Color"
              value={getCurrentValue("sliders.eyebrows.color", character)}
              onChange={(value) => {
                updateState("sliders.eyebrows.color", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="White"
              value={getCurrentValue("sliders.eyebrows.white", character)}
              onChange={(value) => {
                updateState("sliders.eyebrows.white", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Eyebrows"
              value={getCurrentValue("sliders.eyebrows.eyebrows", character)}
              onChange={(value) => {
                updateState("sliders.eyebrows.eyebrows", value);
              }}
            />
          </CharacterSection>

          <CharacterSection title="Facial Hair">
            <CharacterSubsectionEdit
              disabled={loading}
              title="Beard"
              value={getCurrentValue("sliders.facial_hair.beard", character)}
              onChange={(value) => {
                updateState("sliders.facial_hair.beard", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Color"
              value={getCurrentValue("sliders.facial_hair.color", character)}
              onChange={(value) => {
                updateState("sliders.facial_hair.color", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Roots"
              value={getCurrentValue("sliders.facial_hair.roots", character)}
              onChange={(value) => {
                updateState("sliders.facial_hair.roots", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="White"
              value={getCurrentValue("sliders.facial_hair.white", character)}
              onChange={(value) => {
                updateState("sliders.facial_hair.white", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Luster"
              value={getCurrentValue("sliders.facial_hair.luster", character)}
              onChange={(value) => {
                updateState("sliders.facial_hair.luster", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Stubble"
              value={getCurrentValue("sliders.facial_hair.stubble", character)}
              onChange={(value) => {
                updateState("sliders.facial_hair.stubble", value);
              }}
            />
          </CharacterSection>

          <CharacterSection title="Eyelashes">
            <CharacterSubsectionEdit
              disabled={loading}
              title="Color"
              value={getCurrentValue("sliders.eyelashes.color", character)}
              onChange={(value) => {
                updateState("sliders.eyelashes.color", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Lashes"
              value={getCurrentValue("sliders.eyelashes.lashes", character)}
              onChange={(value) => {
                updateState("sliders.eyelashes.lashes", value);
              }}
            />
          </CharacterSection>

          <CharacterSection title="Right Eye">
            <CharacterSubsectionEdit
              disabled={loading}
              title="Position"
              value={getCurrentValue("sliders.right_eye.position", character)}
              onChange={(value) => {
                updateState("sliders.right_eye.position", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Iris Size"
              value={getCurrentValue("sliders.right_eye.iris_size", character)}
              onChange={(value) => {
                updateState("sliders.right_eye.iris_size", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Iris Color"
              value={getCurrentValue("sliders.right_eye.iris_color", character)}
              onChange={(value) => {
                updateState("sliders.right_eye.iris_color", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="White Color"
              value={getCurrentValue(
                "sliders.right_eye.white_color",
                character,
              )}
              onChange={(value) => {
                updateState("sliders.right_eye.white_color", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Clouding Color"
              value={getCurrentValue(
                "sliders.right_eye.clouding_color",
                character,
              )}
              onChange={(value) => {
                updateState("sliders.right_eye.clouding_color", value);
              }}
            />

            <CharacterSubsectionEdit
              disabled={loading}
              title="Clouding"
              value={getCurrentValue("sliders.right_eye.clouding", character)}
              onChange={(value) => {
                updateState("sliders.right_eye.clouding", value);
              }}
            />
          </CharacterSection>

          <CharacterSection title="Left Eye">
            <CharacterSubsectionEdit
              disabled={loading}
              title="Position"
              value={getCurrentValue("sliders.left_eye.position", character)}
              onChange={(value) => {
                updateState("sliders.left_eye.position", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Iris Size"
              value={getCurrentValue("sliders.left_eye.iris_size", character)}
              onChange={(value) => {
                updateState("sliders.left_eye.iris_size", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Iris Color"
              value={getCurrentValue("sliders.left_eye.iris_color", character)}
              onChange={(value) => {
                updateState("sliders.left_eye.iris_color", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="White Color"
              value={getCurrentValue("sliders.left_eye.white_color", character)}
              onChange={(value) => {
                updateState("sliders.left_eye.white_color", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Clouding Color"
              value={getCurrentValue(
                "sliders.left_eye.clouding_color",
                character,
              )}
              onChange={(value) => {
                updateState("sliders.left_eye.clouding_color", value);
              }}
            />

            <CharacterSubsectionEdit
              disabled={loading}
              title="Clouding"
              value={getCurrentValue("sliders.left_eye.clouding", character)}
              onChange={(value) => {
                updateState("sliders.left_eye.clouding", value);
              }}
            />
          </CharacterSection>

          <CharacterSection title="Skin Feature">
            <CharacterSubsectionEdit
              disabled={loading}
              title="Pores"
              value={getCurrentValue("sliders.skin_feature.pores", character)}
              onChange={(value) => {
                updateState("sliders.skin_feature.pores", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Luster"
              value={getCurrentValue("sliders.skin_feature.luster", character)}
              onChange={(value) => {
                updateState("sliders.skin_feature.luster", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Dark Circles"
              value={getCurrentValue(
                "sliders.skin_feature.dark_circles",
                character,
              )}
              onChange={(value) => {
                updateState("sliders.skin_feature.dark_circles", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Dark Circles Color"
              value={getCurrentValue(
                "sliders.skin_feature.dark_circles_color",
                character,
              )}
              onChange={(value) => {
                updateState("sliders.skin_feature.dark_circles_color", value);
              }}
            />
          </CharacterSection>

          <CharacterSection title="Cosmetics">
            <CharacterSubsectionEdit
              disabled={loading}
              title="Lower"
              value={getCurrentValue("sliders.cosmetics.lower", character)}
              onChange={(value) => {
                updateState("sliders.cosmetics.lower", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Upper"
              value={getCurrentValue("sliders.cosmetics.upper", character)}
              onChange={(value) => {
                updateState("sliders.cosmetics.upper", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Cheeks"
              value={getCurrentValue("sliders.cosmetics.cheeks", character)}
              onChange={(value) => {
                updateState("sliders.cosmetics.cheeks", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Eyeliner"
              value={getCurrentValue("sliders.cosmetics.eyeliner", character)}
              onChange={(value) => {
                updateState("sliders.cosmetics.eyeliner", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Lipstick"
              value={getCurrentValue("sliders.cosmetics.lipstick", character)}
              onChange={(value) => {
                updateState("sliders.cosmetics.lipstick", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Lower Color"
              value={getCurrentValue(
                "sliders.cosmetics.lower_color",
                character,
              )}
              onChange={(value) => {
                updateState("sliders.cosmetics.lower_color", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Upper Color"
              value={getCurrentValue(
                "sliders.cosmetics.upper_color",
                character,
              )}
              onChange={(value) => {
                updateState("sliders.cosmetics.upper_color", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Cheeks Color"
              value={getCurrentValue(
                "sliders.cosmetics.cheeks_color",
                character,
              )}
              onChange={(value) => {
                updateState("sliders.cosmetics.cheeks_color", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Eyeliner Color"
              value={getCurrentValue(
                "sliders.cosmetics.eyeliner_color",
                character,
              )}
              onChange={(value) => {
                updateState("sliders.cosmetics.eyeliner_color", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Lipstick Color"
              value={getCurrentValue(
                "sliders.cosmetics.lipstick_color",
                character,
              )}
              onChange={(value) => {
                updateState("sliders.cosmetics.lipstick_color", value);
              }}
            />
          </CharacterSection>

          <CharacterSection title="Tattoo/Mark/Eyepatch">
            <CharacterSubsectionEdit
              disabled={loading}
              title="Flip"
              value={getCurrentValue(
                "sliders.tattoo_mark_eyepatch.flip",
                character,
              )}
              onChange={(value) => {
                updateState("sliders.tattoo_mark_eyepatch.flip", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Angle"
              value={getCurrentValue(
                "sliders.tattoo_mark_eyepatch.angle",
                character,
              )}
              onChange={(value) => {
                updateState("sliders.tattoo_mark_eyepatch.angle", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Tattoo"
              value={getCurrentValue(
                "sliders.tattoo_mark_eyepatch.tattoo",
                character,
              )}
              onChange={(value) => {
                updateState("sliders.tattoo_mark_eyepatch.tattoo", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Eyepatch"
              value={getCurrentValue(
                "sliders.tattoo_mark_eyepatch.eyepatch",
                character,
              )}
              onChange={(value) => {
                updateState("sliders.tattoo_mark_eyepatch.eyepatch", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Vertical"
              value={getCurrentValue(
                "sliders.tattoo_mark_eyepatch.vertical",
                character,
              )}
              onChange={(value) => {
                updateState("sliders.tattoo_mark_eyepatch.vertical", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Expansion"
              value={getCurrentValue(
                "sliders.tattoo_mark_eyepatch.expansion",
                character,
              )}
              onChange={(value) => {
                updateState("sliders.tattoo_mark_eyepatch.expansion", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Horizontal"
              value={getCurrentValue(
                "sliders.tattoo_mark_eyepatch.horizontal",
                character,
              )}
              onChange={(value) => {
                updateState("sliders.tattoo_mark_eyepatch.horizontal", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Tattoo Color"
              value={getCurrentValue(
                "sliders.tattoo_mark_eyepatch.tattoo_color",
                character,
              )}
              onChange={(value) => {
                updateState("sliders.tattoo_mark_eyepatch.tattoo_color", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Eyepatch Color"
              value={getCurrentValue(
                "sliders.tattoo_mark_eyepatch.eyepatch_color",
                character,
              )}
              onChange={(value) => {
                updateState(
                  "sliders.tattoo_mark_eyepatch.eyepatch_color",
                  value,
                );
              }}
            />
          </CharacterSection>

          <CharacterSection title="Body">
            <CharacterSubsectionEdit
              disabled={loading}
              title="Arms"
              value={getCurrentValue("sliders.body.arms", character)}
              onChange={(value) => {
                updateState("sliders.body.arms", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Head"
              value={getCurrentValue("sliders.body.head", character)}
              onChange={(value) => {
                updateState("sliders.body.head", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Legs"
              value={getCurrentValue("sliders.body.legs", character)}
              onChange={(value) => {
                updateState("sliders.body.legs", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Chest"
              value={getCurrentValue("sliders.body.chest", character)}
              onChange={(value) => {
                updateState("sliders.body.chest", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Muscle"
              value={getCurrentValue("sliders.body.muscle", character)}
              values={["Standard", "Muscular"]}
              onChange={(value) => {
                updateState("sliders.body.muscle", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Abdomen"
              value={getCurrentValue("sliders.body.abdomen", character)}
              onChange={(value) => {
                updateState("sliders.body.abdomen", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Body Hair"
              value={getCurrentValue("sliders.body.body_hair", character)}
              onChange={(value) => {
                updateState("sliders.body.body_hair", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Body Hair Color"
              value={getCurrentValue("sliders.body.body_hair_color", character)}
              onChange={(value) => {
                updateState("sliders.body.body_hair_color", value);
              }}
            />
          </CharacterSection>
        </section>
      </article>
    </>
  );
}