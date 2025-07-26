import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Link, createFileRoute, useRouter } from "@tanstack/react-router";

import CharacterCard from "@/components/characters/ui/character-card";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui-custom/loader";
import { SubmitButton } from "@/components/ui-custom/submit-button";
import SummaryCharacter from "@/services/timeline/summary-character";
import { getSearchResults } from "@/services/search";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const searchParamsSchema = z.object({
  q: z.string().optional(),
});

export const Route = createFileRoute("/search")({
  component: RouteComponent,
  validateSearch: searchParamsSchema,
});

function RouteComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const [characters, setCharacters] = useState<SummaryCharacter[]>([]);
  const searchParams = Route.useSearch();
  const router = useRouter();
  const form = useForm<z.infer<typeof searchParamsSchema>>({
    resolver: zodResolver(searchParamsSchema),
    defaultValues: {
      q: searchParams.q ?? "",
    },
  });

  async function handleSearch(data: z.infer<typeof searchParamsSchema>) {
    setIsLoading(true);
    try {
      if (!data.q) {
        setCharacters([]);
        return;
      }

      const response = await getSearchResults(data.q);

      setCharacters(response);

      router.navigate({
        to: ".",
        search: {
          q: data.q,
        },
      });
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center flex-grow">
      <div className="w-full max-w-7xl mx-auto py-12 px-4 md:px-8">
        <Form {...form}>
          <form
            className="space-x-4 flex-row flex "
            onSubmit={form.handleSubmit(handleSearch)}
          >
            <FormField
              control={form.control}
              name="q"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Search for characters..."
                      className="w-full"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <SubmitButton
              type="submit"
              isSubmitting={isLoading}
              submittingText=""
            >
              Search
            </SubmitButton>
          </form>
        </Form>
      </div>

      <section className="mt-8 flex-grow">
        {isLoading ? (
          <Loader />
        ) : characters.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {characters.map((character) => (
              <Link
                to={`/character/$id`}
                params={{
                  id: character.id,
                }}
                className="flex h-full w-full flex-col items-center justify-center"
                key={character.id}
              >
                <CharacterCard
                  characterSummary={character}
                  className="w-full"
                />
              </Link>
            ))}
          </div>
        ) : (
          <p>No results found.</p>
        )}
      </section>
    </div>
  );
}
