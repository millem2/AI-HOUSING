import { createLazyFileRoute } from "@tanstack/react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { HStack, Stack, VStack } from "styled-system/jsx";
import { AnnonceItem } from "~/components/data-ui/annonceItem";
import { Button } from "~/components/ui/button";
import { FormLabel } from "~/components/ui/form-label";
import { Heading } from "~/components/ui/heading";
import { Textarea } from "~/components/ui/textarea";
import { useSearchbyText } from "~/features/searchByText";

export const Route = createLazyFileRoute("/")({
  component: SearchByText,
});

type Inputs = {
  description: string;
};

export function SearchByText() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    getValues,
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    searchByText.mutate(data);
    console.log(data);
  };

  const searchByText = useSearchbyText();
  // Filter the datas to show only the first 20
  // const exampleDatas = datas.slice(0, 40);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <HStack alignItems={"flex-end"}>
          <Stack gap="1.5" width="lg">
            <FormLabel htmlFor="description" fontWeight={"bold"}>
              Description
            </FormLabel>
            <Textarea id="description" rows={4} {...register("description", { required: true })} size={"lg"} />
            {errors.description && <span>This field is required</span>}
          </Stack>
          <Button type="submit">Rechercher</Button>
        </HStack>
      </form>
      <div>
        {/* We show the search input when submitting the form */}
        {isSubmitted && (
          <Heading as="h2" size="md" pos={"sticky"} top="40px" zIndex={"1"} bgColor="bg.canvas" padding="20px">
            Recherche : {getValues("description")}
          </Heading>
        )}
        {searchByText.isPending ? (
          <div>Loading...</div>
        ) : searchByText.isError ? (
          <div>Error: {searchByText.error.message}</div>
        ) : searchByText.isSuccess ? (
          <VStack paddingX="20px">
            {Array.isArray(searchByText.data) ? (
              searchByText.data?.slice(0, 50).map((result, index) => (
                <HStack key={index}>
                  <AnnonceItem annonce={result} />
                </HStack>
              ))
            ) : (
              <div>Error : result is not an array</div>
            )}
          </VStack>
        ) : null}
      </div>
    </>
  );
}
