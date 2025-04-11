import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { BaseCharacter, CreateCharacter } from "@/lib/types";
import { ChangeEvent, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ExternalLinkIcon, UploadIcon } from "lucide-react";
import {
  createFileRoute,
  redirect,
  useBlocker,
  useRouter,
} from "@tanstack/react-router";
import { mapFromEldenBling, mapToCreateCharacter } from "@/lib/character";

import { Button } from "@/components/ui/button";
import { CharacterLimitInput } from "@/components/ui/input-limit";
import CharacterSection from "@/components/characters/character-section";
import CharacterSubsectionEdit from "@/components/characters/edit/character-subsection-edit";
import { DialogClose } from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { capitalize } from "@/lib/string";
import { createCharacter } from "@/services/characters";
import { toast } from "sonner";
import usePartialState from "@/hooks/use-partial-state";

export const Route = createFileRoute("/_authenticated/create")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    const { user } = context.authentication;

    if (!user?.emailVerified) {
      throw redirect({
        to: "/verify-email",
      });
    }
  },
  loader: async () => {
    const character: CreateCharacter = {
      name: "",
      description: "",
      image_url: "",
      sliders: {
        base: {
          age: "Young",
          body_type: "A",
          voice: "Young 1",
        },
        body: {
          head: 0,
          chest: 0,
          abdomen: 0,
          arms: 0,
          legs: 0,
          body_hair: 0,
          body_hair_color: {
            r: 0,
            g: 0,
            b: 0,
          },
          muscle: "Standard",
        },
        face_template: {
          structure: 0,
          emphasis: 0,
          age: 0,
          aesthetic: 0,
        },
        brow_ridge: {
          inner: 0,
          outer: 0,
          height: 0,
        },
        cheeks: {
          height: 0,
          depth: 0,
          width: 0,
          protrusion: 0,
          cheeks: 0,
        },
        chin: {
          tip: 0,
          length: 0,
          protrusion: 0,
          depth: 0,
          size: 0,
          height: 0,
          width: 0,
        },
        cosmetics: {
          eyeliner: 0,
          eyeliner_color: {
            r: 0,
            g: 0,
            b: 0,
          },
          upper: 0,
          upper_color: {
            r: 0,
            g: 0,
            b: 0,
          },
          lower: 0,
          lower_color: {
            r: 0,
            g: 0,
            b: 0,
          },
          cheeks: 0,
          cheeks_color: {
            r: 0,
            g: 0,
            b: 0,
          },
          lipstick: 0,
          lipstick_color: {
            r: 0,
            g: 0,
            b: 0,
          },
        },
        eyebrows: {
          eyebrows: 0,
          color: {
            r: 0,
            g: 0,
            b: 0,
          },
          white: 0,
        },
        eyelashes: {
          lashes: 0,
          color: {
            r: 0,
            g: 0,
            b: 0,
          },
        },
        eyes: {
          size: 0,
          slant: 0,
          spacing: 0,
          position: 0,
        },
        face_balance: {
          size: 0,
          vert: 0,
          horiz: 0,
          ratio: 0,
          slant: 0,
          protrusion: 0,
        },
        facial_hair: {
          beard: 0,
          color: {
            r: 0,
            g: 0,
            b: 0,
          },
          luster: 0,
          roots: 0,
          white: 0,
          stubble: 0,
        },
        forehead: {
          depth: 0,
          prot1: 0,
          prot2: 0,
          width: 0,
          height: 0,
          protrusion: 0,
        },
        hair: {
          hair: 0,
          color: {
            r: 0,
            g: 0,
            b: 0,
          },
          luster: 0,
          roots: 0,
          white: 0,
        },
        jaw: {
          lower: 0,
          width: 0,
          contour: 0,
          protrusion: 0,
        },
        left_eye: {
          position: 0,
          iris_size: 0,
          iris_color: {
            r: 0,
            g: 0,
            b: 0,
          },
          white_color: {
            r: 0,
            g: 0,
            b: 0,
          },
          clouding_color: {
            r: 0,
            g: 0,
            b: 0,
          },
          clouding: 0,
        },
        lips: {
          size: 0,
          shape: 0,
          fullness: 0,
          thickness: 0,
          expression: 0,
          protrusion: 0,
        },
        mouth: {
          slant: 0,
          width: 0,
          distance: 0,
          position: 0,
          occlusion: 0,
          protrusion: 0,
        },
        nostrils: {
          size: 0,
          slant: 0,
          width: 0,
        },
        nose_ridge: {
          depth: 0,
          slant: 0,
          height: 0,
          length: 0,
          position: 0,
          protrusion: 0,
          tip_height: 0,
        },
        right_eye: {
          clouding_color: {
            r: 0,
            g: 0,
            b: 0,
          },
          iris_color: {
            r: 0,
            g: 0,
            b: 0,
          },
          iris_size: 0,
          position: 0,
          white_color: {
            r: 0,
            g: 0,
            b: 0,
          },
          clouding: 0,
        },
        skin_color: {
          r: 0,
          g: 0,
          b: 0,
        },
        skin_feature: {
          dark_circles: 0,
          dark_circles_color: {
            r: 0,
            g: 0,
            b: 0,
          },
          luster: 0,
          pores: 0,
        },
        tattoo_mark_eyepatch: {
          tattoo: 0,
          eyepatch: 0,
          tattoo_color: {
            r: 0,
            g: 0,
            b: 0,
          },
          angle: 0,
          expansion: 0,
          eyepatch_color: {
            r: 0,
            g: 0,
            b: 0,
          },
          flip: false,
          horizontal: 0,
          vertical: 0,
        },
      },
    };

    return { character };
  },
});

function RouteComponent() {
  // const [character, setCharacter] = useState(Route.useLoaderData().character);

  let { character } = Route.useLoaderData();
  const router = useRouter();
  const [confirmResetOpenDialog, setConfirmResetOpenDialog] =
    useState<boolean>();

  const [loading, setLoading] = useState<boolean>(false);

  const {
    partialState,
    updateState,
    getCurrentValue,
    resetState,
    hasChanges,
    mergedState,
    setPartialState,
  } = usePartialState<CreateCharacter>(character);

  useBlocker({
    shouldBlockFn: () => {
      if (!hasChanges) return false;

      const shouldLeave = confirm(
        "You have unsaved changes. Are you sure you want to leave?",
      );

      return !shouldLeave;
    },
  });

  function extractPathFromError(errorMessage: string): string | null {
    const match = errorMessage.match(/at\s"([^"]+)"/);
    return match ? match[1] : null;
  }

  function uploadFromJson() {
    const input = document.createElement("input");
    input.type = "file";

    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];

      if (!file) return;
      try {
        const reader = new FileReader();
        reader.readAsText(file, "UTF-8");

        reader.onerror = () => {
          toast.error("Error reading file");
        };

        reader.onload = (e) => {
          const content = e.target!.result;
          const jsonString = JSON.parse(content as string);
          character = mapToCreateCharacter(jsonString);

          setPartialState(character);
        };
      } catch (error: any) {
        toast.error("Invalid JSON file", {
          description: error.message,
        });

        console.error(error);

        return;
      }
    };

    input.click();
  }

  async function handleSave() {
    if (!hasChanges) {
      toast.info("No changes to save");
      return;
    }

    if (!mergedState.name) {
      toast.error("Character name is required");
      return;
    }

    setLoading(true);

    function sendSave(): Promise<BaseCharacter> {
      return new Promise((resolve, reject) => {
        createCharacter(mergedState)
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    }

    console.log("Saving character", mergedState);
    

    toast.promise(sendSave, {
      loading: "Creating character...",
      success: (data) => {
        router.navigate({
          to: "/character/$id",
          params: { id: data.id },
          ignoreBlocker: true,
          resetScroll: true,
        });

        return "Character created successfully";
      },
      error: (error) => {
        let errorMessage = "An unexpected error occurred";

        if (error.errors?.[0]?.extensions?.code === "BAD_USER_INPUT") {
          const path = extractPathFromError(
            error.errors[0].extensions.originalError.message,
          );
          console.log(path);
        } else if (error.errors?.[0]?.extensions?.originalError?.message) {
          errorMessage = error.errors[0].extensions.originalError.message;
          console.log("1", errorMessage);
        } else if (error.response?.errors?.[0]?.message) {
          errorMessage = error.response.errors[0].message;
          console.log("2", errorMessage);
        } else if (error.message) {
          errorMessage = error.message;
          console.log("3", errorMessage);
        }

        return errorMessage;
      },
      finally: () => {
        setLoading(false);
      },
    });
  }

  const [eldenBlingOpenDialog, setEldenBlingOpenDialog] = useState(false);

  function onEldenBlingSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    try {
      const textarea = event.currentTarget.querySelector(
        "textarea",
      ) as HTMLTextAreaElement;
      const character = mapFromEldenBling(JSON.parse(textarea.value));

      setPartialState(character);

      textarea.value = "";

      setEldenBlingOpenDialog(false);
    } catch (error) {
      toast.error("Invalid Elden Bling JSON", {
        description: capitalize(error.message),
      });

      console.error(error);
      return;
    }
  }

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
              }}
            >
              Reset
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog
        onOpenChange={setEldenBlingOpenDialog}
        open={eldenBlingOpenDialog}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Paste your Elden Bling JSON here</DialogTitle>
            <DialogDescription>
              This will overwrite your current character.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={onEldenBlingSubmit} id="elden_bling_form">
            <Textarea
              placeholder="Paste your Elden Bling JSON here"
              className="h-32 w-full"
              id="elden_bling_json"
              required
            />
          </form>
          <DialogFooter>
            <Button form="elden_bling_form" type="submit">
              Submit
            </Button>
            <DialogClose asChild>
              <Button variant="destructive">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <article className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-8">
        <section className="sticky top-0 z-10 flex w-full items-center justify-end space-x-2 px-4 py-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>Options</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => {
                  uploadFromJson();
                }}
              >
                <UploadIcon />
                Upload from JSON
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setEldenBlingOpenDialog(true);
                }}
              >
                <ExternalLinkIcon />
                Upload from Elden Bling
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            className="cursor-pointer"
            variant="destructive"
            disabled={loading}
            onClick={() => {
              router.navigate({
                to: "/sliders",
                resetScroll: true,
              });
            }}
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
            disabled={loading}
            className="cursor-pointer"
            variant="default"
            onClick={async () => {
              await handleSave();
            }}
          >
            Save
          </Button>
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
              value={
                partialState.sliders?.jaw?.lower || character.sliders.jaw.lower
              }
              onChange={(value) => {
                updateState("sliders.jaw.lower", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Width"
              value={
                partialState.sliders?.jaw?.width || character.sliders.jaw.width
              }
              onChange={(value) => {
                updateState("sliders.jaw.width", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Contour"
              value={
                partialState.sliders?.jaw?.contour ||
                character.sliders.jaw.contour
              }
              onChange={(value) => {
                updateState("sliders.jaw.contour", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Protrusion"
              value={
                partialState.sliders?.jaw?.protrusion ||
                character.sliders.jaw.protrusion
              }
              onChange={(value) => {
                updateState("sliders.jaw.protrusion", value);
              }}
            />
          </CharacterSection>

          <CharacterSection title="Eyebrows">
            <CharacterSubsectionEdit
              disabled={loading}
              title="Color"
              value={
                partialState.sliders?.eyebrows?.color ||
                character.sliders.eyebrows.color
              }
              onChange={(value) => {
                updateState("sliders.eyebrows.color", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="White"
              value={
                partialState.sliders?.eyebrows?.white ||
                character.sliders.eyebrows.white
              }
              onChange={(value) => {
                updateState("sliders.eyebrows.white", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Eyebrows"
              value={
                partialState.sliders?.eyebrows?.eyebrows ||
                character.sliders.eyebrows.eyebrows
              }
              onChange={(value) => {
                updateState("sliders.eyebrows.eyebrows", value);
              }}
            />
          </CharacterSection>

          <CharacterSection title="Facial Hair">
            <CharacterSubsectionEdit
              disabled={loading}
              title="Beard"
              value={
                partialState.sliders?.facial_hair?.beard ||
                character.sliders.facial_hair.beard
              }
              onChange={(value) => {
                updateState("sliders.facial_hair.beard", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Color"
              value={
                partialState.sliders?.facial_hair?.color ||
                character.sliders.facial_hair.color
              }
              onChange={(value) => {
                updateState("sliders.facial_hair.color", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Roots"
              value={
                partialState.sliders?.facial_hair?.roots ||
                character.sliders.facial_hair.roots
              }
              onChange={(value) => {
                updateState("sliders.facial_hair.roots", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="White"
              value={
                partialState.sliders?.facial_hair?.white ||
                character.sliders.facial_hair.white
              }
              onChange={(value) => {
                updateState("sliders.facial_hair.white", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Luster"
              value={
                partialState.sliders?.facial_hair?.luster ||
                character.sliders.facial_hair.luster
              }
              onChange={(value) => {
                updateState("sliders.facial_hair.luster", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Stubble"
              value={
                partialState.sliders?.facial_hair?.stubble ||
                character.sliders.facial_hair.stubble
              }
              onChange={(value) => {
                updateState("sliders.facial_hair.stubble", value);
              }}
            />
          </CharacterSection>

          <CharacterSection title="Eyelashes">
            <CharacterSubsectionEdit
              disabled={loading}
              title="Color"
              value={
                partialState.sliders?.eyelashes?.color ||
                character.sliders.eyelashes.color
              }
              onChange={(value) => {
                updateState("sliders.eyelashes.color", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Lashes"
              value={
                partialState.sliders?.eyelashes?.lashes ||
                character.sliders.eyelashes.lashes
              }
              onChange={(value) => {
                updateState("sliders.eyelashes.lashes", value);
              }}
            />
          </CharacterSection>

          <CharacterSection title="Right Eye">
            <CharacterSubsectionEdit
              disabled={loading}
              title="Position"
              value={
                partialState.sliders?.right_eye?.position ||
                character.sliders.right_eye.position
              }
              onChange={(value) => {
                updateState("sliders.right_eye.position", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Iris Size"
              value={
                partialState.sliders?.right_eye?.iris_size ||
                character.sliders.right_eye.iris_size
              }
              onChange={(value) => {
                updateState("sliders.right_eye.iris_size", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Iris Color"
              value={
                partialState.sliders?.right_eye?.iris_color ||
                character.sliders.right_eye.iris_color
              }
              onChange={(value) => {
                updateState("sliders.right_eye.iris_color", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="White Color"
              value={
                partialState.sliders?.right_eye?.white_color ||
                character.sliders.right_eye.white_color
              }
              onChange={(value) => {
                updateState("sliders.right_eye.white_color", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Clouding Color"
              value={
                partialState.sliders?.right_eye?.clouding_color ||
                character.sliders.right_eye.clouding_color
              }
              onChange={(value) => {
                updateState("sliders.right_eye.clouding_color", value);
              }}
            />

            <CharacterSubsectionEdit
              disabled={loading}
              title="Clouding"
              value={
                partialState.sliders?.right_eye?.clouding ||
                character.sliders.right_eye.clouding
              }
              onChange={(value) => {
                updateState("sliders.right_eye.clouding", value);
              }}
            />
          </CharacterSection>

          <CharacterSection title="Left Eye">
            <CharacterSubsectionEdit
              disabled={loading}
              title="Position"
              value={
                partialState.sliders?.left_eye?.position ||
                character.sliders.left_eye.position
              }
              onChange={(value) => {
                updateState("sliders.left_eye.position", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Iris Size"
              value={
                partialState.sliders?.left_eye?.iris_size ||
                character.sliders.left_eye.iris_size
              }
              onChange={(value) => {
                updateState("sliders.left_eye.iris_size", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Iris Color"
              value={
                partialState.sliders?.left_eye?.iris_color ||
                character.sliders.left_eye.iris_color
              }
              onChange={(value) => {
                updateState("sliders.left_eye.iris_color", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="White Color"
              value={
                partialState.sliders?.left_eye?.white_color ||
                character.sliders.left_eye.white_color
              }
              onChange={(value) => {
                updateState("sliders.left_eye.white_color", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Clouding Color"
              value={
                partialState.sliders?.left_eye?.clouding_color ||
                character.sliders.left_eye.clouding_color
              }
              onChange={(value) => {
                updateState("sliders.left_eye.clouding_color", value);
              }}
            />

            <CharacterSubsectionEdit
              disabled={loading}
              title="Clouding"
              value={
                partialState.sliders?.left_eye?.clouding ||
                character.sliders.left_eye.clouding
              }
              onChange={(value) => {
                updateState("sliders.left_eye.clouding", value);
              }}
            />
          </CharacterSection>

          <CharacterSection title="Skin Feature">
            <CharacterSubsectionEdit
              disabled={loading}
              title="Pores"
              value={
                partialState.sliders?.skin_feature?.pores ||
                character.sliders.skin_feature.pores
              }
              onChange={(value) => {
                updateState("sliders.skin_feature.pores", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Luster"
              value={
                partialState.sliders?.skin_feature?.luster ||
                character.sliders.skin_feature.luster
              }
              onChange={(value) => {
                updateState("sliders.skin_feature.luster", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Dark Circles"
              value={
                partialState.sliders?.skin_feature?.dark_circles ||
                character.sliders.skin_feature.dark_circles
              }
              onChange={(value) => {
                updateState("sliders.skin_feature.dark_circles", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Dark Circles Color"
              value={
                partialState.sliders?.skin_feature?.dark_circles_color ||
                character.sliders.skin_feature.dark_circles_color
              }
              onChange={(value) => {
                updateState("sliders.skin_feature.dark_circles_color", value);
              }}
            />
          </CharacterSection>

          <CharacterSection title="Cosmetics">
            <CharacterSubsectionEdit
              disabled={loading}
              title="Lower"
              value={
                partialState.sliders?.cosmetics?.lower ||
                character.sliders.cosmetics.lower
              }
              onChange={(value) => {
                updateState("sliders.cosmetics.lower", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Upper"
              value={
                partialState.sliders?.cosmetics?.upper ||
                character.sliders.cosmetics.upper
              }
              onChange={(value) => {
                updateState("sliders.cosmetics.upper", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Cheeks"
              value={
                partialState.sliders?.cosmetics?.cheeks ||
                character.sliders.cosmetics.cheeks
              }
              onChange={(value) => {
                updateState("sliders.cosmetics.cheeks", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Eyeliner"
              value={
                partialState.sliders?.cosmetics?.eyeliner ||
                character.sliders.cosmetics.eyeliner
              }
              onChange={(value) => {
                updateState("sliders.cosmetics.eyeliner", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Lipstick"
              value={
                partialState.sliders?.cosmetics?.lipstick ||
                character.sliders.cosmetics.lipstick
              }
              onChange={(value) => {
                updateState("sliders.cosmetics.lipstick", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Lower Color"
              value={
                partialState.sliders?.cosmetics?.lower_color ||
                character.sliders.cosmetics.lower_color
              }
              onChange={(value) => {
                updateState("sliders.cosmetics.lower_color", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Upper Color"
              value={
                partialState.sliders?.cosmetics?.upper_color ||
                character.sliders.cosmetics.upper_color
              }
              onChange={(value) => {
                updateState("sliders.cosmetics.upper_color", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Cheeks Color"
              value={
                partialState.sliders?.cosmetics?.cheeks_color ||
                character.sliders.cosmetics.cheeks_color
              }
              onChange={(value) => {
                updateState("sliders.cosmetics.cheeks_color", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Eyeliner Color"
              value={
                partialState.sliders?.cosmetics?.eyeliner_color ||
                character.sliders.cosmetics.eyeliner_color
              }
              onChange={(value) => {
                updateState("sliders.cosmetics.eyeliner_color", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Lipstick Color"
              value={
                partialState.sliders?.cosmetics?.lipstick_color ||
                character.sliders.cosmetics.lipstick_color
              }
              onChange={(value) => {
                updateState("sliders.cosmetics.lipstick_color", value);
              }}
            />
          </CharacterSection>

          <CharacterSection title="Tattoo/Mark/Eyepatch">
            <CharacterSubsectionEdit
              disabled={loading}
              title="Flip"
              value={
                partialState.sliders?.tattoo_mark_eyepatch?.flip ||
                character.sliders.tattoo_mark_eyepatch.flip
              }
              onChange={(value) => {
                updateState("sliders.tattoo_mark_eyepatch.flip", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Angle"
              value={
                partialState.sliders?.tattoo_mark_eyepatch?.angle ||
                character.sliders.tattoo_mark_eyepatch.angle
              }
              onChange={(value) => {
                updateState("sliders.tattoo_mark_eyepatch.angle", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Tattoo"
              value={
                partialState.sliders?.tattoo_mark_eyepatch?.tattoo ||
                character.sliders.tattoo_mark_eyepatch.tattoo
              }
              onChange={(value) => {
                updateState("sliders.tattoo_mark_eyepatch.tattoo", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Eyepatch"
              value={
                partialState.sliders?.tattoo_mark_eyepatch?.eyepatch ||
                character.sliders.tattoo_mark_eyepatch.eyepatch
              }
              onChange={(value) => {
                updateState("sliders.tattoo_mark_eyepatch.eyepatch", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Vertical"
              value={
                partialState.sliders?.tattoo_mark_eyepatch?.vertical ||
                character.sliders.tattoo_mark_eyepatch.vertical
              }
              onChange={(value) => {
                updateState("sliders.tattoo_mark_eyepatch.vertical", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Expansion"
              value={
                partialState.sliders?.tattoo_mark_eyepatch?.expansion ||
                character.sliders.tattoo_mark_eyepatch.expansion
              }
              onChange={(value) => {
                updateState("sliders.tattoo_mark_eyepatch.expansion", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Horizontal"
              value={
                partialState.sliders?.tattoo_mark_eyepatch?.horizontal ||
                character.sliders.tattoo_mark_eyepatch.horizontal
              }
              onChange={(value) => {
                updateState("sliders.tattoo_mark_eyepatch.horizontal", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Tattoo Color"
              value={
                partialState.sliders?.tattoo_mark_eyepatch?.tattoo_color ||
                character.sliders.tattoo_mark_eyepatch.tattoo_color
              }
              onChange={(value) => {
                updateState("sliders.tattoo_mark_eyepatch.tattoo_color", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Eyepatch Color"
              value={
                partialState.sliders?.tattoo_mark_eyepatch?.eyepatch_color ||
                character.sliders.tattoo_mark_eyepatch.eyepatch_color
              }
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
              value={
                partialState.sliders?.body?.arms || character.sliders.body.arms
              }
              onChange={(value) => {
                updateState("sliders.body.arms", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Head"
              value={
                partialState.sliders?.body?.head || character.sliders.body.head
              }
              onChange={(value) => {
                updateState("sliders.body.head", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Legs"
              value={
                partialState.sliders?.body?.legs || character.sliders.body.legs
              }
              onChange={(value) => {
                updateState("sliders.body.legs", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Chest"
              value={
                partialState.sliders?.body?.chest ||
                character.sliders.body.chest
              }
              onChange={(value) => {
                updateState("sliders.body.chest", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Muscle"
              value={
                partialState.sliders?.body?.muscle ||
                character.sliders.body.muscle
              }
              values={["Standard", "Muscular"]}
              onChange={(value) => {
                updateState("sliders.body.muscle", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Abdomen"
              value={
                partialState.sliders?.body?.abdomen ||
                character.sliders.body.abdomen
              }
              onChange={(value) => {
                updateState("sliders.body.abdomen", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Body Hair"
              value={
                partialState.sliders?.body?.body_hair ||
                character.sliders.body.body_hair
              }
              onChange={(value) => {
                updateState("sliders.body.body_hair", value);
              }}
            />
            <CharacterSubsectionEdit
              disabled={loading}
              title="Body Hair Color"
              value={
                partialState.sliders?.body?.body_hair_color ||
                character.sliders.body.body_hair_color
              }
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
