import { createLazyFileRoute } from "@tanstack/react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { HStack, Stack } from "styled-system/jsx";
import { Button } from "~/components/ui/button";
import { FormLabel } from "~/components/ui/form-label";
import { Textarea } from "~/components/ui/textarea";

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
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
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
  );
}
