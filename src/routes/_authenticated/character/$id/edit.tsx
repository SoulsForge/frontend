import {
  createFileRoute,
  redirect,
  useBlocker,
  useRouter,
} from "@tanstack/react-router";
import { getCharacterById, updateCharacterById } from "@/services/characters";

import { BaseCharacter } from "@/lib/types";
import CharacterForm from "@/components/characters/character-form";
import { toast } from "sonner";
import usePartialState from "@/hooks/use-partial-state";
import { useState } from "react";

export const Route = createFileRoute("/_authenticated/character/$id/edit")({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    const { user } = context.authentication;
    const { id } = params;

    if (!user) {
      throw redirect({ to: "/login" });
    }

    const character = await getCharacterById(id);

    if (character.user.id !== user.id) {
      throw redirect({ to: `/character/$id`, params: { id } });
    }

    return { character };
  },
});

function RouteComponent() {
  const { character } = Route.useLoaderData();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const partialStateHook = usePartialState<BaseCharacter>(character);
  const { hasChanges, mergedState } = partialStateHook;

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

  async function handleSave() {
    if (!hasChanges) {
      toast.info("No changes to save");
      return;
    }

    setLoading(true);

    function sendSave(): Promise<BaseCharacter> {
      return new Promise((resolve, reject) => {
        updateCharacterById(character.id, mergedState)
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    }

    toast.promise(sendSave, {
      loading: "Saving character...",
      success: (data) => {
        router.navigate({
          to: "/character/$id",
          params: { id: data.id },
          ignoreBlocker: true,
          resetScroll: true,
        });

        return "Character saved successfully";
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
        } else if (error.response?.errors?.[0]?.message) {
          errorMessage = error.response.errors[0].message;
        } else if (error.message) {
          errorMessage = error.message;
        }

        return errorMessage;
      },
      finally: () => {
        setLoading(false);
      },
    });
  }

  return (
    <CharacterForm
      character={character}
      partialStateHook={partialStateHook}
      loading={loading}
      onSave={handleSave}
      onCancel={() => {
        router.navigate({
          to: "/character/$id",
          params: { id: character.id },
          resetScroll: true,
        });
      }}
      onReset={() => {
        console.log("reset");
      }}
      title="Edit Character"
    />
  );
}
