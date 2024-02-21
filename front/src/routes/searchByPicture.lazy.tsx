import { createLazyFileRoute } from "@tanstack/react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { HStack, VStack } from "styled-system/jsx";
import { AnnonceItem } from "~/components/data-ui/annonceItem";
import { PictureUpload } from "~/components/data-ui/pictureUpload";
import { Button } from "~/components/ui/button";
import { useSearchByPicure } from "~/features/searchByPicture";

export const Route = createLazyFileRoute("/searchByPicture")({
  component: SearchByPicture,
});

type Inputs = {
  picture: File[];
};

function SearchByPicture() {
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    searchByPicture.mutate(data);
    console.log(data);
  };

  const searchByPicture = useSearchByPicure();

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <PictureUpload
          w={"lg"}
          onFilesChange={(infos) => {
            setValue("picture", infos.acceptedFiles);
          }}
        />
        {errors.picture && <span>This field is required</span>}
        <Button type="submit">Rechercher</Button>
      </form>
      {searchByPicture.isPending ? (
        <div>Loading...</div>
      ) : searchByPicture.isError ? (
        <div>Error: {searchByPicture.error.message}</div>
      ) : searchByPicture.isSuccess ? (
        <VStack paddingX="20px">
          {Array.isArray(searchByPicture.data) ? (
            searchByPicture.data?.slice(0, 50).map((result, index) => (
              <HStack key={index}>
                <AnnonceItem annonce={result} />
              </HStack>
            ))
          ) : (
            <div>Error : result is not an array</div>
          )}
        </VStack>
      ) : null}
    </>
  );
}
