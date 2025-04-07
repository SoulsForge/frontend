import { Link, createFileRoute } from "@tanstack/react-router";

import CharacterSection from "@/components/characters/character-section";
import CharacterSubsection from "@/components/characters/character-subsection";
import { Button } from "@/components/ui/button";
import { getCharacterById } from "@/services/characters";

export const Route = createFileRoute("/character/$id")({
  component: RouteComponent,
  loader: async ({ params, context }) => {
    const { id } = params;
    const { user } = context.authentication;

    if (!id) {
      throw new Error("ID is required");
    }

    const character = await getCharacterById(id);

    const isOwner = user?.id === character.user.id;

    return { character, isOwner };
  },
});

function RouteComponent() {
  const { character, isOwner } = Route.useLoaderData();

  return (
    <article className="flex flex-col gap-4">
      <section className="mt-8 flex w-full flex-row items-start justify-around">
        <div className="flex w-full flex-col items-start justify-start">
          <h1 className="mt-0 font-bold text-4xl">{character.name}</h1>
          <h3 className="mt-0 text-2xl">{character.game.name}</h3>
        </div>

        {isOwner && (
          <Button asChild variant="default">
            <Link
              to={`/character/$id/edit`}
              params={{
                id: character.id,
              }}
              preload={"intent"}
            >
              Edit
            </Link>
          </Button>
        )}
      </section>
      <section className="flex w-full flex-col items-center justify-center">
        <figure className="w-full">
          <img
            className="mx-auto h-[500px] w-full rounded-lg object-contain shadow-lg"
            src={character.image_url}
            alt={character.name}
          />
          <figcaption className="mt-4 text-left">
            <p className="text-gray-500 text-sm">
              Created by{" "}
              {isOwner ? (
                <Button asChild variant="link" className="mx-0 px-0">
                  <Link to="/sliders">you</Link>
                </Button>
              ) : (
                <Button asChild variant="link" className="mx-0 px-0">
                  <Link
                    to="/$username"
                    params={{ username: character.user.username }}
                  >
                    {character.user.username}
                  </Link>
                </Button>
              )}
            </p>
          </figcaption>
        </figure>
      </section>

      <section className="mt-8 flex w-full flex-col items-start">
        <h2 className="mt-8 font-bold text-[2rem]">Description</h2>
        <p className="mt-4 text-lg">{character.description}</p>
      </section>

      <section className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-0.5 gap-y-2 lg:flex lg:flex-wrap">
        <CharacterSection title="Base">
          <CharacterSubsection title="Age" value={character.sliders.base.age} />
          <CharacterSubsection
            title="Voice"
            value={character.sliders.base.voice}
          />
          <CharacterSubsection
            title="Type"
            value={character.sliders.base.body_type}
          />
          <CharacterSubsection
            title="Skin Color"
            value={character.sliders.skin_color}
          />
        </CharacterSection>

        <CharacterSection title="Face Template">
          <CharacterSubsection
            title="Age"
            value={character.sliders.face_template.age}
          />
          <CharacterSubsection
            title="Emphasis"
            value={character.sliders.face_template.emphasis}
          />
          <CharacterSubsection
            title="Aesthetic"
            value={character.sliders.face_template.aesthetic}
          />
          <CharacterSubsection
            title="Structure"
            value={character.sliders.face_template.structure}
          />
        </CharacterSection>

        <CharacterSection title="Face Balance">
          <CharacterSubsection
            title="Size"
            value={character.sliders.face_balance.size}
          />
          <CharacterSubsection
            title="Vertical"
            value={character.sliders.face_balance.vert}
          />
          <CharacterSubsection
            title="Horizontal"
            value={character.sliders.face_balance.horiz}
          />
          <CharacterSubsection
            title="Ratio"
            value={character.sliders.face_balance.ratio}
          />
          <CharacterSubsection
            title="Slant"
            value={character.sliders.face_balance.slant}
          />
          <CharacterSubsection
            title="Protrusion"
            value={character.sliders.face_balance.protrusion}
          />
        </CharacterSection>

        <CharacterSection title="Forehead">
          <CharacterSubsection
            title="Depth"
            value={character.sliders.forehead.depth}
          />
          <CharacterSubsection
            title="Prot1"
            value={character.sliders.forehead.prot1}
          />
          <CharacterSubsection
            title="Prot2"
            value={character.sliders.forehead.prot2}
          />
          <CharacterSubsection
            title="Width"
            value={character.sliders.forehead.width}
          />
          <CharacterSubsection
            title="Height"
            value={character.sliders.forehead.height}
          />
          <CharacterSubsection
            title="Protrusion"
            value={character.sliders.forehead.protrusion}
          />
        </CharacterSection>

        <CharacterSection title="Brow Ridge">
          <CharacterSubsection
            title="Inner"
            value={character.sliders.brow_ridge.inner}
          />
          <CharacterSubsection
            title="Outer"
            value={character.sliders.brow_ridge.outer}
          />
          <CharacterSubsection
            title="Height"
            value={character.sliders.brow_ridge.height}
          />
        </CharacterSection>

        <CharacterSection title="Eyes">
          <CharacterSubsection
            title="Size"
            value={character.sliders.eyes.size}
          />
          <CharacterSubsection
            title="Slant"
            value={character.sliders.eyes.slant}
          />
          <CharacterSubsection
            title="Spacing"
            value={character.sliders.eyes.spacing}
          />
          <CharacterSubsection
            title="Position"
            value={character.sliders.eyes.position}
          />
        </CharacterSection>

        <CharacterSection title="Nose Ridge">
          <CharacterSubsection
            title="Depth"
            value={character.sliders.nose_ridge.depth}
          />
          <CharacterSubsection
            title="Slant"
            value={character.sliders.nose_ridge.slant}
          />
          <CharacterSubsection
            title="Height"
            value={character.sliders.nose_ridge.height}
          />
          <CharacterSubsection
            title="Length"
            value={character.sliders.nose_ridge.length}
          />
          <CharacterSubsection
            title="Position"
            value={character.sliders.nose_ridge.position}
          />
          <CharacterSubsection
            title="Protrusion"
            value={character.sliders.nose_ridge.protrusion}
          />
          <CharacterSubsection
            title="Tip Height"
            value={character.sliders.nose_ridge.tip_height}
          />
        </CharacterSection>

        <CharacterSection title="Nostrils">
          <CharacterSubsection
            title="Size"
            value={character.sliders.nostrils.size}
          />
          <CharacterSubsection
            title="Slant"
            value={character.sliders.nostrils.slant}
          />
          <CharacterSubsection
            title="Width"
            value={character.sliders.nostrils.width}
          />
        </CharacterSection>

        <CharacterSection title="Cheeks">
          <CharacterSubsection
            title="Depth"
            value={character.sliders.cheeks.depth}
          />
          <CharacterSubsection
            title="Width"
            value={character.sliders.cheeks.width}
          />
          <CharacterSubsection
            title="Cheeks"
            value={character.sliders.cheeks.cheeks}
          />
          <CharacterSubsection
            title="Height"
            value={character.sliders.cheeks.height}
          />
          <CharacterSubsection
            title="Protrusion"
            value={character.sliders.cheeks.protrusion}
          />
        </CharacterSection>

        <CharacterSection title="Lips">
          <CharacterSubsection
            title="Size"
            value={character.sliders.lips.size}
          />
          <CharacterSubsection
            title="Shape"
            value={character.sliders.lips.shape}
          />
          <CharacterSubsection
            title="Fullness"
            value={character.sliders.lips.fullness}
          />
          <CharacterSubsection
            title="Thickness"
            value={character.sliders.lips.thickness}
          />
          <CharacterSubsection
            title="Expression"
            value={character.sliders.lips.expression}
          />
          <CharacterSubsection
            title="Protrusion"
            value={character.sliders.lips.protrusion}
          />
        </CharacterSection>

        <CharacterSection title="Mouth">
          <CharacterSubsection
            title="Slant"
            value={character.sliders.mouth.slant}
          />
          <CharacterSubsection
            title="Width"
            value={character.sliders.mouth.width}
          />
          <CharacterSubsection
            title="Distance"
            value={character.sliders.mouth.distance}
          />
          <CharacterSubsection
            title="Position"
            value={character.sliders.mouth.position}
          />
          <CharacterSubsection
            title="Occlusion"
            value={character.sliders.mouth.occlusion}
          />
          <CharacterSubsection
            title="Protrusion"
            value={character.sliders.mouth.protrusion}
          />
        </CharacterSection>

        <CharacterSection title="Chin">
          <CharacterSubsection title="Tip" value={character.sliders.chin.tip} />
          <CharacterSubsection
            title="Size"
            value={character.sliders.chin.size}
          />
          <CharacterSubsection
            title="Depth"
            value={character.sliders.chin.depth}
          />
          <CharacterSubsection
            title="Width"
            value={character.sliders.chin.width}
          />
          <CharacterSubsection
            title="Height"
            value={character.sliders.chin.height}
          />
          <CharacterSubsection
            title="Length"
            value={character.sliders.chin.length}
          />
          <CharacterSubsection
            title="Protrusion"
            value={character.sliders.chin.protrusion}
          />
        </CharacterSection>

        <CharacterSection title="Jaw">
          <CharacterSubsection
            title="Lower"
            value={character.sliders.jaw.lower}
          />
          <CharacterSubsection
            title="Width"
            value={character.sliders.jaw.width}
          />
          <CharacterSubsection
            title="Contour"
            value={character.sliders.jaw.contour}
          />
          <CharacterSubsection
            title="Protrusion"
            value={character.sliders.jaw.protrusion}
          />
        </CharacterSection>

        <CharacterSection title="Jaw">
          <CharacterSubsection
            title="Lower"
            value={character.sliders.jaw.lower}
          />
          <CharacterSubsection
            title="Width"
            value={character.sliders.jaw.width}
          />
          <CharacterSubsection
            title="Contour"
            value={character.sliders.jaw.contour}
          />
          <CharacterSubsection
            title="Protrusion"
            value={character.sliders.jaw.protrusion}
          />
        </CharacterSection>

        <CharacterSection title="Eyebrows">
          <CharacterSubsection
            title="Color"
            value={character.sliders.eyebrows.color}
          />
          <CharacterSubsection
            title="White"
            value={character.sliders.eyebrows.white}
          />
          <CharacterSubsection
            title="Eyebrows"
            value={character.sliders.eyebrows.eyebrows}
          />
        </CharacterSection>

        <CharacterSection title="Facial Hair">
          <CharacterSubsection
            title="Beard"
            value={character.sliders.facial_hair.beard}
          />
          <CharacterSubsection
            title="Color"
            value={character.sliders.facial_hair.color}
          />
          <CharacterSubsection
            title="Roots"
            value={character.sliders.facial_hair.roots}
          />
          <CharacterSubsection
            title="White"
            value={character.sliders.facial_hair.white}
          />
          <CharacterSubsection
            title="Luster"
            value={character.sliders.facial_hair.luster}
          />
          <CharacterSubsection
            title="Stubble"
            value={character.sliders.facial_hair.stubble}
          />
        </CharacterSection>

        <CharacterSection title="Eyelashes">
          <CharacterSubsection
            title="Color"
            value={character.sliders.eyelashes.color}
          />
          <CharacterSubsection
            title="Lashes"
            value={character.sliders.eyelashes.lashes}
          />
        </CharacterSection>

        <CharacterSection title="Right Eye">
          <CharacterSubsection
            title="Position"
            value={character.sliders.right_eye.position}
          />
          <CharacterSubsection
            title="Iris Size"
            value={character.sliders.right_eye.iris_size}
          />
          <CharacterSubsection
            title="Iris Color"
            value={character.sliders.right_eye.iris_color}
          />
          <CharacterSubsection
            title="White Color"
            value={character.sliders.right_eye.white_color}
          />
          <CharacterSubsection
            title="Clouding Color"
            value={character.sliders.right_eye.clouding_color}
          />
        </CharacterSection>

        <CharacterSection title="Left Eye">
          <CharacterSubsection
            title="Position"
            value={character.sliders.left_eye.position}
          />
          <CharacterSubsection
            title="Iris Size"
            value={character.sliders.left_eye.iris_size}
          />
          <CharacterSubsection
            title="Iris Color"
            value={character.sliders.left_eye.iris_color}
          />
          <CharacterSubsection
            title="White Color"
            value={character.sliders.left_eye.white_color}
          />
          <CharacterSubsection
            title="Clouding Color"
            value={character.sliders.left_eye.clouding_color}
          />
        </CharacterSection>

        <CharacterSection title="Skin Feature">
          <CharacterSubsection
            title="Pores"
            value={character.sliders.skin_feature.pores}
          />
          <CharacterSubsection
            title="Luster"
            value={character.sliders.skin_feature.luster}
          />
          <CharacterSubsection
            title="Dark Circles"
            value={character.sliders.skin_feature.dark_circles}
          />
          <CharacterSubsection
            title="Dark Circles Color"
            value={character.sliders.skin_feature.dark_circles_color}
          />
        </CharacterSection>

        <CharacterSection title="Cosmetics">
          <CharacterSubsection
            title="Lower"
            value={character.sliders.cosmetics.lower}
          />
          <CharacterSubsection
            title="Upper"
            value={character.sliders.cosmetics.upper}
          />
          <CharacterSubsection
            title="Cheeks"
            value={character.sliders.cosmetics.cheeks}
          />
          <CharacterSubsection
            title="Eyeliner"
            value={character.sliders.cosmetics.eyeliner}
          />
          <CharacterSubsection
            title="Lipstick"
            value={character.sliders.cosmetics.lipstick}
          />
          <CharacterSubsection
            title="Lower Color"
            value={character.sliders.cosmetics.lower_color}
          />
          <CharacterSubsection
            title="Upper Color"
            value={character.sliders.cosmetics.upper_color}
          />
          <CharacterSubsection
            title="Cheeks Color"
            value={character.sliders.cosmetics.cheeks_color}
          />
          <CharacterSubsection
            title="Eyeliner Color"
            value={character.sliders.cosmetics.eyeliner_color}
          />
          <CharacterSubsection
            title="Lipstick Color"
            value={character.sliders.cosmetics.lipstick_color}
          />
        </CharacterSection>

        <CharacterSection title="Tattoo/Mark/Eyepatch">
          <CharacterSubsection
            title="Flip"
            value={character.sliders.tattoo_mark_eyepatch.flip}
          />
          <CharacterSubsection
            title="Angle"
            value={character.sliders.tattoo_mark_eyepatch.angle}
          />
          <CharacterSubsection
            title="Tattoo"
            value={character.sliders.tattoo_mark_eyepatch.tattoo}
          />
          <CharacterSubsection
            title="Eyepatch"
            value={character.sliders.tattoo_mark_eyepatch.eyepatch}
          />
          <CharacterSubsection
            title="Vertical"
            value={character.sliders.tattoo_mark_eyepatch.vertical}
          />
          <CharacterSubsection
            title="Expansion"
            value={character.sliders.tattoo_mark_eyepatch.expansion}
          />
          <CharacterSubsection
            title="Horizontal"
            value={character.sliders.tattoo_mark_eyepatch.horizontal}
          />
          <CharacterSubsection
            title="Tattoo Color"
            value={character.sliders.tattoo_mark_eyepatch.tattoo_color}
          />
          <CharacterSubsection
            title="Eyepatch Color"
            value={character.sliders.tattoo_mark_eyepatch.eyepatch_color}
          />
        </CharacterSection>

        <CharacterSection title="Body">
          <CharacterSubsection
            title="Arms"
            value={character.sliders.body.arms}
          />
          <CharacterSubsection
            title="Head"
            value={character.sliders.body.head}
          />
          <CharacterSubsection
            title="Legs"
            value={character.sliders.body.legs}
          />
          <CharacterSubsection
            title="Chest"
            value={character.sliders.body.chest}
          />
          <CharacterSubsection
            title="Muscle"
            value={character.sliders.body.muscle}
          />
          <CharacterSubsection
            title="Abdomen"
            value={character.sliders.body.abdomen}
          />
          <CharacterSubsection
            title="Body Hair"
            value={character.sliders.body.body_hair}
          />
          <CharacterSubsection
            title="Body Hair Color"
            value={character.sliders.body.body_hair_color}
          />
        </CharacterSection>
      </section>
    </article>
  );
}
