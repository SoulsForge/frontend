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
import CharacterForm from "@/components/characters/character-form";
import { DialogClose } from "@radix-ui/react-dialog";
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
  let { character } = Route.useLoaderData();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [eldenBlingOpenDialog, setEldenBlingOpenDialog] = useState(false);

  const partialStateHook = usePartialState<CreateCharacter>(character);
  const { setPartialState, hasChanges, mergedState } = partialStateHook;

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

  const headerContent = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Options</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={uploadFromJson}>
          <UploadIcon />
          Upload from JSON
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setEldenBlingOpenDialog(true)}>
          <ExternalLinkIcon />
          Upload from Elden Bling
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <>
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

      <CharacterForm
        character={character}
        partialStateHook={partialStateHook}
        loading={loading}
        onSave={handleSave}
        onCancel={() => {
          router.navigate({
            to: "/sliders",
            resetScroll: true,
          });
        }}
        onReset={() => {}}
        title="Create Character"
        headerContent={headerContent}
      />
    </>
  );
}
