import { createLazyFileRoute } from "@tanstack/react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { HStack, Stack, VStack } from "styled-system/jsx";
import { Button } from "~/components/ui/button";
import { FormLabel } from "~/components/ui/form-label";
import { Link } from "~/components/ui/link";
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
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    searchByText.mutate(data);
    console.log(data);
  };

  const searchByText = useSearchbyText();

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <HStack alignItems={"flex-end"}>
          <Stack gap="1.5" width="2xs">
            <FormLabel htmlFor="description" fontWeight={"bold"}>
              Description
            </FormLabel>
            <Textarea id="description" rows={4} {...register("description", { required: true })} />
            {errors.description && <span>This field is required</span>}
          </Stack>
          <Button type="submit">Rechercher</Button>
        </HStack>
      </form>
      <div>
        {searchByText.isPending ? (
          <div>Loading...</div>
        ) : searchByText.isError ? (
          <div>Error: {searchByText.error.message}</div>
        ) : searchByText.isSuccess ? (
          <VStack>
            {Array.isArray(searchByText.data) ? (
              searchByText.data?.map((result, index) => (
                <HStack key={index}>
                  <h2>{result.title}</h2>
                  <p>{result.description}</p>
                  <Link>{result.url}</Link>
                </HStack>
              ))
            ) : (
              <div>{searchByText.data}</div>
            )}
          </VStack>
        ) : null}
      </div>
    </>
  );
}
